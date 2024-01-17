const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true
    }
})

const productmodel = mongoose.model('product',productschema);

module.exports = productmodel;