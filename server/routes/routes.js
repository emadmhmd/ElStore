var express = require('express');
var router = express.Router();
const passport=require('passport')
const customerController=require('../controllers/customerController.js')
const productController=require('../controllers/productController.js')
const orderController=require('../controllers/orderController.js')
const rateController=require('../controllers/rateController.js')
const imageController=require('../controllers/productImageController.js')



router.post('/signUp', customerController.signUp);
router.post('/signIn', customerController.signIn);

router.all('*',(req ,res , next )=>{
  passport.authenticate('jwt' , {session : false}, (err , user)=>{
    if(err || !user){
      const error = new Error('You Are Not Authorized to Access This the Area');
      error.status=401;
      throw error;
    }
    req.user=user;
    return next();
  })(req,res,next);
});

router.get('/getUser',customerController.getUser)
router.put('/updateUser',customerController.updateUser)
router.put('/uploadProductImage/:id',imageController.uploadProductImage)

router.post('/addProduct',productController.addProduct)
router.delete('/deleteProduct/:_id',productController.deleteProduct)
router.put('/archiveProduct/:_id',productController.archiveProduct)
router.put('/updateProduct/:_id',productController.updateProduct)
router.get('/fetchProducts',productController.fetchProducts)
router.get('/searchProduct/:title',productController.searchProduct)
router.get('/fetchProduct/:productId',productController.fetchProduct)

/*router.get('/filterProducts/:category?/:type?/:minPrice/',productController.filterProducts)
router.get('/fetchProducts/:title?/:code?',productController.fetchProducts)*/

router.post('/addOrder/:productId',orderController.addOrder)
router.put('/checkout',orderController.checkout)
router.put('/changeStatus/:cartId/:status',orderController.changeStatus)
router.get('/fetchOrders',orderController.fetchOrders)
router.get('/fetchCarts/:status',orderController.fetchCarts)
router.get('/fetchCart/:cartId',orderController.fetchCart)
//router.put('/updateOrderStatus/:_id/:status',orderController.updateOrderStatus)
//router.put('/updateOrder/:_id/:flage',orderController.updateOrder)

router.get('/fetchFavOrders',orderController.fetchFavOrders)
router.post('/addFavOrder/:productId/:value',orderController.addFavOrder)

router.post('/addRate',rateController.addRate)
router.get('/fetchRates/:_id',rateController.fetchRates)

module.exports = router;
