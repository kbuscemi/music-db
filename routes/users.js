var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users');


/* GET users listing. */

router.get('/users/search-results', userCtrl.search);

module.exports = router;
