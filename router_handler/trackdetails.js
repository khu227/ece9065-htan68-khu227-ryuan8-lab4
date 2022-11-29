const database = require('../database/index')
//item 3
exports.getTrackdetails = (req, res) => {
    const sql = `select album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title from raw_tracks where track_id=?`
    database.query(sql,[req.params.track_id],(err,results) => {

        //to-do err message
        if (err) return console.log(err.message)
        res.send(results)
    })
}
//item 4
exports.getTrackid = (req,res) => {
    // const  sql = `select track_id from raw_tracks where album_title like '%?%'`
    // Get the first n number of matching track IDs for a given search pattern matching the track title or album title.
    const sql = `select track_id from raw_tracks where album_title like ? or track_title like ? `
    database.query(sql+' limit'+req.query.limit,["%"+req.params.album_title+"%","%"+req.params.track_title+"%"],(err,results) => {
        if (err) return console.log(err.message)
        res.send(results)
    })
}

//front-end2
//Ability to search the music data by track name, artist name or album name and display results
exports.getMusicData = (req, res) => {
    //sort all data by artist, track, album or length
    const sql = `select album_id, album_title, artist_id, artist_name, track_date_created, track_number, track_title from raw_tracks where track_title like ? or artist_name like ? or album_title like ? order by `
    database.query(sql+req.query.orderby+'  limit 5',["%"+req.params.track_title+"%","%"+req.params.artist_name+"%","%"+req.params.album_title+"%"],(err,results) => {
        //to-do err message
        if (err) return console.log(err.message)
        res.send(results)
    })
}



// lab4 3:b+c+e(part)
exports.getTrackByCombi = (req,res) =>{
    const tracktitle = req.query.track_title.replace(' ','')
    const artistname = req.query.artist_name.replace(' ','')
    const genre = req.query.track_genres.replace(' ','')
    let sql = '';
    if(artistname.length===0 &&genre.length===0&&tracktitle.length>0){
         sql = `select * from raw_tracks where track_title like '%${tracktitle}%'`
    }
    else if(tracktitle.length===0 &&genre.length===0&&artistname.length>0){
         sql = `select * from raw_tracks where  artist_name like '%${artistname}%'`
    }
    else if(artistname.length===0 &&tracktitle.length===0&&genre.length>0){
         sql = `select * from raw_tracks where track_genres like '%${genre}%'`
    }
    else if(artistname.length>0 &&tracktitle.length>0&&genre.length===0){
         sql = `select * from raw_tracks where  artist_name like '%${artistname}%' AND track_title like '%${tracktitle}%'`
    }
    else if(genre.length>0 &&tracktitle.length>0&&artistname.length===0){
         sql = `select * from raw_tracks where  track_genres like '%${genre}%' AND track_title like '%${tracktitle}%'`
    }
    else if(genre.length>0 &&artistname.length>0&&tracktitle.length===0){
         sql = `select * from raw_tracks where  track_genres like '%${genre}%' AND artist_name like '%${artistname}%'`
    }
    else if(genre.length>0 &&artistname.length>0&&tracktitle.length>0){
         sql = `select * from raw_tracks where  track_genres like '%${genre}%' AND artist_name like '%${artistname}%' AND track_title like '%${tracktitle}%'`
    }
    
     database.query(sql,(err,results)=>{
         if (err)return res.send(err.message)
         res.send(results);
     })
}