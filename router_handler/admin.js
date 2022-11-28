const database = require('../database/index')

exports.getAdminGrant = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where Email=? and is_admin=1`
    database.query(sql, [req.user.Email], (err, results) => {
        if (err) return console.log(err.message)
        if (results.length === 0) return res.send({ status: 401, message: 'You are not an administrator' })
        //display all user's name and if they are admin
        const sql1 = `select Email,is_admin from user`
        database .query(sql1,(err,results) => {
            if (err) return console.log(err.message)
            res.send(results)
        })
        // grant admin privilege to one or more existing users
        const sql2 = `update user set is_admin=1 where name=?`
        database.query(sql2, [req.body.name], (err, results) => {
            if (err) return res.send({ status: 400, message: 'Failed to grant admin privilege' })
            res.send({ status: 200, message: 'The user was granted admin privilege successfully' })
        })
        // revoke admin privilege from one or more existing users
        // const sql3 = `update user set is_admin=0 where name=?`
        // database.query(sql3, [req.body.name], (err, results) => {
        //     if (err) return res.send({ status: 400, message: 'Failed to revoke admin privilege' })
        //     res.send({ status: 200, message: 'The user was revoked admin privilege successfully' })
        // })

    })
}






