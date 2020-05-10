const express = require("express");
const router =express.Router();
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {processPayment,getToken} = require("../controllers/paymentb");
router.get("/payment/gettoken/:userId", isSignedIn,getToken);

router.post("/payment/braintree/:userId",isSignedIn,processPayment);


module.exports = router;