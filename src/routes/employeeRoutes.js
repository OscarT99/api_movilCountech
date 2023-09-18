const express = require('express')
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.get('/employees',EmployeeController.getAllEmployees);

router.get('/employees/:id',EmployeeController.getEmployeeById);

router.post('/employees',EmployeeController.createEmployee);

router.put('/employees/:id',EmployeeController.updateEmployee);

router.delete('/employees/:id',EmployeeController.deleteEmployee);

module.exports = router;