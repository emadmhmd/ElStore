var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport= require('passport');
var mongoose=require('mongoose');
const cors = require('cors');


const bp = require('body-parser');


var indexRouter = require('./routes/routes');
//var usersRouter = require('./routes/users');


var app = express();
app.use(cors())
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use(passport.initialize());      
app.use(passport.session());
require('./config/passport.js')(passport);


mongoose.connect(process.env.store2000_DB_URL , { 
  useNewUrlParser: true ,
  useCreateIndex : true
} );
mongoose.connection.on('connected',()=>{
  console.log(`Connected Successfully To Database `)
});
mongoose.connection.on('error',(err)=>{
  console.error(`Failed To Database : ${err}`)
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
  return  res.status[404].send({
    error:'page not found'
  })
});


module.exports = app;