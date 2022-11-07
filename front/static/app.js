const artist_idSearchBtn = document.getElementById("artist_id-search-btn");
artist_idSearchBtn.addEventListener("click", artist_idSearchClickListener);

const track_idSearchBtn = document.getElementById("Trackdetails-search-btn");
track_idSearchBtn.addEventListener("click", track_idSearchClickListener);

const track_titleSearchBtn = document.getElementById("track_title-search-btn");
track_titleSearchBtn.addEventListener("click", track_titleSearchClickListener);

const artistnameSearchBtn = document.getElementById("artistname-search-btn");
artistnameSearchBtn.addEventListener("click", artistnameSearchClickListener);

//Get all available genre names, IDs and parent IDs.
const genreSearchBtn = document.getElementById("genre-search-btn");
genreSearchBtn.addEventListener("click", genreSearchClickListener);

const favouritelistCreateBtn = document.getElementById("createList-btn");
favouritelistCreateBtn.addEventListener("click", favouritelistCreateListener);

const favouritelistSaveBtn = document.getElementById("saveList-btn");
favouritelistSaveBtn.addEventListener("click", favouritelistSaveListener);

const favouritelistSearchBtn = document.getElementById("searchList-btn");
favouritelistSearchBtn.addEventListener("click", favouritelistSearchListener);
//declare favourite delete event listener
const favouritelistDeleteBtn = document.getElementById("deleteList-btn");
favouritelistDeleteBtn.addEventListener("click", favouritelistDeleteListener);
//declare get a list information function
const favouritelistGetBtn = document.getElementById("getList-btn");
favouritelistGetBtn.addEventListener("click", favouritelistGetListener);
//declare get a list details function
const favoutitelistDetailsBtn = document.getElementById("getListdetail-btn");
favoutitelistDetailsBtn.addEventListener("click", favouritelistGetDetialListener);

const musicdataSearchBtn = document.getElementById("getMusicdata-btn");
musicdataSearchBtn.addEventListener("click", musicdataSearchListener);


