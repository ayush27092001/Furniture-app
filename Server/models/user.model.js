const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipCode: {
        type: Number,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    role: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;
