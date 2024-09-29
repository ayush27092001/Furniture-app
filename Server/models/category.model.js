const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        require: false,
    },
    status: {
        type: Boolean,
        default: false,
    }
})

const categoryModel = mongoose.model('Category', categorySchema)

module.exports = categoryModel