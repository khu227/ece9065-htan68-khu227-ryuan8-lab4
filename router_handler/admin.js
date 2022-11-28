const database = require('../database/index')

exports.getUserName = (req, res) => {
//Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Get the user's name list
        const sql = `select name from user where is_admin = 0`
        database.query(sql, (err, results) => {
            if (err) return console.log(err.message)
            res.send(results)
        } )
    })
}

exports.getAdminGrant = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //grant admin privilege to one or more existing users
        const sql = `update user set is_admin = 1 where name = ?`
        database.query(sql, req.body.name, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The user does not exist')
            res.send({status:400,message:'The user was granted admin privilege successfully'})
        })

    } )
}






