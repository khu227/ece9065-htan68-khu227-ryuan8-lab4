const database = require('../database/index')

exports.getUserName = (req, res) => {
//Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send('You are not an administrator')
        //Get the user's name and is_active which is not an administrator
        const sql = `select name,is_active from user where is_admin = 0`
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
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Deactivate one or more users
        const sql = `update user set is_active = 0 where name = ?`
        database.query(sql, req.body.name, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The user does not exist')
            res.send({status:200,message:'The user was deactivated successfully'})
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
            res.send({status:200,message:'The user was reactivated successfully'})
        })
    })
}
// Ability to mark a review as hidden
exports.hideReview = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Hide one or more reviews
        const sql = `update review set hidden = 1 where id = ?`
        database .query(sql, req.body.list_id, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The review does not exist')
            res.send({status:200,message:'The review was hidden successfully'})
        } )
    })
}

//able to remove the “hidden” status of a review
exports.showReview = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Show one or more reviews
        const sql = `update review set hidden = 0 where id = ?`
        database. query(sql,req.body.list_id, (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The review does not exist')
            res.send({status:200,message:'The review was shown successfully'})
        } )
    })
}
//Provide a DMCA takedown procedure and tools for the administrator:
// //i. Document to describe the workflow and usage of tools.
// //Tools to log requests, notices, and disputes. E.g. Set-up properties for storing “date request received”, “date notice sent”, “date dispute received” for each review and provide an interface to set these properties.
// //Tools to send notices to users. E.g. Set-up properties for storing “notice sent” and “notice received” for each review and provide an interface to set these properties.
// exports.getDMCA = (req, res) => {
//     //Determine whether the currently logged-on user is an administrator
//     const sql = `select * from user where id = ? and is_admin =1`
//     database.query(sql, req.user.id, (err, results) => {
//         if (err) return console.log(err.message)
//         if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
//         //Get the DMCA information
//         const sql = `select * from dmca`
//         database.query (sql, (err , results) => {
//             if (err) return console.log(err.message)
//             res.send({
//                 status:200,
//                 message:'',
//                 data: results,
//             })
//         } )
// } )
// }
// //Tools to send notices to users. E.g. Set-up properties for storing “notice sent” and “notice received” for each review and provide an interface to set these properties.
// exports.sendNotice = (req, res) => {
//     //Determine whether the currently logged-on user is an administrator
//     const sql = `select * from user where id = ? and is_admin =1`
//     database.query(sql, req.user.id, (err, results) => {
//         if (err) return console.log(err.message)
//         if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
//         //Send notice to the user
//         const sql = `update dmca set notice_sent = 1 where id = ?`
//         database.query(sql , req.body.list_id, (err, results) => {
//             if (err) return console.log(err.message)
//             if (results.affectedRows === 0) return res.send('The review does not exist')
//             res.send({status:200,message:'The notice was sent successfully'})
//         } )
// } )
// }
// //Tools to log requests, notices, and disputes. E.g. Set-up properties for storing “date request received”, “date notice sent”, “date dispute received” for each review and provide an interface to set these properties.
// exports.logRequest = (req, res) => {
//     //Determine whether the currently logged-on user is an administrator
//     const sql = `select * from user where id = ? and is_admin =1`
//     database.query(sql, req.user.id, (err, results) => {
//         if (err) return console.log(err.message)
//         if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
//         //Log the request
//         const sql = `update dmca set date_request_received = ? where id = ?`
//         database .query(sql , [req.body.date_request_received, req.body.list_id], (err, results) => {
//             if (err) return console.log(err.message)
//             if (results.affectedRows === 0) return res.send('The review does not exist')
//             res.send({status:200,message:'The request was logged successfully'})
//         } )
// })
// }
//
// //Tools to log requests, notices, and disputes. E.g. Set-up properties for storing “date request received”, “date notice sent”, “date dispute received” for each review and provide an interface to set these properties.
// exports.logNotice = (req, res) => {
//     //Determine whether the currently logged-on user is an administrator
//     const sql = `select * from user where id = ? and is_admin =1`
//     database.query(sql, req.user.id, (err, results) => {
//         if (err) return console.log(err.message)
//         if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
//         //Log the notice
//         const sql = `update dmca set date_notice_sent = ? where id = ?`
//         database .query(sql , [req.body.date_notice_sent, req.body.list_id], (err, results) => {
//             if (err) return console.log(err.message)
//             if (results.affectedRows === 0) return res.send('The review does not exist')
//             res.send({status:200,message:'The notice was logged successfully'})
//         }   )
// })
// }
//SM is able to create the DMCA notice & takedown policy.
exports.createDMCA = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Create the DMCA notice & takedown policy
        const sql = `insert into dmca (id, notice, policy) values (?,?,?)`
        database.query(sql , [req.body.id, req.body.notice, req.body.policy], (err, results) => {
            if (err) return console.log(err.message)
            res.send({status:200,message:'The DMCA notice & takedown policy was created successfully'})
        } )
})
}
//SM is able to create the DMCA notice & takedown policy.
exports.updateDMCA = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Update the DMCA notice & takedown policy
        const sql = `update dmca set notice = ?, policy = ? where id = ?`
        database .query(sql , [req.body.notice, req.body.policy, req.body.id], (err, results) => {
            if (err) return console.log(err.message)
            if (results.affectedRows === 0) return res.send('The DMCA notice & takedown policy does not exist')
            res.send({status:200,message:'The DMCA notice & takedown policy was updated successfully'})
        } )
    } )
}
//A link that displays the DMCA notice & takedown policy is provided.
exports.getDMCA = (req, res) => {
    const sql = `select * from dmca where id = ?`
    database .query(sql , req.body.id, (err, results) => {
        if (err) return console.log(err.message)
        if (results.length === 0) return res.send('The DMCA notice & takedown policy does not exist')
        res.send({
            status:200,
            message:'',
            data: results,
        })
    } )
}
//Contact information for sending any notices of infringement is provided.
exports.getContact = (req, res) => {
    //Determine whether the currently logged-on user is an administrator
    const sql = `select * from user where id = ? and is_admin =1`
    database.query(sql, req.user.id, (err, results) => {
if (err) return console.log(err.message)
        if (results.length !== 1) return res.send({status:400,message:'You are not an administrator'})
        //Get the contact information
        const sql = `select * from contact`
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

//Provide a DMCA takedown procedure and tools for the site administrator to log requests, notices, and disputes.
//i. Document to describe the workflow and usage of tools.
//2. This document contains the instructions for using the tools provided for implementing the DMCA notice & takedown policy.
//3. The document is provided to the site administrator.

