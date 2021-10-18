var app = require('./app');
var http = require('http');
var path = require('path');
var credentials = {key: privateKey, cert: certificate};
var indexRoutes = require('./server/events/routes/index');
var genericRoutes = require('./server/generic/routes/index');
var port = '8000';

var server = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
console.log(`[INFO] Node Red Started`)
RED.init(httpsServer, settings)
app.use(settings.httpAdminRoot, RED.httpAdmin)
app.use(settings.httpNodeRoot, RED.httpNode)
app.use('/twitter/', indexRoutes);
app.use('/user/', genericRoutes);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

//server.listen(port)

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

server.setTimeout(500000);