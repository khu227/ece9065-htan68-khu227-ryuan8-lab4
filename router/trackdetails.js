const express = require('express');

const router = express.Router();

const trackdetails_handler = require('../router_handler/trackdetails');

router.get('/trackdetails/:track_id', trackdetails_handler.getTrackdetails);
router.get('/trackid/:album_title', trackdetails_handler.getTrackid);

module.exports = router;

