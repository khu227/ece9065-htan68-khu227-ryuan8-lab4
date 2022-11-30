const database = require('../database/index')

exports.getUserName = (req, res) => {
//Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Get the user's name list
        const sql = `select name from user`
        database.query(sql, (err, results) => {
            if (err) return console.log(err.message)
            res.send({
                status:200,
                message:'',
                data: results,
            })
        } )
    })
}

exports.getAdminGrant = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //grant admin privilege to one or more existing users
        const sql = `update user set is_admin = 1 where name = ?`
        database.query(sql, req.body.name, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The user does not exist')
            res.send({status:200,message:'The user was granted admin privilege successfully'})
        })

    } )
}

exports.deactivateUser = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Deactivate one or more users
        const sql = `update user set is_active = 0 where name = ?`
        database.query(sql, req.body.name, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The user does not exist')
            res.send({status:400,message:'The user was deactivated successfully'})
        })
    })
}

exports.reactivateUser = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Reactivate one or more users
        const sql = `update user set is_active = 1 where name = ?`
        database.query(sql,req.body.name, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The user does not exist')
            res.send({status:400,message:'The user was reactivated successfully'})
        })
    })
}
// Ability to mark a review as hidden
exports.hideReview = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Hide one or more reviews
        const sql = `update review set hidden = 1 where id = ?`
        database .query(sql, req.body.list_id, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The review does not exist')
            res.send({status:400,message:'The review was hidden successfully'})
        } )
    })
}

//able to remove the “hidden” status of a review
exports.showReview = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Show one or more reviews
        const sql = `update review set hidden = 0 where id = ?`
        database. query(sql,req.body.list_id, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The review does not exist')
            res.send({status:400,message:'The review was shown successfully'})
        } )
    })
}




