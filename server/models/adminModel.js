const mongoose =require('mongoose');
const bcryptjs =require('bcryptjs');



const admin = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        unique:true,
    },
    email :{
        type : String,
        required:true,
        unique:true,
    },
    password :{
        type : String,
        require :true
    },
    rank :{
        type : Number,
    },
    joined:{
        type:Date,
        default:new Date()
    },
    resetLink:{
        type:String,
        default:""
    },
})



//for compare hashed password with sended password
customer.methods.isPasswordMatched= function (passwoed , hashed , callback){
    bcryptjs.compare(passwoed , hashed , (err , match)=>{

        if(err) {return callback(err);}
        else    {return callback(null ,match);}

    })
}


module.exports = mongoose.model( 'Admin' , admin) ;