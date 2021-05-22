const express = require('express')
const session = require('express-session')
const cors = require('cors');
const router = require('./src/routes/web')
const bodyParser = require('body-parser')
var mongoClient = require('mongodb').MongoClient;
const app = express()

app.use(cors())

// Để chạy server https
const https = require('https');
const fs = require('fs');

// Facebook
const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook').Strategy

// chung chi ssl
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};



passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new FacebookTokenStrategy(
  {
    clientID: '1093184221176094',
    clientSecret: '7e5b7209f80608c75888be506bffb7bb',
    callbackURL: 'https://localhost:3000/auth/facebook/callback'
  },
  function (accessToken, refreshToken, profile, cb) {
    cb(null, profile)
    // console.log(accessToken,profile)
  }
))

// FacebookAuth
router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
)

// Cau hinh body-parser

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))
// Connnect toi facebook
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', router)



// Run server
var server = https.createServer(options, app);

const PORT = process.env.PORT || ;
server.listen(PORT, function () {
  console.log("server running at https://localhost:3000/");
});