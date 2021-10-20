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
router.post('/api/saveStudentCategory',eventsController.saveStudentCategory)
router.get('/api/getAllStdCategories',eventsController.getAllStdCategories)

router.post('/api/testFile',eventsController.testFile)


module.exports = router;