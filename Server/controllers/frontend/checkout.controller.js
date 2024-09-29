const stripe = require('stripe')('sk_test_51HqyueDS0O4mepKZ4vh6THLH2kztnIW6u0XSURUOdW7J4JFBD3QNkh9ICHX5T48qqDNwUqxCA2Kv9TigXeMJe3NQ00YxAK0Z1o')
const cartModel = require("../../models/cart.model");
const cartItemModel = require("../../models/cartItem.model");
const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");
const { v4: uuidv4 } = require('uuid')




const checkout = async (req, res) => {


    try {
        let cart = await cartModel.findOne({ _id: req.params.cartId })

        if (cart) {
            let order = await orderModel.create({
                cart: req.params.cartId,
                user: cart.user,
                address: {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    zipCode: req.body.zipCode,
                    contact: req.body.contact

                },
                subTotal: cart.subTotal,
                tax: cart.tax,
                grandTotal: cart.grandTotal
            })

            let cartItem = await cartItemModel.find({ cartId: cart._id })

            for (const item of cartItem) {
                await orderItemModel.create({
                    product: item.product,
                    order: order._id,
                    qty: item.qty
                })
            }

            await cartModel.updateOne({ _id: cart._id }, {
                orderPlaced: true
            })


            return res.json({
                status: 200,
                message: "Order placed"
            })

        } else {
            return res.json({
                status: 200,
                message: "Order not Found",
                error: error.message
            })
        }

    } catch (error) {
        return res.json({
            status: 404,
            error: error.message
        })
    }

}

const stripePayment = async (req, res) => {

    try {
        const { token, amount } = req.body;

        const idempotencyKey = uuidv4()


        let customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        let result = await stripe.charges.create({
            amount: amount * 100,
            currency: "INR",
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: idempotencyKey
        })
        console.log(result);
       return res.status(200).json(result)

    } catch (error) {
      return  res.status(404).json(error.message)

    }



    // return stripe.customers.create({
    //     email: token.email,
    //     source: token.id
    // }).then(customer => {
    //     stripe.charges.create({
    //         amount: amount * 100,
    //         currency: "INR",
    //         customer: customer.id,
    //         receipt_email: token.email
    //     }, { 
    //         idempotencyKey: idempotencyKey
    //      })
    // }).then(result => {
    //     res.status(200).json(result)
    // }).catch(err => {
    //     res.status(404).json(err.message)

    // })




}



module.exports = {
    checkout,
    stripePayment
}