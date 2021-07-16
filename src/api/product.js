const express = require('express')
const methods = require('./methods')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.route('/')
    .post(methods.createProduct)
    .get(methods.getAllProducts)

router.route('/:id')
    .get(methods.getOneProduct)
    .put(methods.changeProduct)
    .delete(methods.deleteProduct)

router.route('/findBySku/:sku')
    .get(methods.getOneProduct)
    .put(methods.changeProduct)
    .delete(methods.deleteProduct)

router.param('id', methods.getProductById)
router.param('sku', methods.getProductBySku)

router.use(methods.errorHandler)

module.exports = router






