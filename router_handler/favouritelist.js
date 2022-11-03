const database = require('../database/index')

exports.addfavouritelist = (req, res) => {
    const sql = `select list_name from favourite_list where list_name=? `
    database.query(sql,[req.body.list_name],(err,results) => {

        //to-do err message
        if (err) return console.log(err.message)
        if(results.length>0) return res.send({status:1,message:"The list name already exists'"})

        const sql =`insert into favourite_list set ?`
        database.query(sql,[req.body],(err,results) =>{
            if (err) return res.send({ status: 1, message: 'Failed to add favourite list' })
            res.send({ status: 1, message: 'The list was added successfully' })
            console.log(results)
        })
    })
}
//Save a list of track IDs to a given list name. Return an error if the list name does not exist. Replace existing track IDs with new values if the list exists.
exports.savefavouritelist = (req, res) => {
    //Check if the list already exists
    const sql = `select list_name from favourite_list where list_name=? `
    database.query(sql,[req.body.list_name],(err,results) => {
        console.log(req.body)
        if (err) return console.log(err.message)
        if(results.length===0) return res.send({status:1,message:"The list name does not exists"})

        // search list_id by list_name
        const sql1 = `select list_id from favourite_list where list_name = ?`
        database.query(sql1,[req.body.list_name],(err,results)=>{
            if (err) return console.log(err.message)
            // let list_id =Number(results.list_id)
            // const result = JSON.parse(results);
            // console.log(result)
            let string = JSON.stringify(results)
            let json = JSON.parse(string)
            let List_id = json[0].list_id

            // update list_id in raw_tracks
            sql2 = 'update raw_tracks set list_id=? where track_id=?'
            database.query(sql2,[List_id,req.body.track_id],(err,results)=>{
                if (err) return console.log(err.message)
                if (results.affectedRows === 1) res.send({ status: 1, message: 'The track_id was added successfully' })
            })

        })
    })
}

// 8. Get the list of track IDs for a given schedule.
exports.searchfavouritelist = (req, res) => {
    //find list_id by list_name
    const sql = `select list_id from favourite_list where list_name = ?`
    database.query(sql,[req.params.list_name],(err,results) => {
        if (err) return console.log(err.message)
        let string = JSON.stringify(results)
        let json = JSON.parse(string)
        let List_id = json[0].list_id
        //find track_id by list_id
        const sql1 = `select track_id from raw_tracks where list_id = ?`
        database.query(sql1,[List_id],(err,results) => {
            if (err) return console.log(err.message)
            res.send(results)
        })

    })
}

// 9. Delete a list of track IDs for a given schedule
//todo disable
exports.deletefavouritelist = (req, res) => {
//find list_id by list_name

    const sql = `select list_id from favourite_list where list_name = ?`

    database.query(sql,[req.body.list_name],(err,results) => {

        if (err) return console.log(err.message)
        if(results.length===0) return res.send({status:1,message:"The list name does not exists"})
        let string = JSON.stringify(results)
        let json = JSON.parse(string)
        let List_id = json[0].list_id
        //delete track_id by list_id
        const sql1 = `update raw_tracks set list_id = null where list_id = ?`
        database.query(sql1,[List_id],(err,results) => {
            if (err) return console.log(err.message)
            res.send(results)
        })

    })
}
//utf-8mb4
//display artist, title, album and play time for each track in the list
//10.Get a list of list names, display number of tracks,artist,title,album and play time that are saved in each list and the total play time of each list .
exports.getfavouritelist = (req, res) => {
const sql = `select list_name,count(favourite_list.list_id) as count ,sum(TIME_TO_SEC(track_duration))as total_time from favourite_list join raw_tracks on favourite_list.list_id=raw_tracks.list_id group by list_name `
    database.query(sql,(err,results) => {
        if (err) return console.log(err.message)
        res.send(results)
    })

}

//get all favourite list and display artist, title, album and play time for each track in the list,sort all data by artist, track, album or length
exports.getfavouritelistdetail = (req, res) => {
    // const sql = `select list_name,track_id,track_title,artist_name,album_title,track_duration from favourite_list join raw_tracks on favourite_list.list_id=raw_tracks.list_id`
    // database.query(sql,(err,results) => {
    //     if (err) return console.log(err.message)
    //     res.send(results)
    // })
    const sql = `select list_name,track_id,track_title,artist_name,album_title,track_duration from favourite_list join raw_tracks on favourite_list.list_id=raw_tracks.list_id order by `
    database.query(sql+req.query.orderby,(err,results) => {
        if (err) return console.log(err.message)
        res.send(results)
    })



}
