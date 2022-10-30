const express = require('express');

const router = express.Router();

const artistdetails_handler = require('../router_handler/artistdetails');
//item2
router.get('/artistdetails/:artist_id', artistdetails_handler.getArtistdetails);
router.get('/artistname/:artist_name', artistdetails_handler.getArtistname);
module.exports = router;
