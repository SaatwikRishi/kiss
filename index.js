var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('express-session')
var logger = require('morgan');
require('dotenv').config()
const mysql = require("mysql2");
const dataSet = require('./server/dataset/mysql')
var bodyParser = require('body-parser')
var path = require('path');
var createError=require('create-error');
var eventsRoutes = require('./server/events/routes/index');
var genericRoutes = require('./server/generic/routes/index');
var portalRoutes = require('./server/portal/routes/index');




var app = express();
const mysqlConfig = {
  host: process.env.dbhost,
  port: process.env.dbport,
  user: process.env.dbuser,
  password: process.env.dbpassword,
  database: process.env.dbname,
  connectTimeout: 48800,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 5000
}


const PoolConnection = mysql.createPool(mysqlConfig);
let pool = PoolConnection.promise()
var DataSource = async (req, res, next) => {
  //let connection = await twitterpool.getConnection()
  let mysqlPool = new dataSet(PoolConnection, pool)
  req["db"] = mysqlPool
  next()
}

//const client = new MongoClient();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(DataSource);
//app.use(cors({origin: "*"}))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();


})

app.use(cookieParser('f3452adfc5'));
app.use(cookieSession({
  name: 'temp',
  secret: process.env.salt,
  keys: [process.env.salt],
  resave: true,
  saveUninitialized: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
}));

app.use(express.static(path.join(__dirname, 'build')));


app.use('/events/', eventsRoutes);
app.use('/user/', genericRoutes);
app.use('/', portalRoutes);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

var PORT  = process.env.PORT || 8080;

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (req, res, next) {
  res.setTimeout(1360000, function () {
    console.error('Request has timed out.');
    res.send(408);
  });
  next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('Error:', err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(8080, () => {
    console.log(
      'Hello! The container started successfully and is listening for HTTP requests on ' + PORT
    );
    console.log('Press Ctrl+C to quit.');
});

