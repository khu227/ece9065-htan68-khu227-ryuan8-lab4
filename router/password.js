const express = require('express');

const router = express.Router();

const password_handler = require('../router_handler/password');

router.post('/update', password_handler.update);

module.exports = router;