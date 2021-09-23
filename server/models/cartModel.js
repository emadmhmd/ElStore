const mongoose =require('mongoose');

const cart = mongoose.Schema({
    status : {
        type : String,
    },
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    },
    cart :[{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Product',
    }],
    deliverDateFrom : {
        type : Date,
    },
    deliverDateTo : {
        type : Date
    },
    added:{
        type:Date,
        default:new Date()
    },
  
})

module.exports = mongoose.model( 'Cart' , cart) ;