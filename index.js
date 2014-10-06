'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var http = require('http');

var users = [{_id: 'matt', password: 'hello', full_name: 'matt kim', email: 'matthewjkim@gmail.com'}];

// Serialize the user id to push into the session
passport.serializeUser(function(user, done) {
    console.log('serializing user', user._id);
    done(null, user._id);
});

// Deserialize the user object based on a pre-serialized token
// which is the user id
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser user', id);
     done(null, users[0]); //only one anyway
});


// Use local strategy
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
      console.log('in local strategy');
      return done(null, users[0]);
    }
));



var app = express();

app.use(function (req, res, next) {
  console.log('req.headers.origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});


// all environments
app.set('port', 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.bodyParser()); 
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);




app.get('/user', function(req, res) { //should be logged in
  if (req.user) {
    res.send(200, { 
      user: req.user
    });    
  } else {
    res.send(401);
  }
});

app.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('user', req.user);
  res.send(200, { user: req.user});
});

app.get('/logout', function(req, res) {
  req.logOut();
  res.send(200);
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('API server listening on port ' + app.get('port'));
});



var app_cross_domain = express();

// all environments
app_cross_domain.set('port', 3001);
app_cross_domain.use(express.static(__dirname + '/public'));

http.createServer(app_cross_domain).listen(app_cross_domain.get('port'), function(){
  console.log('Login server listening on port ' + app_cross_domain.get('port'));
});
