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