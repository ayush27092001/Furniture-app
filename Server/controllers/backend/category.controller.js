const categoryModel = require("../../models/category.model")
const fs = require('fs')
const path = require('path')


const getCategories = async (req, res) => {
    let categories = await categoryModel.find()
    res.json(categories)

}

const storeCategory = async (req, res) => {
    let category = await categoryModel.findOne({ name: req.body.name })
    try {

        if (category) {
            return res.json({
                status: 404,
                message: "category name already exists"
            })
        } else {

            await categoryModel.create({
                name: req.body.name,
                image: req.file ? req.file.path.replace('public', '') : '',
                status: req.body.status
            })

            res.json({
                status: 200,
                message: "category added successfully"
            })
        }
    } catch (error) {
        res.json({
            status: 404,
            error: error.message
        })
    }




}

const editCategory = async (req, res) => {
    let category = await categoryModel.findOne({ _id: req.params.id })

    try {
        if (category) {
            return res.json({
                status: 200,
                message: "category exist",
                data: category
            })
        } else {
            res.json({
                status: 404,
                message: "category not exist",
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

const updateCategory = async (req, res) => {

    try {

        let category = await categoryModel.findOne({ _id: req.params.id })



        if (req.file) {
            if (fs.existsSync((path.join(__dirname, '../../public', category.image)))) {

                fs.unlinkSync((path.join(__dirname, '../../public', category.image)));
            }

            await categoryModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                image: req.file.path.replace('public', ''),
                status: req.body.status

            })

        } else {
            await categoryModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
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

const deleteCategory = async (req, res) => {

    try {
        let category = await categoryModel.findOne({ _id: req.params.id })

        if (!category) {
            return res.json({
                status: 404,
                message: 'id not Found',

            })
        }

        await categoryModel.deleteOne({ _id: req.params.id })


        res.json({
            status: 200,
            message: "category deleted successfully"
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
    getCategories,
    storeCategory,
    editCategory,
    updateCategory,
    deleteCategory

}
