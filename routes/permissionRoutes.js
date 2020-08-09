const express = require('express');
const Permission  = require('./../models/permissionModel')
const auth = require('../utils/Auth');

const router = express.Router();

const controller = require('../controllers/factoryController');
const permissionController = require('../controllers/permissionController')

router
    .route('/')
    .get(controller.GetAll(Permission))
    .post(controller.Create(Permission))

router
    .route('/:id')
    .get(controller.Get(Permission))
    .patch(controller.Update(Permission))
    .delete(controller.Delete(Permission))

router.post('/generate/:source',permissionController.generatePermissions)

module.exports = router;