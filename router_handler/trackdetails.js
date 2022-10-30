const database = require('../database/index')
//item 3
exports.getTrackdetails = (req, res) => {
    const sql = `select album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title from raw_tracks where track_id=?`
    database.query(sql,[req.params.track_id],(err,results) => {

        //to-do err message
        if (err) return console.log(err.message)
        res.send({
            status:0,
            message:'',
            data: results,
        })
    })
}
//item 4
exports.getTrackid = (req,res) => {
    //to-do %{}%
    const  sql = `select track_id from raw_tracks where album_title like '%?%'`
    database.query(sql,[req.params.album_title],(err,results) => {
        //to-do err message
        if (err) return console.log(err.message)
        res.send({
            status:0,
            message:'',
            data: results,
        })
    })

}