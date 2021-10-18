var express = require('express');
var router = express.Router();
const eventsController = require("../controller");

/* GET home page. */
router.get('/api/',eventsController.getEvents)


module.exports = router;
