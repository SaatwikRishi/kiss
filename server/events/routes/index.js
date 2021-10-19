var express = require('express');
var router = express.Router();
const eventsController = require("../controller");

/* GET home page. */
router.get('/api/testEvents',eventsController.testEvents)
router.post('/api/saveCategory',eventsController.saveCategory)
router.get('/api/getAllCategories',eventsController.getAllCategories)
router.post('/api/saveEvents',eventsController.saveEvents)
router.get('/api/getAllEvents',eventsController.getAllEvents)
router.get('/api/getCategory',eventsController.getCategory)
router.get('/api/getEvent',eventsController.getEvent)


module.exports = router;