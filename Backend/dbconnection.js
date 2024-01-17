const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

//connection string
const url = `mongodb+srv://abdulrafay12364:${process.env.PASSWORD}@cluster0.mzrvsqm.mongodb.net/`;

const mongodbconnection = () => {
    mongoose.connect(url, console.log("Connection to Mongodb for Octdaily Test Backend is Successfully made!"))
}
module.exports = mongodbconnection;