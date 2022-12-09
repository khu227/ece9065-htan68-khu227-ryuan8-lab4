const database = require('../database/index')
const jwt = require("jsonwebtoken");
const config = require('../config')
const nodemailer = require("nodemailer");

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
//resend email verification
exports.resend = (req, res) => {
    //get email from token
    const email = req.user.Email
    //get token
    const token = jwt.sign({ Email: email }, config.jwtSecretKey, { expiresIn: '1h' })
    //send email
    host = req.get('host')
    link = "http://" + req.get('host') + "/api/open/verify/" + token
    mail(email, 'Email verification', link, (err, data) => {
        if (err) return console.log(err.message)
        res.send({ status: 200, message: 'Please check your email' })
    })
}