
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('express-session')
var logger = require('morgan');
require('dotenv').config()
const mysql = require("mysql2");
const dataSet= require('./server/dataset/mysql')


var bodyParser = require('body-parser')
var app = express();

const mysqlConfig={
  host: process.env.dbhost,
  user:'root',
  password: process.env.dbpassword,
  database: 'kiss',
  connectTimeout:48800,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 5000
}


const PoolConnection = mysql.createPool(mysqlConfig);
let pool = PoolConnection.promise()
var DataSource =async(req,res,next)=>{
  //let connection = await twitterpool.getConnection()
  let mysqlPool = new dataSet(PoolConnection,pool)
  req["db"]=mysqlPool
  next()
}

//const client = new MongoClient();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(DataSource);



app.use(cookieParser('f3452adfc5'));
app.use(cookieSession({ 
  name: 'temp',
  secret: 'ThisHasChanged',
  keys: ['f3452adfc5','hpiia#123%3'], 
  resave: true,
  saveUninitialized: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
}));

app.use(express.static(path.join(__dirname, 'dist')));


module.exports = app;
