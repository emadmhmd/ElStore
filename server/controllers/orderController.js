const orderController = {};
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');



//add to cart or increase order count 
orderController.addOrder = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const orderObj = await Order.findOne({ customer: req.user._id, product: productId, status: 'pending' }).populate('product')
        if (orderObj) {
            if (orderObj.product.count > orderObj.count) await Order.updateOne(orderObj, { count: orderObj.count + 1 })
        } else {
            const order = { customer: req.user._id, product: productId, status: 'pending' }
            const newOrder = new Order(order)
            await newOrder.save()
            cart = await Cart.findOne({ customer: req.user._id, status: 'pending' })
            if (cart) {
                await Cart.updateOne({ customer: req.user._id, status: "pending" }, { cart: [...cart.cart, newOrder._id] })
            } else {
                const cart = { customer: req.user._id, cart: [newOrder._id], status: 'pending' }
                const newCart = new Cart(cart)
                await newCart.save()
            }
        }
        return res.send({
            message: 'The product added ssuccessfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add your product'
        });
    }
}
orderController.addFavOrder = async (req, res, next) => {
    const { productId, value } = req.params;
    try {
        const orderObj = await Order.findOne({ customer: req.user._id, product: productId, fav: { $in: ['fav', 'viewd', 'no'] } })
        if (orderObj) {
            await Order.updateOne(orderObj, { fav: value })
        } else {
            const order = { customer: req.user._id, product: productId, fav: value }
            const newOrder = new Order(order)
            await newOrder.save()
        }
        return res.send({
            message: 'The product added ssuccessfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add your product'
        });
    }
}

