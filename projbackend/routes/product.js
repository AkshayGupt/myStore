const express = require("express");
const router = express.Router();
const {
getProductById,
createProduct,
getProduct,
updateProduct,
deleteProduct,
getAllProducts,
getAllUniqueCategories
} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

//params
router.param("productId",getProductById);
router.param("userId",getUserById);

//create route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//read route
router.get("/product/:productId",getProduct);

//delete route
router.delete("/product/:productId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
deleteProduct
);

//update route
router.put("/product/:productId/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateProduct
);

//listing product
router.get("/products",getAllProducts);
router.get("/products/categories",getAllUniqueCategories);

module.exports = router;