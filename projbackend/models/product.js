const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        maxlength:2000,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo: {
        data:Buffer,
        contentType:String
    }
},{timestamps:true})


module.exports = mongoose.model("Product",productSchema)

