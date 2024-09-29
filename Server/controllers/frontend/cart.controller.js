const cartModel = require("../../models/cart.model")
const cartItemModel = require("../../models/cartItem.model")
const userModel = require("../../models/user.model")

const getCart = async (req, res) => {
    try {

        let cart = await cartModel.findOne({ user: req.params.userId, orderPlaced: false }).populate('user')
        if (cart) {

            let response = await responseData(cart)

            return res.json({
                status: 200,
                message: "Cart Found",
                data: response
            })


        } else {

            return res.json({
                status: 404,
                message: "Cart Not Created",
                data: {}
            })

        }


    } catch (error) {
        return res.json({
            status: 500,
            message: "Something Went Wrong",
            error: error.message
        })
    }

}

const addCart = async (req, res) => {

    try {
        let user = await userModel.findOne({ _id: req.params.userId })
        if (user) {
            let cart = await cartModel.findOne({ user: req.params.userId, orderPlaced: false })

            if (cart) {

                let itemExists = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,
                })

                if (itemExists) {
                    await cartItemModel.updateOne({
                        _id: itemExists._id
                    }, {
                        qty: itemExists.qty + 1
                    })

                } else {
                    await cartItemModel.create({
                        cartId: cart.id,
                        product: req.body.productId,
                        qty: 1
                    })
                }

            } else {
                let cart = await cartModel.create({
                    user: req.params.userId,
                })

                await cartItemModel.create({
                    cartId: cart.id,
                    product: req.body.productId,
                    qty: req.body.qty
                })


            }

            await collectTotal(cart.id)

            let response = await responseData(cart)

            return res.json({
                status: 200,
                message: "Cart Found",
                data: response
            })


        }
        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })


    } catch (error) {
        return res.json({
            status: 500,
            message: "Something went wrong",
            error: error
        })
    }


}
const updateCart = async (req, res) => {
    try {
        let user = await userModel.findOne({ _id: req.params.userId })
        if (user) {
            let cart = await cartModel.findOne({ user: req.params.userId, orderPlaced: false })

            if (cart) {

                let itemExists = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,
                })

                if (itemExists) {
                    await cartItemModel.updateOne({
                        _id: itemExists._id
                    }, {
                        qty: req.body.qty
                    })

                } else {
                    return res.json({
                        status: 404,
                        message: "Product not Found",
                        data: {}
                    })
                }

            }

            await collectTotal(cart.id)


            return res.json({
                status: 200,
                message: "Cart updated successfully",
                data: {}
            })


        }
        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })


    } catch (error) {
        return res.json({
            status: 500,
            message: "Something went wrong",
            error: error
        })
    }


}


const destroyCart = async (req, res) => {

    try {
        let user = await userModel.findOne({ _id: req.params.userId })
        if (user) {
            let cart = await cartModel.findOne({ user: req.params.userId, orderPlaced: false })

            if (cart) {

                let itemExists = await cartItemModel.findOne({
                    cartId: cart.id,
                    product: req.body.productId,

                })

                if (itemExists) {
                    await cartItemModel.deleteOne({
                        _id: itemExists._id
                    })

                } else {
                    return res.json({
                        status: 404,
                        message: "Product not Found",
                        data: {}
                    })
                }

            }

            await collectTotal(cart.id)


            return res.json({
                status: 200,
                message: "Cart deleted successfully",
                data: {}
            })


        }
        return res.json({
            status: 404,
            message: "Customer not found",
            data: {}
        })


    } catch (error) {
        return res.json({
            status: 500,
            message: "Something went wrong",
            error: error
        })
    }

}


const responseData = async (cart) => {

    let newCart = { ...cart._doc }
    let cartItems = await cartItemModel.find({ cartId: cart.id }).populate('product')

    newCart.items = cartItems

    return newCart;
}


const collectTotal = async (cartId) => {
    let cart = await cartModel.findOne({ _id: cartId })
    let cartItems = await cartItemModel.find({ cartId: cart.id }).populate('product')


    let subTotal = 0;
    let tax = 0;
    let grandTotal = 0;


    for (const item of cartItems) {
        subTotal = subTotal + item.product.price * item.qty;
    }

    grandTotal = subTotal + tax;

    await cartModel.updateOne({ _id: cartId }, {
        subTotal,
        tax,
        grandTotal
    })
}

module.exports = {
    getCart,
    addCart,
    updateCart,
    destroyCart
}