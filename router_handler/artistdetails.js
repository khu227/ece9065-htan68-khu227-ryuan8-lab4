const database = require('../database/index')
//item 2
exports.getArtistdetails = (req, res) => {
    const sql = `select artist_id, artist_active_year_begin, artist_favorites, artist_handle, artist_location, artist_name from raw_artists where artist_id=?`
    database.query(sql,[req.params.artist_id],(err,results) => {

        if (err) return console.log(err.message)
        // if(results.length===0) return res.send({message:"The artist_id does not exists"})
        // let str = JOSN.stringify(results)
        // res.send({
        //     status:200,
        //     message:'',
        //     data: results,
        // })
        res.send(results)
    })
}
//item 5. Get all the matching artist IDs for a given search pattern matching the artist's name.
//Get all the matching artist IDs for a given search pattern matching the artist's name,results are sorted in ascending order
exports.getArtistid = (req,res) => {
    const sql = `select artist_id from raw_artists where artist_name like ? order by artist_id `
    database.query(sql+req.query.sortby+' limit 10',["%"+req.params.artist_name+"%"],(err,results) => {

        if (err) return console.log(err.message)
        res.send(results)
    })
}





