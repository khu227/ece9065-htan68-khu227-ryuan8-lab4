const express = require('express');

const router = express.Router();

const user_handler = require('../router_handler/resend');

router.post('/resend', user_handler.resend);

module.exports = router;