function artist_idSearchClickListener(){
    let result = document.getElementById("artist_id-search-result");
    result.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    let value = document.getElementById("artistid-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //convert string to number
    value = Number(value);
    //input sanitization
    if (value < 0) {
        alert("Invalid input");
        return;
    }
    // Check if the user's input is a number, and return an error if not
    if (isNaN(value)) {
        document.getElementById("artist_id-search-result").innerHTML = "Please enter a number";
        return;
    }
    //input length validation
    if (value.toString().length > 20) {
        document.getElementById("artist_id-search-result").innerHTML = "input length is too long";
        return;
    }
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            let results=JSON.parse(this.responseText);
            //if the artist id is not found, return error message
            if (results.length === 0) {
                document.getElementById("artist_id-search-result").innerHTML = "Artist id not found";
                return;
            }
            //display result

//sql = `select artist_id, artist_active_year_begin, artist_favorites, artist_handle, artist_location, artist_name from raw_artists where artist_id=?`
            let resultString = "";
            for (let i = 0; i < results.length; i++) {
                resultString += "artist id: " + results[i].artist_id + "<br>";
                resultString += "artist active year begin: " + results[i].artist_active_year_begin + "<br>";
                resultString += "artist favorites: " + results[i].artist_favorites + "<br>";
                resultString += "artist handle: " + results[i].artist_handle + "<br>";
                resultString += "artist location: " + results[i].artist_location + "<br>";
                resultString += "artist name: " + results[i].artist_name + "<br>";
            }

            document.getElementById("artist_id-search-result").innerHTML = resultString;
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3009/artistdetails/"+value, true);
    xhttp.send();
    //input sanitization
     if (value === null || value === undefined || value === "") {
        result.innerHTML = "Please enter a valid value";
    }

}

function track_idSearchClickListener(){
    let result = document.getElementById("Trackdetails-search-result");
    result.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    let value = document.getElementById("track_id-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //convert string to number
    value = Number(value);
    //input sanitization
    if (value < 0) {
        alert("Invalid input");
        return;
    }
    // Check if the user's input is a number, and return an error if not
    if (isNaN(value)) {
        document.getElementById("Trackdetails-search-result").innerHTML = "Please enter a number";
        return;
    }
    //input length validation
    if (value.toString().length > 20) {
        document.getElementById("Trackdetails-search-result").innerHTML = "input length should be less than 20";
        return;
    }
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            //display result
        //        const sql = `select album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title from raw_tracks where track_id=?`
            let results=JSON.parse(this.responseText);
            //if the track id is not found, return error message
            if (results.length === 0) {
                document.getElementById("Trackdetails-search-result").innerHTML = "Track id not found";
                return;
            }
            let resultString = "";
            for (let i = 0; i < results.length; i++) {
                resultString += "album id: " + results[i].album_id + "<br>";
                resultString += "album title: " + results[i].album_title + "<br>";
                resultString += "artist id: " + results[i].artist_id + "<br>";
                resultString += "artist name: " + results[i].artist_name + "<br>";
                resultString += "tags: " + results[i].tags + "<br>";
                resultString += "track date created: " + results[i].track_date_created + "<br>";
                resultString += "track date recorded: " + results[i].track_date_recorded + "<br>";
                resultString += "track duration: " + results[i].track_duration + "<br>";
                resultString += "track genres: " + results[i].track_genres + "<br>";
                resultString += "track number: " + results[i].track_number + "<br>";
                resultString += "track title: " + results[i].track_title + "<br>";
            }
            document.getElementById("Trackdetails-search-result").innerHTML = resultString;
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3009/trackdetails/"+value, true);
    xhttp.send();
}

function track_titleSearchClickListener(){
    let result = document.getElementById("track_title-search-result");
    result.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    let value = document.getElementById("track_title-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization
    if (value === null || value === undefined || value === "") {
        result.innerHTML = "Please enter a valid value";
    }
    //input length validation
    if (value.toString().length > 20) {
        document.getElementById("track_title-search-result").innerHTML = "input length should be less than 20";
        return;
    }
    ////get dom element of radio button
    let limit = document.getElementsByName("limit");
    let limitValue = 0;
    //get the value of the radio button
    for (let i = 0; i < limit.length; i++) {
        if (limit[i].checked) {
            limitValue = limit[i].value;
        }
    }
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            //display result
            let results=JSON.parse(this.responseText);
            //if the track title is not found, return error message
            if (results.length === 0) {
                document.getElementById("track_title-search-result").innerHTML = "Track id not found";
                return;
            }
            let resultString = "";
            for (let i = 0; i < results.length; i++) {
                //const sql = `select track_id from raw_tracks where album_title like ? or track_title like ? limit 10`
                resultString += "track id: " + results[i].track_id + "<br>";
            }
            document.getElementById("track_title-search-result").innerHTML = resultString;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:3009/trackids/"+value +"?limit= "+limitValue , true);
    xhttp.send();

}

//5. Get all the matching artist IDs for a given search pattern matching the artist's name.
function artistnameSearchClickListener(){
    let result = document.getElementById("artistname-search-result");
    result.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    let value = document.getElementById("artistname-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization and input length validation
    if (value === null || value === undefined || value === "") {
        result.innerHTML = "Please enter a valid value";
    }
    if (value.toString().length > 20) {
        document.getElementById("artistname-search-result").innerHTML = "input length should be less than 20";
        return;
    }
    //get dom element of radio button
    let sortby = document.getElementsByName("sortbyArtistid");
    //get the value of radio button selected
    let sortbyValue = "";
    for (let i = 0; i < sortby.length; i++) {
        if (sortby[i].checked) {
            sortbyValue = sortby[i].value;

        }
    }
    //display result

    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            let results=JSON.parse(this.responseText);
            //Iterate through the JSON object in Results and present it to the front-end page, prefixing each result with 'artist id:'
            let resultString = "";
            for (let i = 0; i < results.length; i++) {
                resultString += "artist id: " + results[i].artist_id + "<br>";
            }

            document.getElementById("artistname-search-result").innerHTML = resultString;
        }
    };
    //url have parameters artistname and set query string
    xhttp.open("GET", "http://127.0.0.1:3009/artistids/"+value+"?sortby="+sortbyValue, true);

    xhttp.send();
}
//Get all available genre names, IDs and parent IDs.
function genreSearchClickListener(){
    //const sql = `select title,genre_id,parent from genres`
    let result = document.getElementById("genre-search-result");
    result.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            let results=JSON.parse(this.responseText);
            //Iterate through the JSON object in Results and present it to the front-end page, prefixing each result with 'genre id:'
            let resultString = "";
            for (let i = 0; i < results.length; i++) {
                resultString += "genre id: " + results[i].genre_id + "<br>";
                resultString += "title: " + results[i].title + "<br>";
                resultString += "parent: " + results[i].parent + "<br>";
            }
            //Use pagination to present results in pages of 10 results each.
            document.getElementById("genre-search-result").innerHTML = resultString;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:3009/genres", true);
    xhttp.send();

}

function favouritelistCreateListener(){
    let result = document.getElementById("createList-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    let value = document.getElementById("createList-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization，The input character length cannot exceed 20 characters.
    if (value === null || value === undefined || value === "" || value.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    xhttp.open("post","http://127.0.0.1:3009/favouritelists",true);
    xhttp.setRequestHeader('Content-Type','application/json');
    var params = JSON.stringify({
        list_name: value,
    })
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {
            //display the message
            document.getElementById("createList-result").innerHTML = "List created successfully";
            //use createTextNode() method to show user entered data.
            let text = document.createTextNode(value);
            //create a new element
            let newElement = document.createElement("li");
            //append the text to the new element
            newElement.appendChild(text);
            //append the new element to the list
            document.getElementById("createList-result").appendChild(newElement);
        }
    };
    xhttp.send(params);
}
//implement the save list function
function favouritelistSaveListener(){
    let result = document.getElementById("saveList-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    let valueList_name = document.getElementById("saveList-input").value;
    let valuetrack_id = document.getElementById("savetrack_id-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    valueList_name = valueList_name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    valuetrack_id = valuetrack_id.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization and input length validation
    if (valueList_name === null || valueList_name === undefined || valueList_name === "" || valueList_name.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    if (valuetrack_id === null || valuetrack_id === undefined || valuetrack_id === "" || valuetrack_id.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    xhttp.open("post","http://127.0.0.1:3009/favouritelistsavers",true);
    xhttp.setRequestHeader('Content-Type','application/json');
    var params = JSON.stringify({
        list_name: valueList_name,
        track_id: Number(valuetrack_id)
    })
    xhttp.onreadystatechange=function() {
        if (this.readyState === 4 && this.status === 200) {

            document.getElementById("saveList-result").innerHTML = JSON.parse(this.responseText).message;
        }
    };
    xhttp.send(params);

}
//8. Get the list of track IDs for a given schedule.
function favouritelistSearchListener() {
    let result = document.getElementById("searchList-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    let value = document.getElementById("searchList-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization，The input character length cannot exceed 20 characters.
    if (value === null || value === undefined || value === "" || value.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let results=JSON.parse(this.responseText);
            //if the list does not exist, return the message
            if (results.message !== undefined) {
                document.getElementById("searchList-result").innerHTML = results.message;
            }
          //Iterate through the JSON object in Results and present it to the front-end page, prefixing each result with 'track id:'
            for (let i = 0; i < results.length; i++) {
                result.innerHTML += "track id:" + results[i].track_id + "<br>";
            }
        }
    };

    xhttp.open("GET", "http://127.0.0.1:3009/favouritelistbynames/" + value, true);
    xhttp.send();
}
// 9. Delete a list of track IDs for a given schedule.
function favouritelistDeleteListener() {
    let result = document.getElementById("deleteList-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    let valueList_name = document.getElementById("deleteList-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    valueList_name = valueList_name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization，The input character length cannot exceed 20 characters.
    if (valueList_name === null || valueList_name === undefined || valueList_name === "" || valueList_name.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    xhttp.open("post", "http://127.0.0.1:3009/favoritelistdeletions", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    var params = JSON.stringify({
        list_name: valueList_name
    })
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //Returns the deleted result to the frontend page
            document.getElementById("deleteList-result").innerHTML = JSON.parse(this.responseText).message;
        }
    };
    xhttp.send(params);

}

//10.Get a list of favourite list names, display the number of tracks that are saved in each list and the total play time of each list.
function favouritelistGetListener() {
    let result = document.getElementById("getList-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let results=JSON.parse(this.responseText);
            console.log(results.length);
            //display the list name ,number of tracks that are saved in list and the total play time of each list.
            for (let i = 0; i < results.length; i++) {
                result.innerHTML += "list name:" + results[i].list_name + "<br>"+"number of tracks:"+results[i].count+"<br>"+"total play time:"+results[i].total_time/60+"second"+"<br>";
            }
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3009/favouritelists", true);
    xhttp.send();

}

//get all favourite list and display artist, title, album and play time for each track in the list.
function favouritelistGetDetialListener() {
    let result = document.getElementById("getListdetail-result");
    result.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    //get dom element of radio button
    let ordebyValue = document.getElementsByName("listOrderby");
    //get the value of radio button selected
    let ordebyValueSelected = "";
    for (let i = 0; i < ordebyValue.length; i++) {
        if (ordebyValue[i].checked) {
            ordebyValueSelected = ordebyValue[i].value;
        }
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let results = JSON.parse(this.responseText);
            console.log(results.length);
            //display rusults and display list name only once sql = `select list_name,track_id,track_title,artist_name,album_title,track_duration from favourite_list join raw_tracks on favourite_list.list_id=raw_tracks.list_id`
            for (let i = 0; i < results.length; i++) {
                //display each same name only once
                if (i === 0) {
                    result.innerHTML += "list name:" + results[i].list_name + "<br>";
                }
                if (i > 0 && results[i].list_name !== results[i - 1].list_name) {
                    result.innerHTML += "list name:" + results[i].list_name + "<br>";
                }
                result.innerHTML += "track id:" + results[i].track_id + "<br>" + "track title:" + results[i].track_title + "<br>" + "artist name:" + results[i].artist_name + "<br>" + "album title:" + results[i].album_title + "<br>" + "track duration:" + results[i].track_duration + "<br>";
            }
        }
    };
    xhttp.open("GET", "http://127.0.0.1:3009/favouritelistdetails/"+"?orderby="+ordebyValueSelected, true);
    xhttp.send();
}



//Ability to search the music data by track name, artist name or album name and display results.
function musicdataSearchListener(){
    var result = document.getElementById("getMusicdata-result");
    result.innerHTML =  "";
    let xhttp = new XMLHttpRequest();
    let value = document.getElementById("musicdata-input").value;
    //Sanitize all user input so that the display must not interpret any HTML or JavaScript that might be typed on to the text area.
    value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //input sanitization，The input character length cannot exceed 20 characters.
    if (value === null || value === undefined || value === "" || value.length > 20) {
        result.innerHTML = "Please enter a valid value";
        return;
    }
    //get dom element of radio button
    let ordebyValue = document.getElementsByName("musicdataOrderby");
    //get the value of radio button selected
    let ordebyValueSelected = "";
    for (let i = 0; i < ordebyValue.length; i++) {
        if (ordebyValue[i].checked) {
            ordebyValueSelected = ordebyValue[i].value;
        }
    }
    xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                //select album_id, album_title, artist_id, artist_name, track_date_created, track_number, track_title from raw_tracks where track_title like '%${value}%' or artist_name like '%${value}%' or album_title like '%${value}%'
                let results=JSON.parse(this.responseText);
                  for (let i = 0; i < results.length; i++) {
                        result.innerHTML += "album id:" + results[i].album_id + "<br>"+"album title:"+results[i].album_title+"<br>"+"artist id:"+results[i].artist_id+"<br>"+"artist name:"+results[i].artist_name+"<br>"+"track date created:"+results[i].track_date_created+"<br>"+"track number:"+results[i].track_number+"<br>"+"track title:"+results[i].track_title+"<br>";
                  }

            }
        };

    //Several optional parameters can be passed in the URL
    xhttp.open("GET", "http://127.0.0.1:3009/musicdatas/"+value+"?orderby="+ordebyValueSelected, true);
    xhttp.send();
}