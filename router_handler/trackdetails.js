const database = require('../database/index')
var stringSimilarity = require("string-similarity");
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
    // const soft_tracktitle = req.body.track_title
    // const soft_artistname = req.body.artist_name
    // const soft_genre = req.body.track_genres
    // const softsqla = 'select track_title, artist_name, track_genres from raw_tracks'
    // var tracktitle = '';
    // var artistname = '';
    // var genre = '';
    // let rating=0
    // let last_rating = 0
    // var track_title_array =[];
    // var artist_name_array = [];
    // var track_genres_array = [];
    // database.query(softsqla, (err, results) => {
    //     if (err) return res.send({ status: 401, message: err.message })
    //     for(var i =0; i<results.length; i++){
            
    //          track_title_array.push('"'+results[i].track_title+'"')
    //          artist_name_array.push('"'+results[i].artist_name+'"')
    //          track_genres_array.push('"'+results[i].track_genres+'"')
    //          rating = stringSimilarity.compareTwoStrings(`"${soft_tracktitle}"`, track_title_array[i]);
    //          last_rating = rating
    //          console.log(rating)
    //          console.log(last_rating)

    //     }

    //     tracktitle = stringSimilarity.findBestMatch(`"${soft_tracktitle}"`,track_title_array)
    //     artistname = stringSimilarity.findBestMatch(`"${soft_artistname}"`,artist_name_array)
    //     genre = stringSimilarity.findBestMatch(`"${soft_genre}"`,track_genres_array)
    // })
    // console.log(tracktitle)
    // console.log(artistname)
    // console.log(genre)


    const tracktitle = req.body.track_title
    const artistname = req.body.artist_name
    const genre = req.body.track_genres


    let sql = '';
    if(artistname.length===0 &&genre.length===0&&tracktitle.length>0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where track_title like '%${tracktitle}%'`
    }
    else if(tracktitle.length===0 &&genre.length===0&&artistname.length>0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where  artist_name like '%${artistname}%'`
    }
    else if(artistname.length===0 &&tracktitle.length===0&&genre.length>0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where track_genres like '%${genre}%'`
    }
    else if(artistname.length>0 &&tracktitle.length>0&&genre.length===0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where  artist_name like '%${artistname}%' AND track_title like '%${tracktitle}%'`
    }
    else if(genre.length>0 &&tracktitle.length>0&&artistname.length===0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where  track_genres like '%${genre}%' AND track_title like '%${tracktitle}%'`
    }
    else if(genre.length>0 &&artistname.length>0&&tracktitle.length===0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where  track_genres like '%${genre}%' AND artist_name like '%${artistname}%'`
    }
    else if(genre.length>0 &&artistname.length>0&&tracktitle.length>0){
         sql = `select track_title,artist_name,album_title,track_date_created,track_language_code,track_favorites,track_genres from raw_tracks where  track_genres like '%${genre}%' AND artist_name like '%${artistname}%' AND track_title like '%${tracktitle}%'`
    }
    
     database.query(sql,(err,results)=>{
         if (err)return res.send(err.message)
         res.send(results);
     })
} 
exports.tenPublicList = (req, res) => {
  
    //const sql = `select play_list.user_name,list_name,rate,review,count(trackInList.list_id) as count ,sum(TIME_TO_SEC(track_duration))as total_time from (((raw_tracks join trackInList on trackInList.track_id=raw_tracks.track_id ) join play_list on play_list.list_id = trackInList.list_id and play_list.public = 1) left join review on play_list.list_id = review.list_id)  group by list_name ORDER BY play_list.update_time limit 10 `    
    const sql = `select play_list.user_name,list_name,count(trackInList.list_id) as count ,sum(TIME_TO_SEC(track_duration))as total_time from ((raw_tracks join trackInList on trackInList.track_id=raw_tracks.track_id ) join play_list on play_list.list_id = trackInList.list_id and play_list.public = 1)   group by list_name ORDER BY play_list.update_time limit 10 `    

        database.query(sql, (err, results) => {
            if (err) return res.send({ status: 401, message: err.message })
            res.send(results)
        })
    }
    exports.tenPublicListMore = (req, res) => {
      const list_name = req.body.list_name
      const topsql = `select list_id from play_list where list_name = '${list_name}'`
      //const topsql = `select list_id from play_list where list_name = ?`
      let local_listid = 0
      database.query(topsql,(err, results) => {
        local_listid = results[0].list_id
        //const sql = 'select play_list.*,trackInList.*, raw_tracks.*, play_list.update_time from (( play_list join trackInList ON play_list.list_id = trackInList.list_id ) join raw_tracks on trackInList.track_id = raw_tracks.track_id) order by play_list.update_time, play_list.list_name'
        //2const sql = `select play_list.*, raw_tracks.* from (( play_list  join trackInList ON ${local_listid} = trackInList.list_id ) left join raw_tracks on trackInList.track_id = raw_tracks.track_id) order by play_list.update_time, play_list.list_name`
        const sql = `select play_list.*, raw_tracks.* from trackInList inner join play_list on play_list.list_id = trackInList.list_id inner join raw_tracks on raw_tracks.track_id =  trackInList.track_id where trackInList.list_id = ${local_listid}`  //join raw_tracks on trackInList.track_id = raw_tracks.track_id) order by play_list.update_time, play_list.list_name`
        console.log(local_listid)
        database.query(sql, (err, results) => {
                if (err) return res.send({ status: 401, message: err.message })
                res.send(results)
            })
        })
        }
