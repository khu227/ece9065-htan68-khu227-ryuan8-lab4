const database = require('../database/index')
//item 1
exports.getGenres = (req, res) => {
    const sql = `select title,genre_id,parent from genres`
    database.query(sql,(err,results) => {

        //to-do err message
        if (err) return console.log(err.message)
        res.send({
            status:0,
            message:'',
            data: results,
        })
    })
}
