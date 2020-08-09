const express = require('express');

const router  = express.Router();

const controller = require('./../controllers/supplierController');

router
    .route('/')
    .get(controller.getAllSuppliers)
    .post(controller.createSupplier)

router
    .route('/:id')
    .get(controller.getSuppliertByID)
    .patch(controller.updateSupplier)
    .delete(controller.deleteSupplier)


    module.exports = router;