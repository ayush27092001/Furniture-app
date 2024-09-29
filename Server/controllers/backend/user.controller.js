const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt');
const userModel = require("../../models/user.model")


const getUsers = async (req, res) => {
    let users = await userModel.find()
    res.json(users)

}

const storeUser = async (req, res) => {
    try {

        let user = await userModel.findOne({ email: req.body.email })


        if (user) {
            return res.json({
                status: 404,
                message: "Email already exists"
            })
        } else {
            let hashPassword = await bcrypt.hash(req.body.password, 10,);


            await userModel.create({
                name: req.body.name,
                email: req.body.email,
                image: req.file.path.replace('public', ''),
                password: hashPassword,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                contact: req.body.contact,
                role: req.body.role,
                status: req.body.status
            })

            res.json({
                status: 200,
                message: "user added successfully"
            })
        }
    } catch (error) {
        res.json({
            status: 404,
            error: error.message
        })
    }




}

const editUser = async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.id })

    try {
        if (user) {
            return res.json({
                status: 200,
                message: "user exist",
                data: user
            })
        } else {
            res.json({
                status: 404,
                message: "user not exist",
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

const updateUser = async (req, res) => {
    console.log(req.body);
    try {

        let user = await userModel.findOne({ _id: req.params.id })



        if (req.file) {
            if (user.image && fs.existsSync((path.join(__dirname, '../../public', user.image)))) {

                fs.unlinkSync((path.join(__dirname, '../../public', user.image)));
            }

            await userModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                email: req.body.email,
                image: req.file ? req.file.path.replace('public', '') : '',
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                contact: req.body.contact,
                role: req.body.role,
                status: req.body.status

            })

        } else {
            await userModel.updateOne({ _id: req.params.id }, {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                zipCode: req.body.zipCode,
                contact: req.body.contact,
                role: req.body.role,
                status: req.body.status

            })
        }

let currentUser = await userModel.findById({_id: req.params.id})

        res.json({
            status: 200,
            message: "User updated successfully",
            user: currentUser
        })

    } catch (error) {
        res.json({
            status: 404,
            message: 'id not exist',
            error: error.message
        })
    }



}

const deleteUser = async (req, res) => {

    try {
        let user = await userModel.findOne({ _id: req.params.id })

        if (!user) {
            return res.json({
                status: 404,
                message: 'id not Found',

            })
        }

        await userModel.deleteOne({ _id: req.params.id })


        res.json({
            status: 200,
            message: "user deleted successfully"
        })

    } catch (error) {
        res.json({
            status: 404,
            error: error.message
        })
    }

}


module.exports = {
    getUsers,
    storeUser,
    editUser,
    updateUser,
    deleteUser

}
