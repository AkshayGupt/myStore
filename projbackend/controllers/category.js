const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id,(err,category)=>{
        if(err){
            return res.json({
                error:"NO CATEGORY FOR GIVEN ID"
            })
        }   
        req.category =category;
        next();
    })
   
}

exports.createCategory = (req,res)=>{

    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error:"Not able to save category"
            })
        }
        res.json({category});
    })
}

exports.getAllCategory = (req,res)=>{
    Category.find((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No category present"
            })
        }
        res.json(categories);
    })
}


exports.getCategory = (req,res) =>{
        res.json(category);
}