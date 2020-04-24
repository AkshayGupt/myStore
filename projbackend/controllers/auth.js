const User= require("../models/user");
const {  validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

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

exports.signin = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg,
            parameter:errors.array()[0].param
        })
    }
    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"USER not found!"
            })
        }

        if(!user.authenticate(password)){
            return res.status(400).json({
                error:"USER email and password do not match!"
            })
        }

        //Create token
        const token = jwt.sign({ _id:user._id }, process.env.SECRET);
        //put token into cookie
        res.cookie("token",token,{expire:new Date()+9999});
        //Return to frontend
        return res.json({
            token:token,
            user:{
                _id:user._id,
                email:user.email,
                name:user.name,
                role:user.role
            }
        })
    })
}

exports.signout = (req,res)=>{
    res.clearCookie("token");
   res.json({
       message:"User sign out successfully!"
   });
};


//Protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    requestProperty:"auth"
})

//Custom middlewares
exports.isAuthenticated = (req,res,next)=>{
    let check =  req.profile && req.auth && req.profile._id == req.auth._id;
    if(!check){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    let check = req.profile && req.auth &&  req.profile.role === 1;
    if(!check){
        return res.status(403).json({
            error:"You are not admin,ACCESS DENIED"
        })
    }
    next();
}