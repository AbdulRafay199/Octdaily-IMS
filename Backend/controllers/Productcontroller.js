const product = require("../model/Product");


//controller for adding new product
const addproduct = async (req, res)=>{
    var success = false
    try {
        //creates new data in the database
        const productdata = await product.create(req.body);
        success = true
        res.json({success:success,msg:productdata})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

//controller for fetching all product
const fetchproduct = async (req, res)=>{
    try {
        //product.find finds all the data product db and store it to productdata variable as array
        const productdata = await product.find();
        res.json(productdata)
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal error occurred")
    }
};

//controller for updating specific product
const updateproduct = async (req, res)=>{
    var success = false
    try {
        // product.findByIdAndUpdate updates the product data by taking product id in first param and new data in 2nd param
        const productdata = await product.findByIdAndUpdate({_id: req.params.id},req.body);
        success = true
        res.json({success:success,msg:productdata})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

//controller for deleting specific product
const dltproduct = async (req, res)=>{
    var success = false
    try {
        // product.findByIdAndDelete deletes that product whose id is given in the argument of func.
        const productdata = await product.findByIdAndDelete(req.params.id);
        success = true
        res.json({success:success,msg:productdata})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:success,msg:"Internal error occurred"})
    }
};

module.exports = {
    addproduct,fetchproduct,updateproduct,dltproduct
}