const User= require("../models/user");
const {  validationResult } = require('express-validator');

exports.signup = (req,res)=>{
    const user = new User(req.body);//object of User class passing the details as parameter

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            parameter:errors.array()[0].param
        });
    }


    user.save((err,user)=>{
        if(err) return res.status(400).json({
            err:err.message
        })
         res.json({
             name:user.name,
             email:user.email,
             role:user.role
         });
    });

};
exports.signout = (req,res)=>{
    res.send("Signout Page in controller");
};