let customerController={}
const Customer=require('../models/customerModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

customerController.signUp= async (req, res, next) => {
    const { userName, mobile, email, password, type} = req.body;
    const newCustomer = new Customer({
        userName, mobile, email,password, type
    })

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashpass = await bcryptjs.hash(newCustomer.password, salt);
        newCustomer.password = hashpass
        await newCustomer.save();
        return res.send({
            message: 'You are Registreted Successfully'
        });

    } catch (e) {
        console.log('err')
        if (e.code === 11000 && e.name === "MongoError") {
            return res.status(401).send({
                error: `Email Address ${newCustomer.email} Is already Exist`
            });
        } else {
            return res.status(401).send({
                error: `Please Try Again To SignUp , Failed Registartion !!`
            });
        }

    }
};

customerController.signIn=async (req, res, next) => {
    const { email, password } = req.body;
    try {
        var customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).send({
                error: `The Email ${email} Is Not Found`
            });
        } else {
            customer.isPasswordMatched(password, customer.password, (err, match) => {
                if (match) {
                    const scret = process.env.JWT_SECRET;
                    const expir = process.env.JWT_EXPIRATION;
                    const token = jwt.sign({ _id: customer._id }, scret, { expiresIn: expir });
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
customerController.getProfile = (req, res, next) => {
    const { user } = req;
    return res.send({ user })

}
module.exports=customerController