const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs= require("fs");

exports.getProductById = (req,res,next,id) =>{

    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product=product;
        next();
    })
}

exports.createProduct = (req,res) =>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{ //Here fields is basically text data and file is responsible for photos(any binary data)
        if(err){
            return res.status(400).json({
                error:"Image error"
            })
        }

        //Restrictions on fields
        const {name, description, price, category,stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                        error:"Please fill all the fields!  "
                    })
        }
        let product = new Product(fields);

        //Handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"Image size exceeded limit!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to database
        // product.save()
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(product);
        });
    });
}

exports.getProduct = (req,res) =>{
    const data=req.product;
    data.photo = undefined;
    res.json(data);
}

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{ //Here fields is basically text data and file is responsible for photos(any binary data)
        if(err){
            return res.status(400).json({
                error:"Image error"
            })
        }

                        //Restrictions on fields
                        // const {name, description, price, category,stock} = fields;
                        // if(!name || !description || !price || !category || !stock){
                        //     return res.status(400).json({
                        //                 error:"Please fill all the fields!  "
                        //             })
                        // }
        
        //Updation 
        let product = req.product;
        product = _.extend(product,fields);

        //Handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"Image size exceeded limit!"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to database
        // product.save()
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed to update!"
                })
            }
            res.json(product);
        });
    });
}

exports.deleteProduct = (req,res)=>{

    const product=req.product;
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error:`Failed to delete ${product}`
            })
        }
        res.json(product);
    })

}

//middleware
exports.photo = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.getAllProducts =(req,res)=>{
    
    let limit = req.query.limit ? req.query.limit : 8
    let sortBy = req.query.sortBy ? req.query.sortBy: "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Can't Load products"
            })
        }
        // console.log((products));
        return res.json(products);
    })
}

exports.getAllUniqueCategories = (req,res)=>{

    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"Unable to find categories"
            })
        }
        res.json(categories);
    })
}

//Middleware
exports.updateStock = (req,res,next)=>{
    let operation= req.body.order.product.map(prod =>{
        return{
            updateOne: {
                filter:{_id:prod._id},
                update:{$inc: { stock: -prod.count,sold: +prod.count}}
            }
        }
    });

    Product.bulkWrite(operation, {},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }

        next();
    })
}

