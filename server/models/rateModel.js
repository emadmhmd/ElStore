const mongoose =require('mongoose');

const rate = mongoose.Schema({
    star : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required:true,
    },
    verify:{
        type:Boolean,
    },
    added:{
        type:Date,
        default:new Date()
    },
    rater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required : true
    },
    ratee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required : true
    },
})



module.exports = mongoose.model( 'Rate' , rate) ;