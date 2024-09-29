const express = require('express')
const { GetCategories } = require('../../controllers/frontend/category.controller')
const { authorization } = require('../../middleware/authorization')

const router = express.Router()

router.use(authorization)

router.get('/categories', GetCategories)

module.exports = router