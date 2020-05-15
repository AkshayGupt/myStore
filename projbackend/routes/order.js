const express = require("express");
const router =express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const {getProductById,updateStock} = require("../controllers/product");
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order");

router.param("userId",getUserById);
router.param("orderId",getOrderById);


router.post("/order/:userId",
isSignedIn,
isAuthenticated,
pushOrderInPurchaseList,
updateStock,
createOrder
);

router.get("/order/all",
isSignedIn,
isAuthenticated,
isAdmin,
getAllOrders
)

router.get("/order/status/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
getOrderStatus
)

router.put("/order/:orderId/status/:userId",
isSignedIn,
isAuthenticated,
isAdmin,
updateStatus
)

module.exports = router;