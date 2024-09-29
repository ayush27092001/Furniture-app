const productModel = require("../../models/product.model")

const getProducts = async (req, res) => {
    let products = await productModel.find().populate('category')
    res.json(products)
}

const ProductById = async (req, res) => {

    try {

        let product = await productModel.findOne({ _id: req.params.id }).populate('category')


        if (product) {
            return res.json({
                status: 200,
                message: "product exist",
                data: product
            })
        } else {
            res.json({
                status: 404,
                message: "product not exist",
                data: {}
            })
        }
    } catch (error) {

        return res.json({
            status: 404,
            error: error.message,


        })
    }
}

module.exports = {
    getProducts,
    ProductById
}