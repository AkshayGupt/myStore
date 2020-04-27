const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const {getProductById,createProduct,updateProduct} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

//params
router.param("productId",getProductById);
router.param("userId",getUserById);

//actual routes
router.post("/product/create/:userId",
isSignedIn,isAuthenticated,isAdmin,createProduct);
// router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
module.exports = router;