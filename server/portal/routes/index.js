var express = require('express');
var router = express.Router();
const portalController = require("../controller");

/* GET home page. */
router.post('/api/login',portalController.login)


module.exports = router;