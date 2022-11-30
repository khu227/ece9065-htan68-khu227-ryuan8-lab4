const express = require('express');

const router = express.Router();

const user_handler = require('../router_handler/user');

router.post('/register', user_handler.register);

router.post('/login', user_handler.login);

//verify email
router.get('/verify/:token', user_handler.verify);

module.exports = router;