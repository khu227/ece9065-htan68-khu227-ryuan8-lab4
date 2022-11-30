const database = require('../database/index')

//Mechanism to select a play-list for adding a review.
exports.addReview = (req, res) => {
    //login user's name
    const name = req.user.name
    console.log(name)
    //insert review where list_id = req.body.list_id
    //username is from token
    const sql = `insert into review (list_id, review, user_name, rate) values (?,?,?,?)`
    database.query(sql, [ req.body.list_id, req.body.review, req.user.name, req.body.rate], (err, results) => {
        if (err) return res.send({ status: 401, message: err.message })
        res.send({ status: 200, message: 'Review added successfully' })
    })

}