const express = require('express');

const router = express.Router();

const review_handler = require('../router_handler/review');

router.post('/review', review_handler.addReview);


module.exports = router;