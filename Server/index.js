// import core modules
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')


const adminRoute = require('./routes/backend/root.route')
const frontRoute = require('./routes/frontend/root.route')


// app instance
const app = express()

// static files
app.use(express.static(path.join(__dirname, 'public')))



// middlewares
app.use(express.json())
app.use(cors())


// database
mongoose.connect("mongodb://127.0.0.1:27017/furniture")
    .then(function () {
        console.log("db is connected");
    }).catch((err) => {
        console.log(err.message);
    })


// route
app.use('/admin', adminRoute)
app.use(frontRoute)


// react route
// app.use(express.static( path.join(__dirname,'./build')))


// port
const PORT = process.env.PORT || 8000

// listen
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})