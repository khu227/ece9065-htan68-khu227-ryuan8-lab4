const express = require('express');

const router = express.Router();

const genres_handler = require('../router_handler/favouritelist');

router.post('/favouritelists', genres_handler.addfavouritelist);

router.post('/favouritelistsavers', genres_handler.savefavouritelist);

router.get('/favouritelistbynames/:list_name', genres_handler.searchfavouritelist);

router.post('/favoritelistdeletions', genres_handler.deletefavouritelist);

router.get('/favouritelists', genres_handler.getfavouritelist);

router.get('/favouritelistdetails', genres_handler.getfavouritelistdetail);

module.exports = router;