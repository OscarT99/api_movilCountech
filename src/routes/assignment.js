const express = require('express')
const router = express.Router();
const AssignmentController = require ('../controllers/Assignment');

router.get('/assignment',AssignmentController.getAllAssignments);

router.get('/assignment/:id',AssignmentController.getAssignmentById);

router.post('/assignment',AssignmentController.createAssignment);

router.put('/assignment/:id',AssignmentController.updateAssignment);

router.delete('/assignment/:id',AssignmentController.deleteAssignment);

module.exports = router;