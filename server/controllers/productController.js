const productController = {};
const { query } = require('express');
const Product = require('../models/productModel');

productController.addProduct = async (req, res, next) => {
    const { title, desc, category, code, type, price, discount,count , status } = req.body;
    const newProduct = new Product({
        title, desc, category, type, price, discount, code,count , status,
        adminID: req.user
    })
    try {
        await newProduct.save()
        return res.send({
            message: 'The product added ssuccessfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add your product'
        });
    }
}


productController.deleteProduct = async (req, res, next) => {
    const { _id } = req.params;
    try {
        await Product.deleteOne({ _id });
        return res.send({
            message: 'The Product deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to delete the Product'
        });
    }
}
productController.archiveProduct = async (req, res, next) => {
    const { _id } = req.params;
    try {
        await Product.updateOne({ _id } , {status:"archive"});
        return res.send({
            message: 'The Product archived successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to archive the Product'
        });
    }
}
//seearch by title
productController.searchProduct = async (req, res, next) => {
    const {title}=req.params
    /*if(integer(title[title.length-1]))  query={code:title}
    else query ={title}*/
    try {
        //const products = await Product.find({title:{ $regex: title, $options: "i" }} );
        const products = await Product.find( {$or:[ 
            {title:{ $regex: title, $options: "i" }}, 
            {desc:{ $regex: title, $options: "i" }},
            {code:{ $regex: title, $options: "i" }},
            {category:{ $regex: title, $options: "i" }},
            {type:{ $regex: title, $options: "i" }},
            {section:{ $regex: title, $options: "i" }}
         ]})
            
       
        return res.send({
            products
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
productController.fetchProducts = async (req, res, next) => {
    const {category , type , minPrice, maxPrice , section , brand , status}=req.query
    console.log('query' ,req.query.section)
    try {
        let query
        //{(minPrice && maxPrice) ? query={ price :{'$lt' : maxPrice } , price : { '$gt' : minPrice }} :  query={}}
        if(minPrice && maxPrice)query={ price :{'$lt' : maxPrice } , price : { '$gt' : minPrice }}
        else if(minPrice)query={ price : { '$gt' : minPrice } }
        else if(maxPrice)query={ price : { '$lt' : maxPrice } }
        else query={}
        {category?query.category=category : ''}
        {type?query.type=type : ''}
        {section?query.section=section : ''}
        {brand?query.brand=brand : ''}
        {status?query.status=status : ''}
        const products = await Product.find(query);
        return res.send({
            products
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
//for ptoduct details page 
productController.fetchProduct= async (req, res, next) => {
    const {productId}=req.params
    try {
        const product = await Product.findOne({_id:productId});
        return res.send({
            product,
            message:'product fetched successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
//fetch products by search for customer
/*productController.fetchProducts = async (req, res, next) => {
    const {title , code}=req.params
    try {
        const products = await Product.find({ title , code});
        return res.send({
            products
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}*/
productController.updateProduct = async (req, res, next) => {
    const { title, desc, code , category, type, price, discount ,count , status } = req.body;
    const { _id } = req.params;
    try {
        await Product.updateOne(
            { _id },
            { title, desc, code , category, type, price, discount  ,count , status}
        )
        return res.send({
            message: 'The Product updated successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to update the Product'
        });
    }
}
productController.fetchHomeProducts = async (req, res, next) => {
    try {
        if(req.user){
            const products=await Order.find({customer:req.user._id ,fav:{ $exists: true}}).populate('product')
        }else{
            
        }
        return res.send({
            products
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
module.exports = productController