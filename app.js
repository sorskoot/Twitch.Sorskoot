var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');

var prestreamTickerRouter = require('./routes/prestream-ticker');
var endstreamCreditsRouter = require('./routes/endstream-credits');
var twitchCallbackRouter = require('./routes/twitch-callback');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/prestream-ticker', prestreamTickerRouter);
app.use('/endstream-credits', endstreamCreditsRouter);
app.use('/webhook', twitchCallbackRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if(req.url != `/favicon.ico`){
    next(createError(404));
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err);

});

module.exports = app;
