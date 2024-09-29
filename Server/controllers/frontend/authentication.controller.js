const userModel = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
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
                password: hashPassword,

            })

            return res.json({
                status: 200,
                message: "user added successfully"
            })
        }
    } catch (error) {
        return res.json({
            status: 404,
            error: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        console.log(user);
        if (user) {
            let authenticatePassword = await bcrypt.compare(req.body.password, user.password);
           
            if (authenticatePassword) {
                let token = jwt.sign({ user }, 'secret');

                return res.json({
                    status: 200,
                    message: "User Login succesfully",
                    token: token,
                    user: user
                })
            } else {
                return res.json({
                    status: 404,
                    error: "Email Id and Password do not match"
                })
            }
        } else {
            return res.json({
                status: 404,
                error: "User not Found"
            })
        }



    } catch (error) {
        return res.json({
            status: 404,
            error: error.message
        })
    }

}


module.exports = {
    register,
    login
}

