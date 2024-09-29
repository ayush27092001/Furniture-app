const express = require('express')

const router = express.Router()

// Category route
const CategoryRoute = require('./category.route')


// Product route
const ProductRoute = require('./product.route')


// User route
const UserRoute = require('./user.route')

// Order route
const OrderRoute = require('./order.route')


const { authorization } = require('../../middleware/authorization')

router.use(authorization)


router.use('/category', CategoryRoute)
router.use('/product', ProductRoute)
router.use('/user', UserRoute)
router.use('/order', OrderRoute)

module.exports = router
