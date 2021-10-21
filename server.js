var app = require('./app');
var http = require('http');
var path = require('path');
var createError=require('create-error');
var eventsRoutes = require('./server/events/routes/index');
var genericRoutes = require('./server/generic/routes/index');
var portalRoutes = require('./server/portal/routes/index');
var port = '8000';

var server = http.createServer(app);
app.use('/events/', eventsRoutes);
app.use('/user/', genericRoutes);
app.use('/', portalRoutes);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});



app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', (reason, p) => {
  console.error(reason);
  console.error(p);
}).on('uncaughtException', err => {
  console.error(err); 
}).on('UnhandledPromiseRejectionWarning', err => {
  console.error(err);
})
server.listen(port)
server.setTimeout(500000);