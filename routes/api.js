var express = require('express');
var router = express.Router();
var  apiCtrl = require('../controllers/api/credits');
var spotifyCtrl = require('../controllers/api/spotify');

router.get('/api/credits', apiCtrl.getCredits);
router.get('/api/spotify', spotifyCtrl.getSpotify);

module.exports = router;