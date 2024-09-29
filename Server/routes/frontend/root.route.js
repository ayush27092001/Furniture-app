const express = require("express")

const router = express.Router()

// register route
const authenticateRoute = require("./authentication.route")

// product route
const productRoute = require("./product.route")


// category route
const categoryRoute = require('./category.route')


// category route
const cartRoute = require('./cart.route')


// checkout route
const checkoutRoute = require('./checkout.route')



router.use(authenticateRoute)
router.use(productRoute)
router.use(categoryRoute)
router.use(cartRoute)
router.use(checkoutRoute)



module.exports = router