const express = require('express');

const router = express.Router();

const genres_handler = require('../router_handler/albumdetials');

router.get('/albumdetails/:', genres_handler.getAlbumdetails);
module.exports = router;