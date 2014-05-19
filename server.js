// setup tools
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
  // set up express
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());

  app.set('view engine', 'ejs');

  // express-passport config
  app.use(express.session({ secret: 'thisisasecretsecretsecret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
});

// routes
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log('the magic is happening on port ' + port);
