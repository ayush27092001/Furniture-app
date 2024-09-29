const jwt = require('jsonwebtoken');


const authorization = (req, res, next) => {

    try {
        let decoded = jwt.verify(req.headers.authorization, 'secret');


        if (req.url.includes("admin") || req.url.includes('cart') || req.url.includes('checkout')) {
            if (!decoded) {
                return res.send({
                    status: 404,
                    message: "Please login first",
                    error: error.message
                })
            }
        }


        next()
    } catch (error) {
        return res.send({
            status: 404,
            message: "Please login first",
            error: error
        })
    }

}

module.exports = {
    authorization
}