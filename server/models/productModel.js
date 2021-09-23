const mongoose = require('mongoose');

const product = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    section: {
        type: String,
        default: 'all'
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'cur'
    },
    price: {
        type: Number,
        require: true
    },
    discount: {
        type: Number,
        default: 0
    },
    added: {
        type: Date,
        default: new Date()
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        require: true
    },
    count: {
        type: Number,
        default: 0
    },
    details:[],
    img:{}
})



module.exports = mongoose.model('Product', product);