const express = require('express');

const router = express.Router();

const trackdetails_handler = require('../router_handler/trackdetails');

router.get('/trackdetails/:track_id', trackdetails_handler.getTrackdetails);
// parameterstrack title or album title.
router.get('/trackids/:track_title:album_title', trackdetails_handler.getTrackid);
//parameters track_title,artist_name,album_title are optional in URL
router.get('/musicdatas/:track_title:artist_name:album_title', trackdetails_handler.getMusicData);

// lab4-3 unauthenticated user
router.post('/api/open/trackDetailsBycombi',trackdetails_handler.getTrackByCombi)
router.get('/api/open/tenPublicList', trackdetails_handler.tenPublicList);//get list info
router.get('/api/open/tenPublicListMore', trackdetails_handler.tenPublicListMore);//allow user to get more track detail saved in list.


//lab4-4 authenticated user
router.post('/api/secure/userNewList', trackdetails_handler.userNewList);
router.post('/api/secure/userListInfo', trackdetails_handler.userListInfo);
router.post('/api/secure/newPlayListAspects', trackdetails_handler.newPlayListAspects);
router.post('/api/secure/delExitList', trackdetails_handler.delExitList);
module.exports = router;


