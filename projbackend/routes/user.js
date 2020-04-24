const express = require("express");
const router=express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");


router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

router.put("/user/:userId",updateUser);

router.get("/orders/user/:userId",userPurchaseList)
module.exports = router;