const express = require('express');

const router = express.Router();

const artistdetails_handler = require('../router_handler/artistdetails');
//item2
router.get('/artistdetails/:artist_id', artistdetails_handler.getArtistdetails);
//定义get请求的路由，请求参数中排序方式
router.get('/artistid/:artist_name', artistdetails_handler.getArtistid);
module.exports = router;
