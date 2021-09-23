let adminController={}
const Admin=require('../models/adminModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

adminController.signUp= async (req, res, next) => {
    const { userName, mobile, email, password} = req.body;
    const newAdmin = new Admin({
        userName, mobile, email,password
    })

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(newAdmin.password, salt);
        newAdmin.password = hashpass
        await newAdmin.save();
        return res.send({
            message: 'You are Registreted Successfully'
        });

    } catch (e) {
        console.log('err')
        if (e.code === 11000 && e.name === "MongoError") {
            return res.status(401).send({
                error: `Email Address ${newAdmin.email} Is already Exist`
            });
        } else {
            return res.status(401).send({
                error: `Please Try Again To SignUp , Failed Registartion !!`
            });
        }

    }
};

adminController.signIn=async (req, res, next) => {
    const { email, password } = req.body;
    try {
        var admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send({
                error: `The Email ${email} Is Not Found`
            });
        } else {
            admin.isPasswordMatched(password, admin.password, (err, match) => {
                if (match) {
                    const scret = process.env.JWT_SECRET;
                    const expir = process.env.JWT_EXPIRATION;
                    const token = jwt.sign({ _id: admin._id }, scret, { expiresIn: expir });
                    return res.send({
                        token,
                        message: 'You are loged successfully'

                    });
                }
                return res.status(401).send({
                    error: 'Invaild UserName/Password Combination'
                });
            })
        }
    } catch (e) {
        return res.status(401).send({
            error: `Please try again to login , login failed !!`
        });
    }
}


adminController.updateAdmin = async (req, res, next) => {
    const { userName, mobile, email, password,} = req.body;
    const { user } = req
    const updatedAdmin = {
        userName, mobile, email, password
    }
    try {
        await Admin.updateOne({ _id: user._id }, updatedAdmin)
        return res.send({
            message: 'The profile updated successfully'
        });
    } catch (e) {
        return res.status(401).send({
            error: `Fail to update the profile , please try again`
        });
    }
};


module.exports=adminController