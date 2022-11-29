const database = require('../database/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('../config')

function mail(to,title,content,callback) {
    const nodemailer = require('nodemailer'); //引入依赖
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',// 根据不同邮箱使用不同域名
        port: 465,
        secure: true,
        auth: {
            user: '541739948@qq.com',
            pass: 'rdmukospemynbcgb'
        }
    });

    let info = {
        from: '541739948@qq.com',
        to: to,
        subject: title,
        text:'click the link to verify your email',
        html: content
    }
    transporter.sendMail(info,(err,data) => {
        callback &&  callback(err,data)
    });
}


// register an account with an email, a password and a name.
exports.register = (req, res) => {
    const userinfo = req.body
    if (!userinfo.Email || !userinfo.password || !userinfo.name) {
        return res.send({ status: 401, message: 'Email, password and name are required' })
    }
    //email format check
    const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!emailReg.test(userinfo.Email)) {
        return res.send({ status: 401, message: 'Email format is incorrect' })
    }
    // Check if the email already exists
    const sql = `select Email from user where Email=? `
    database.query(sql, [userinfo.Email], (err, results) => {
        if (err) return console.log(err.message)
        if (results.length > 0) return res.send({ status: 401 , message: 'The email already exists' })
        // Encrypt the password
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //email verification
        const token = jwt.sign({ id: userinfo.Email }, config.jwtSecretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) return console.log(err.message)
            // Send the email
            mail(userinfo.Email, 'Email verification', `http://127.0.0.1:3009/api/open/verify/${token}`, (err, data) => {
                console.log(token)
                if (err) return console.log(err.message)
                // Insert the user into the database
                const sql = `insert into user set ?`
                database.query(sql, userinfo, (err, results) => {
                    if (err) return console.log(err.message)
                    res.send({ status: 200, message: 'Register successfully, please check your email' })
                })
                })
            })

            })
}
// Verify the email
exports.verify = (req, res) => {
    const token = req.params.token
    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err) return res.send({ status: 401, message: 'The link is invalid' })
        const sql = `update user set is_active=1 where Email=?`
        database.query(sql, decoded.id, (err, results) => {
            if (err) return console.log(err.message)
            res.send({ status: 200, message: 'Email verification success' })
        } )
    } )
}

// Login with an email and a password. Return a JWT token if successful.
exports.login = (req, res) => {
    const userinfo = req.body
    if (!userinfo.Email || !userinfo.password) {
        return res.send({ status: 401, message: 'Email and password are required' })
    }
    // Check if the email already exists
    const sql = `select * from user where Email=? `
    database.query(sql, [userinfo.Email], (err, results) => {
        if (err) return console.log(err.message)
        if (results.length === 0) return res.send({ status: 401, message: 'The email does not exist' })
        // Compare the password
        const isMatch = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!isMatch) return res.send({ status: 401, message: 'The password is incorrect' })
        // generate a token in the server
        const user = { ...results[0], password: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        //check user is activated or not
        if (results[0].is_active === 0) {
            return res.send({ status: 401, message: 'Please contact the site administrator' })
        }else{
            //return token and user infrmation
            res.send({ status: 200, message: 'Login successfully', token: 'Bearer ' + tokenStr, user })
            // res.send({ status: 100, message: 'Logged in successfully', token: 'Bearer ' + tokenStr })
        }

    })
}

