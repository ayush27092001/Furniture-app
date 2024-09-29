const express = require("express")
const { getProducts, ProductById } = require("../../controllers/frontend/product.controller")

const router = express.Router()

router.get('/products', getProducts)
router.get('/product/:id', ProductById)

module.exports = router