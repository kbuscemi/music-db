var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');

require('dotenv').config();
require('./config/database');
require('./config/passport');

var index = require('./routes/index');
var users = require('./routes/users');
var credits = require('./routes/credits');
var api = require('./routes/api');
var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'Music-DB',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use((req, res, next) => {req.user = req.session.user; next()})
app.use(passport.session());

app.use('/', index);
app.use('/', users);
app.use('/credits', credits);
app.use('/', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
