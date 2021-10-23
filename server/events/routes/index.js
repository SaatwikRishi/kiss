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
router.post('/api/saveStudentProfile',eventsController.saveStudentProfile)
router.get('/api/getAllStudents',eventsController.getAllStudents)
router.post('/api/saveTag',eventsController.saveTag)
router.get('/api/getAllTags',eventsController.getAllTags)
router.post('/api/sendNotification',eventsController.sendNotification)
router.post('/api/saveStudentEventForm',eventsController.saveStudentEventForm)
router.post('/api/changeStudentStatus',eventsController.changeStudentStatus)
router.post('/api/deleteTag',eventsController.deleteTag)
router.post('/api/deleteEvent',eventsController.deleteEvent)
router.post('/api/deleteCategory',eventsController.deleteCategory)
router.post('/api/deleteStdCategory',eventsController.deleteStdCategory)
router.post('/api/deleteStudent',eventsController.deleteStudent)
router.get('/api/getAllStudentForms',eventsController.getAllStudentForms)
router.get('/api/getStudentDetail',eventsController.getStudentDetail)

module.exports = router;