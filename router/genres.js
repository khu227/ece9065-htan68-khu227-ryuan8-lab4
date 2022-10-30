const express = require('express');

const router = express.Router();

const genres_handler = require('../router_handler/genres');

router.get('/genres', genres_handler.getGenres);
module.exports = router;