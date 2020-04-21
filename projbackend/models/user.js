const mongoose = require( "mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true,
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

//call the securePassword method
userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password;
})

//this method return hashed password
userSchema.methods = {

    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function(plainPassword){
        if(!plainPassword) return "";
        try {
            //using crypto package and using this.salt as secret 
            return crypto.createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
        } catch (err) {
            return "";
        }
}
}



module.exports = mongoose.model("User",userSchema)