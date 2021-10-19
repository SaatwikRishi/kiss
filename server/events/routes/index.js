var express = require('express');
var router = express.Router();
const eventsController = require("../controller");

/* GET home page. */
router.get('/api/getAllEvents',eventsController.getAllEvents)
router.post('/api/saveCategory',eventsController.saveCategory)
router.get('/api/getAllCategories',eventsController.getAllCategories)


module.exports = router;
