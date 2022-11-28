const express = require('express');

const router = express.Router();

const admin_handler = require('../router_handler/admin');

router.post('/adminGrant/', admin_handler.getAdminGrant);

router.get('/adminDeactivation/', admin_handler.deactivateUser);


module.exports = router;