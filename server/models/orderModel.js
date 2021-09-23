const mongoose =require('mongoose');

const order = mongoose.Schema({
    status : {
        type : String,
    },
    fav:{
        type : String,
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    },
    product :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    added:{
        type:Date,
        default:new Date()
    },
    count:{
        type:Number,
        default:1
    }
})

module.exports = mongoose.model( 'Order' , order) ;