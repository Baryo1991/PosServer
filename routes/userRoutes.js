const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

const controller  = require('../controllers/factoryController')
const userController = require('../controllers/userController');

router
    .route('/')
    .get(controller.GetAll(User))
    .post(controller.Create(User))
    .patch(controller.Update(User))

router
    .route('/:id')
    .get(controller.Get(User))
    .delete(controller.Delete(User))


module.exports = router;