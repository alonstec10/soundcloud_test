var _                = require('lodash');
var express          = require('express');
var cookieParser     = require('cookie-parser');
var compress         = require('compression');
var session          = require('express-session');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var secrets          = require('./config/secrets');
var MongoStore       = require('connect-mongo')({ session: session });
var path             = require('path');
var passport         = require('./models/soundcloud-passport-settings'); 
var app              = express();
var router           = express.Router();
//var passportSettings = require('./config/passport');
var apiController    = require('./controllers/api');
var sess;

 
app.locals.cacheBuster = Date.now();
app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(function(req, res, next) {
  if (req.method !== 'GET') return next();
  var path = req.path.split('/')[1];
  if (/(auth|login|logout|signup)$/i.test(path)) return next();
  //req.session.returnTo = req.path;
  
  //console.log("bleh");

  if(req.session.code)
  {
    console.log("code: " + req.session.code);
  }

  sess = req.session;
  sess.code;


  
  next();
});


app.get('/', function(req, res, next){
  res.json({Welcome: 'Soundcloud middle-layer API'});
});


//router
app.use('/api', require('./routes/api'));

app.get('/auth/soundcloud', passport.authenticate('soundcloud'));
app.get('/auth/soundcloud/callback', passport.authenticate('soundcloud', { failureRedirect: '/error' }), function(req, res) {
    
  sess = req.session;

  sess.code  = req.query.code;

  res.json({
    success: true,
    code: 200,
    results: 'Authorized'
  });
});


app.listen(3000);

module.exports  = app;







