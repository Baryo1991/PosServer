const express = require('express');

const router = express.Router();

const controller = require('./../controllers/departmentController');


router
    .route('/')
    .get(controller.getAllDepartments)
    .post(controller.createDepartment)

router
    .route('/:id')
    .get(controller.getDepartmentByID)
    .patch(controller.updateDepartment)
    .delete(controller.deleteDepartment)

module.exports = router;