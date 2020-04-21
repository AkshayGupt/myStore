const express= require("express");
const router = express.Router();
const { check } = require('express-validator');
const {signout,signup} = require("../controllers/auth");



//Signup
router.post("/signup",
[
    check('name','Name must be at least 3 characters long').isLength({ min:3}),
    check('email','Email must be entered properly').isEmail(),
    check('password','Password must be at least 3 characters long!').isLength({ min: 3}),
],//if any error arises express add it into the req so that we can access the error
signup);


//Signout 
router.get("/signout",signout);


module.exports = router;