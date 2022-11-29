const express = require('express');

const router = express.Router();

const trackdetails_handler = require('../router_handler/trackdetails');

router.get('/trackdetails/:track_id', trackdetails_handler.getTrackdetails);
// parameterstrack title or album title.
router.get('/trackids/:track_title:album_title', trackdetails_handler.getTrackid);
//parameters track_title,artist_name,album_title are optional in URL
router.get('/musicdatas/:track_title:artist_name:album_title', trackdetails_handler.getMusicData);

// lab4-3 unauthenticated user
router.get('/api/open/trackDetailsBycombi',trackdetails_handler.getTrackByCombi)

module.exports = router;

