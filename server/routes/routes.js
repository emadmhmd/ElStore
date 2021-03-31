var express = require('express');
var router = express.Router();
const passport=require('passport')
const customerController=require('../controllers/customerController.js')


/* GET home page. */
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

router.get('/getProfile',customerController.getProfile)

module.exports = router;
