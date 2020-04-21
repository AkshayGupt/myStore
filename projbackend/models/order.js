const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} =Schema;


const productCartSchema = new Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:{
        type:Number,
        default:1
    },
    price:Number
});

const ProductCart = mongoose.model("ProductCart",productCartSchema)
const orderSchema = new Schema ({
    product:[productCartSchema],
    transaction_id = {},
    amount:{ type:Number },
    address:{type:String},
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})
const Order = mongoose.model("Order",orderSchema)

module.exports = {ProductCart,Order}
