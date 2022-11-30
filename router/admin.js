const express = require('express');

const router = express.Router();

const admin_handler = require('../router_handler/admin');

router.get('/userNameLists', admin_handler.getUserName);

router.post('/adminGrant', admin_handler.getAdminGrant);

router.post('/adminDeactivation', admin_handler.deactivateUser);

router.post('/adminReactivation', admin_handler.reactivateUser);
//Ability to mark a review as hidden
router.post('/adminHideReview', admin_handler.hideReview);
//able to remove the “hidden” status of a review
router.post('/adminShowReview', admin_handler.showReview);

module.exports = router;