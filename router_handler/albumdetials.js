const database = require('../database/index')

//search the album data by track_title, artist_name or album_title and display results use javascripte.
exports.getAlbumdetails = (req, res) => {
    const sql = `select album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title from raw_tracks where track_title =？ or artist_name =？ or album_title =？`
    database.query(sql,[req.params.track_title,req.params.artist_name,req.params.album_title],(err,results) => {

            //to-do err message
            if (err) return console.log(err.message)
            // let str = JOSN.stringify(results)
            // res.send({
            //     status:200,
            //     message:'',
            //     data: results,
            // })
            res.send(results)
        })
}