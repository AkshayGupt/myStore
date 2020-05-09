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
                error:err
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
        res.json(req.category);
}

exports.updateCategory =(req,res)=>{
    let category= req.category
    category.name=req.body.name
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"failed to update category"
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req,res)=>{
    const category= req.category;

    category.remove((err,deletedCategory)=>{
        if(err){
            return res.status(400).json({
                error:`Failed to delete ${category.name}`
            })
        }
        res.json({
            message:`Successfully deleted ${deletedCategory.name}`
        })
    })
}