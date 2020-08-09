const express = require('express')

const router = express.Router();

const controller = require('./../controllers/employeeController');

router

router
    .route('/')
    .get(controller.getAllEmployees)
    .post(controller.createEmployee)

router
    .route('/:id')
    .get(controller.getEmployeeByID)
    .patch(controller.updateEmployee)
    .delete(controller.deleteEmployee)

    module.exports = router;