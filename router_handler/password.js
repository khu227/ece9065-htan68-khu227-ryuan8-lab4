//A mechanism is provided to update the password for an authenticated user.
const database = require('../database/index')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const config = require('../config')

// Update the password for an authenticated user.
exports.update = (req, res) => {
    //get userinfo from token
    const userinfo = req.user
    //get new password from req.body
    const newpassword = req.body.newpassword
    //encrypt the new password
    const password = bcrypt.hashSync(newpassword, 10)
    //update the password
    const sql = `update user set password=? where Email=?`
    database.query(sql, [password, userinfo.Email], (err, results) => {
        if (err) return console.log(err.message)
        if (results.affectedRows !== 1) return res.send({ status: 401, message: 'Update failed' })
        res.send({ status: 200, message: 'Update successfully' })
    })
}