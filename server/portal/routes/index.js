var express = require('express');
var router = express.Router();
const portalController = require("../controller");

/* GET home page. */
router.post('/api/login',portalController.login)
router.get('/api/logout',portalController.logout)
router.get('/api/getUser',portalController.getUser)


module.exports = router;