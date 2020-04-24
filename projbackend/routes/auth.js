const express= require("express");
const router = express.Router();
const { check } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controllers/auth");



//Signup
router.post("/signup",
[
    check('name','Name must be at least 3 characters long').isLength({ min:3}),
    check('email','Email must be entered properly').isEmail(),
    check('password','Password must be at least 3 characters long!').isLength({ min: 3}),
],//if any error arises express add it into the req so that we can access the error
signup);

//SignIn
router.post("/signin",
[
    check('email','Email must be entered properly').isEmail(),
    check('password','Password is required').isLength({ min: 1}),
],//if any error arises express add it into the req so that we can access the error
signin);

//Signout 
router.get("/signout",signout);

module.exports = router;