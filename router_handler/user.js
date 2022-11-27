const database = require('../database/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('../config')

// register an account with an email, a password and a name.
exports.register = (req, res) => {
    const userinfo = req.body
    if (!userinfo.Email || !userinfo.password || !userinfo.name) {
        return res.send({ status: 1, message: 'Email, password and name are required' })
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
            mail(userinfo.Email, 'Email verification', `http://localhost:3000/verify/${token}`, (err, data) => {
                if (err) return console.log(err.message)
                // Insert the user into the database
                const sql = `insert into user (Email, password, name) values (?, ?, ?)`
                database.query(sql, [userinfo.Email, userinfo.password, userinfo.name], (err, results) => {
                    if (err) return console.log(err.message)
                    res.send({ status: 100, message: 'The email has been sent, please check it' })
                })
            })
        } )
    })
}