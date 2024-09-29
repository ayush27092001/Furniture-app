const fs = require('fs')
const path = require('path')
const productModel = require('../../models/product.model')


const getProducts = async (req, res) => {
    let products = await productModel.find()
    res.json(products)

}

const storeProduct = async (req, res) => {

    try {

        let product = await productModel.findOne({ name: req.body.name })


        if (product) {
            return res.json({
                status: 404,
                message: "product name already exists"
            })
        } else {

            await productModel.create({
                name: req.body.name,
                slug: req.body.slug,
                image: req.file.path.replace('public', ''),
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status
            })

            res.json({
                status: 200,
                message: "product added successfully"
            })
        }
    } catch (error) {
        res.json({
            status: 404,
            error: error.message
        })
    }


}

const editProduct = async (req, res) => {

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

const updateProduct = async (req, res) => {

    try {

        let product = await productModel.findOne({ _id: req.params.id })



        if (req.file) {
            if (fs.existsSync((path.join(__dirname, '../../public', product.image)))) {

                fs.unlinkSync((path.join(__dirname, '../../public', product.image)));
            }

            await productModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                slug: req.body.slug,
                image: req.file.path.replace('public', ''),
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status

            })

        } else {
            await productModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                slug: req.body.slug,
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status

            })
        }



        res.json({
            status: 200,
            message: "category updated successfully"
        })

    } catch (error) {
        res.json({
            status: 404,
            message: 'id not exist',
            error: error.message
        })
    }




}

const deleteProduct = async (req, res) => {

    try {
        let product = await productModel.findOne({ _id: req.params.id })

        if (!product) {
            return res.json({
                status: 404,
                message: 'id not Found',

            })
        }

        await productModel.deleteOne({ _id: req.params.id })


        res.json({
            status: 200,
            message: "product deleted successfully"
        })

    } catch (error) {
        res.json({
            status: 404,
            message: 'id not Found',
            error: error.message
        })
    }

}


module.exports = {
    getProducts,
    storeProduct,
    editProduct,
    updateProduct,
    deleteProduct

}
