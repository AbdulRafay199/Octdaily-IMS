const express = require("express");
const router = express.Router();
const { addproduct, fetchproduct, updateproduct, dltproduct } = require("../controllers/Productcontroller");

//All routes for product
router.post('/addproduct', addproduct)
router.get('/fetchproduct', fetchproduct)
router.patch('/updateproduct/:id', updateproduct)
router.delete('/deleteproduct/:id', dltproduct)

module.exports = router;