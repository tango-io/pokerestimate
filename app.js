
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app           = express();
var config        = require('./config');
var flash         = require('connect-flash');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt');
var inspect       = require('eyes').inspector({ stream: null });


if(!config){throw new Error('Configuration file missing');}
process.env.PORT = process.env.PORT || config.app.PORT;

var User = require('./models/user');
var database = require("./config/database");

database.open(config.database, function(err, db){
  console.log(inspect('Database Ready!'));

  // Set up database
  process.database = db;
});

var findUser = function(username, callback) {
  User.getByUsername(username, function(error, user){
    return callback(error, user);
  });
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getById(id, function(error, user){
    done(error, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
  process.nextTick(function () {
    findUser(username, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        User.create({email: username, password: password}, function(er, newUser){
          if(er){return done(err, false, er.message);}
          if(newUser.message){
            return done(err, false, { message: newUser.message });
          }
          return done(null, newUser);
        });
      }else{
        bcrypt.compare(password, user.password, function(err, res) {
          if(!res){ return done(err, false, { message: 'Incorrect password.' }); }
          return done(err, user);
        });
      }

    });
  });
}
));


app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'Poker Estimate' }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes/index')(app, passport);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log(inspect("Express server listening on port " + app.get('port')));
});

process.io = require('socket.io').listen(server);
var sockets = require('./libs/socket');

sockets.start();
