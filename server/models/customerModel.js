const mongoose =require('mongoose');
const bcryptjs =require('bcryptjs');


const type=1;
const customer = mongoose.Schema({
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
    address :{
        type : String
    },
    city :{
        type : String
    },
    state :{
        type : String
    },
    password :{
        type : String,
        require :true
    },
    type :{
        type : Number,
        default:type
    },
    rank :{
        type : Number,
    },
    joined:{
        type:Date,
        default:new Date()
    },
    rate:{
        type:Number
    },
    resetLink:{
        type:String,
        default:""
    },
})


//for encrypt password

/*user.pre('save' ,async (next)=>{
    //check if new password , or password is modified
    if(!this.isModified('password')){
        return next();
    }
    
    //encrypt password
    try{
        const salt = await bcryptjs.genSalt(10);
        const hashpass =await bcryptjs.hash(this.password , salt);
        this.password =hashpass;
        next();
    }catch(err){
        return next(err);
    }
    
})*/


//for compare hashed password with sended password
customer.methods.isPasswordMatched= function (passwoed , hashed , callback){
    bcryptjs.compare(passwoed , hashed , (err , match)=>{

        if(err) {return callback(err);}
        else    {return callback(null ,match);}

    })
}


module.exports = mongoose.model( 'Customer' , customer) ;