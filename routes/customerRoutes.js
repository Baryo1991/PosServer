const express = require('express');
const Customer  = require('./../models/customer')
const auth = require('../utils/Auth');

const router = express.Router();

const controller = require('../controllers/factoryController');

router
    .route('/')
    .get(controller.GetAll(Customer))
    .post(controller.Create(Customer))

router
    .route('/:id')
    .get(controller.Get(Customer))
    .patch(controller.Update(Customer))
    .delete(controller.Delete(Customer))


module.exports = router;