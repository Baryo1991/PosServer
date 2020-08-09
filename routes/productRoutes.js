const express = require('express');

const router  = express.Router();

const controller = require('./../controllers/productController');

router
    .route('/')
    .get(controller.getAllProducts)
    .post(controller.createProduct)

router
    .route('/:id')
    .get(controller.getProductByID)
    .patch(controller.updateProduct)
    .delete(controller.deleteProduct)

module.exports = router;