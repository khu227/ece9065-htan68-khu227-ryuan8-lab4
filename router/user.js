const express = require('express');

const router = express.Router();

const user_handler = require('../router_handler/user');

router.post('/register', user_handler.register);


module.exports = router;