//display review info when display play_list
    exports.reviewOnPlaylist = (req, res) => {
        const list_name = req.body.list_name
        const topsql = `select list_id from play_list where list_name = '${list_name}'`
        database.query(topsql,[req.body.list_name],(err, results) => {
            local_listid = results[0].list_id
            //const sql = `select review.review, review.rate,review.user_name,review.id,review.hidden from review where ${local_listid} = review.list_id and review.hidden = 0` 
            const sql = `select review.review, review.rate,review.user_name,review.id,review.hidden from review where ${local_listid} = review.list_id` 

            database.query(sql, (err, results) => {
                    if (err) return res.send({ status: 401, message: err.message })
                    res.send(results)
            })
        })
     }



    
    //L4-4a
    //create up 20 play-list for authorized user
    exports.userNewList = (req, res) => {
        let returnMessage = "success added!"
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getDate() + "  "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
     
        const name = req.user.name
        const list_name = req.body.list_name
        const description = req.body.description
        const list_of_tracks = req.body.list_of_tracks
        const visibility = req.body.visibility
        
        const sql = `select user_name from play_list where user_name = '${name}'`
        database.query(sql, (err, results) => {
            if (err) return res.send({ status: 401, message: err.message })
            if (results.length>20){
                res.send({ status: 401, message: 'Your playlist is full, please delete it and use it later!' })
            }else{
                const sql = `select list_name from play_list where list_name='${list_name}'`
                database.query(sql,(err,results) => {
    
            //to-do err message
            if (err) return console.log(err.message)
            if(results.length>0) return res.send({status:401,message:"The list name already exists"})
    
            const sql =`INSERT INTO play_list (list_name, public, update_time, description, user_name)VALUES ('${list_name}', '${visibility}','${datetime}','${description}','${name}');`
            database.query(sql,[req.body],(err,results) =>{
                if (err) return res.send({ status: 1, message: 'Failed to add play list' })
                
                const array = String(list_of_tracks).split(',')
                const listnamesql = `select list_id from play_list where list_name = '${list_name}'`
                let local_listid = 0
                database.query(listnamesql,(err,results) =>{    //take a list of track id and save it in created play list
                    if (err) return res.send({ status: 1, message: err.message })
                     local_listid = results[0].list_id  
                     
                     for(let i=0; i<array.length;i++){
                        let sqltrackidinraw = `select track_id from raw_tracks where track_id = '${array[i].replace('"','')}'`
                        database.query(sqltrackidinraw,(err,results) =>{
                            let sqlin = `Insert into trackInList (list_id,track_id)VALUES('${local_listid}','${array[i].replace('"','')}')`
                            
                            if (err) return res.send({ status: 401, message: err.message })  
                            if(results.length===0){
                                sqlin = `select list_id from play_list`
                                //returnMessage = "sorry, one of the track_id is not exist, please try again"
                                
                            }
                            
                            database.query(sqlin,(err,results) =>{
                                if (err) return res.send({ status: 401, message: err.message })
                             })
                            })
                    }  
                    
                    
                })
                
            })
            
        })
        
            }
            res.send(returnMessage)
        })
        
    }
        
    
    exports.userListInfo = (req, res) => {
        
        const name = req.user.name
        console.log(name)

        const empty_sql = `select user_name from play_list where user_name = '${name}'`
        database.query(empty_sql, (err, resulta) => {
        if(resulta.length===0){
            return res.send({ status: 401, message: 'You don not have any play list, please create!' })
        }


        const sql = `select play_list.*,trackInList.*, raw_tracks.*, play_list.update_time from (( play_list join trackInList ON play_list.list_id = trackInList.list_id and play_list.user_name = '${name}') join raw_tracks on trackInList.track_id = raw_tracks.track_id)order by play_list.update_time, play_list.list_name`
        //const sql = `select play_list.*,trackInList.*, raw_tracks.*,review.rate,review.review,review.update_time, play_list.update_time from ((( play_list join trackInList ON play_list.list_id = trackInList.list_id and play_list.user_name = '${name}') join raw_tracks on trackInList.track_id = raw_tracks.track_id)left join review on play_list.list_id = review.list_id)order by play_list.update_time, play_list.list_name`

        database.query(sql, (err, results) => {
            if (err) return res.send({ status: 401, message: err.message })
            // if (results.length===0){
            //     res.send({ status: 401, message: 'You don not have any play list, please create!' })
            // }
            res.send(results)
    
        })
    })
    
     }



    //4c user able to edit all aspects of an existing list
    exports.newPlayListAspects = (req, res) => {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getDate() + "  "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
     
        const name = req.user.name
        const list_name = req.body.list_name
        const description = req.body.description
        const list_of_tracks = req.body.list_of_tracks
        const visibility = req.body.visibility
        const listid = req.body.list_id
        
    
        const sql = `select list_name from play_list where list_name='${list_name}' and list_id != '${listid}'`
        database.query(sql, (err, results) => {
            if (err) return res.send({ status: 401, message: err.message })
            if(results.length>0) return res.send({status:401,message:"The list name already exists"})
    
            const sqls =`update play_list set list_name ='${list_name}', public = ${visibility}, update_time = '${datetime}', description = '${description}', user_name = '${name}' where list_id = '${listid}' `
            database.query(sqls,(err,results) =>{
                if (err) return res.send({ status: 1, message: err.message })
                
                const array = String(list_of_tracks).split(',')
                let sqldele = `DELETE FROM trackInList WHERE list_id='${listid}'`
                database.query(sqldele,(err,results) =>{
                        if (err) return res.send({ status: 1, message: err.message })
    
                        for(let i=0; i<array.length;i++){
                            let sqlin = `Insert into trackInList (list_id,track_id)VALUES('${listid}','${array[i].replace('"','')}')`
                            database.query(sqlin,(err,results) =>{
                             if (err) return res.send({ status: 1, message: err.message })
                             
                            })
                         }      
                    
                    })
    
              
                    res.send({ status: 200, message: 'The list was edit successfully' })
            })
            
        })
            }
    
    
            
    exports.delExitList = (req, res) => {
        const list_name = req.body.list_name
        const sql = `select list_name from play_list where list_name='${list_name}'`
        database.query(sql, (err, results) => {
            if(results.length=0) return res.send({status:401,message:"The list name doesn't exists"})
            const listnamesql = `select list_id from play_list where list_name = '${list_name}'`
                let local_listid = 0
                database.query(listnamesql,(err,results) =>{ 
                    if (err) return res.send({ status: 1, message: err.message })
                     local_listid = results[0].list_id 
                     const delreview = `DELETE FROM review WHERE list_id = '${local_listid}'`
                     database.query(delreview, (err, results) => {
                         if (err) return res.send({ status: 1, message: err.message })
    
                     })
                     
                     const cleansql = `DELETE FROM trackInList WHERE list_id = '${local_listid}'`
                     database.query(cleansql, (err, results) => {
                        if (err) return res.send({ status: 1, message: err.message })
    
                       
    
                        const deleatemain = `DELETE FROM play_list WHERE list_name = '${list_name}'`
                        database.query(deleatemain, (err, results) => {
                            if (err) return res.send({ status: 1, message: err.message })
                        })
    
                   
    
                     })
    
                })
    
                res.send({ status: 200, message: 'the list have deleted sucessfully' })
        })
    
    
    }



    //7.1:disable the review by admin
    exports.reviewInfoDisable = (req, res) => {
        
        const list_name = req.body.list_name
        const review_id = req.body.id
        const topsql = `select list_id from play_list where list_name = '${list_name}'`

        database.query(topsql,[req.body.list_name],(err, results) => {
            local_listid = results[0].list_id
            const sql = `UPDATE review SET hidden = 1 WHERE id = ${review_id} and list_id = ${local_listid};`      
            database.query(sql, (err, results) => {
                if (err) return res.send({ status: 401, message: err.message })
                res.send(results)
        })
            
            
            
        })




    }

//7.2a view all disabled review info

exports.viewAllDisableReview = (req, res) => {
    const sql = 'select * from review where hidden = 1'
    database.query(sql,(err, results) => {
        if (err) return res.send({ status: 401, message: err.message })
        if(results.length === 0) res.send({ status: 401, message: 'none of the review are disabled!' })
        res.send(results)

    })
}




    
//7.2b:enable the review by admin   
exports.reviewInfoRecover = (req, res) => {
        
    const list_name = req.body.list_name
    const review_id = req.body.id
    const topsql = `select list_id from play_list where list_name = '${list_name}'`
    
    database.query(topsql,[req.body.list_name],(err, results) => {
        local_listid = results[0].list_id
        const sql = `UPDATE review SET hidden = 0 WHERE id = ${review_id} and list_id = ${local_listid};`      
        database.query(sql, (err, results) => {
            if (err) return res.send({ status: 401, message: err.message })
                res.send(results)
        })
                
                
                
    })
    
}