//fetch cart for customer
orderController.fetchOrders = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ customer: req.user._id, status: 'pending' })
        if (cart) {
            let products = []
            for (order of cart.cart) {
                products.push(await Order.findById({ _id: order }).populate('product'))
            }
            return res.send({
                cart: products
            })
        }
        return res.send({
            cart: []
        })
    } catch (e) {
        console.error('error')
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
orderController.fetchFavOrders = async (req, res, next) => {
    try {
        let orders=[]
        orders = await Order.find({ customer: req.user._id, fav:'fav' }).populate('product customer')
        return res.send({
            message:'Fav Orders Fetched Successfully',
            orders
        })
    } catch (e) {
        console.error('error fetch fav orders' , e)
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }

}


//fetch orders to admin
orderController.fetchCarts = async (req, res, next) => {
    const {status}=req.params
    try {
        const carts = await Cart.find({ status }).populate('customer')
        return res.send({
            carts,
            message: 'Fetching carts successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
//fetch on cart bu customer id for show and prepare cart products 
orderController.fetchCart = async (req, res, next) => {
    const { cartId } = req.params
    try {
        const cart = await Cart.findOne({ _id: cartId, status: 'checked' })
        let products = []
        for (order of cart.cart) {
            products.push(await Order.findById({ _id: order }).populate('product'))
        }
        return res.send({
            cart: products,
            message: 'fetching cart products successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
//after add to cart , to convert order status from pending to checked

orderController.checkout = async (req, res, next) => {
    try {
        await (await Order.find({ customer: req.user._id, status: 'pending' }).populate('product')).forEach(async (item) => {
            if (item.product.count - item.count === 0) {
                await Product.updateOne({ _id: item.product._id }, { count: (item.product.count - item.count), status: 'out' })
            } else if (item.product.count - item.count > 0) {
                await Product.updateOne({ _id: item.product._id }, { count: (item.product.count - item.count) })
            } else {
                return res.status(401).send({
                    product: item.product,
                    error: `the required count of ${item.product.title} product is unavailable`
                });
            }
        })
        await Order.updateMany({ customer: req.user._id, status: 'pending' }, { status: 'checked' })
        await Cart.updateOne({ customer: req.user._id, status: 'pending' }, { status: 'checked' })
        return res.send({
            message: 'checked successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to checked'
        });
    }
}

//change cart and orders status by admin or delivery man
orderController.changeStatus = async (req, res, next) => {
    const { status, cartId } = req.params
    try {
        const cart = await Cart.findByIdAndUpdate({ _id: cartId }, { status })
        for (order of cart.cart) {
            await Order.updateOne({ _id: order }, { status })
        }
        return res.send({
            message: 'status changed successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to change status'
        });
    }
}


//to add product to cart , fav or viewed 
/*orderController.addOrder = async (req, res, next) => {
    const { productId, value, flage } = req.params;
    let orderObj = {}, order = {}
    try {
        orderObj = await Order.findOne({ customer: req.user._id, product: productId }).populate('product')
        if (!orderObj) {
            customer = await Order.findOne({ customer: req.user._id })
            if (customer) {
                order = { customer: req.user._id, product: productId, cart: [...customer.cart, productId] }
                await Order.updateOne({ customer: req.user._id }, order)
            }
            else {
                order = { customer: req.user._id, product: productId, cart: [productId] }
                order[flage] = value
                const newOrder = new Order(order)
                await newOrder.save()
            }
        } else {
            if (flage === 'fav') {
                await Order.updateOne({ product: productId }, { fav: value })
            } else if (orderObj.status === 'pending' && flage === 'status' && value === 'pending' && (orderObj.product.count > orderObj.count)) {
                await Order.updateOne(orderObj, { count: orderObj.count + 1 })
            } else if (orderObj.status === 'checked' && flage === 'status' && value === 'pending') {
                const newOrder = new Order({ customer: req.user._id, product: productId, status: 'pending' })
                await newOrder.save()
            } else await Order.updateOne(orderObj, { status: 'pending', count: 1 })
        }
        return res.send({
            message: 'The product added ssuccessfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to add your product'
        });
    }
}*/
//fetch orders to cart or fav
/*orderController.fetchOrders = async (req, res, next) => {
    try {
        const order = await Order.findOne({ customer: req.user._id, status: 'pending' })
        let products = []
        for (product of order.cart) {
            products.push(await Product.findById({ _id: product }))
        }
        return res.send({
            orders: products
        })
    } catch (e) {
        console.error('error')
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}
*/
/*orderController.fetchOrders = async (req, res, next) => {
    try {
        const { flage, value } = req.params
        let orders={}
        if(flage==='status') { orders = await Order.find({ customer:req.user._id , status:{$in:['pending' , 'out']} }).populate('product cart');}
        else { orders = await Order.find({customer:req.user._id , fav: value}).populate('product cart');}
        return res.send({
            orders
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Fetching failed'
        });
    }
}*/

//to delete order from fav or cart
orderController.updateOrder = async (req, res, next) => {
    const { _id, flage } = req.params;
    let order = {}
    try {
        if (flage == 'status') order = { status: 'del', count: 0 }
        else order = { fav: 'del' }
        await Order.updateOne({ _id }, order)
        return res.send({
            message: 'The Product updated/deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to updated/deleted the Product'
        });
    }
}

//to increase order count 
orderController.updateOrderCount = async (req, res, next) => {
    const { _id, count } = req.params;
    let order = {}
    try {
        order = await Order.find({ _id }).populate('product')
        if (order.product.count >= count + order.count) {
            await Order.updateOne({ _id }, { count: count + order.count })
        } else {
            await Order.updateOne({ _id }, { count: order.product.count })
        }
        return res.send({
            message: 'The Product count updated successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to updated the count of Product'
        })
    }
}

orderController.updateOrderStatus = async (req, res, next) => {
    const { _id, status } = req.params
    try {
        await Order.updateOne(
            { _id },
            { status }
        )
        return res.send({
            message: 'The Product updated/deleted successfully'
        })
    } catch (e) {
        return res.status(401).send({
            error: 'Please try again to updated/deleted the Product'
        });
    }
}
module.exports = orderController