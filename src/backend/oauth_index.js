const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const twit = require('./twitter_func/twitter')
const {
  twitter,
  logout,
  callback,
  home
} = require('./oauth_util')
const path = require('path')
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
  const app = express()
  app.use(express.json())
  app.use(
    express.urlencoded({
    extended: true
  })
  )
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || 'secret' }))

  app.listen(3000, () => console.log('listening on http://127.0.0.1:3000'))


  // ************ROUTERS AND STUFF**********
  // path to client 
  //app.use(express.static(path.resolve('../../public')))
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // simple home page
  app.get('/', (req, res) => {
    res.send('Welcome To TwitterEase');
  });
  // route to logout
  app.get('/twitter/logout', (req, res, next) => {
    res.clearCookie('twitter_screen_name')
    req.session.destroy(() => res.redirect('/'))
  })
  // route to authenticate
  app.get('/twitter/authenticate', twitter('authenticate'))
  app.get('/twitter/authorize', twitter('authorize'))
  app.get('/twitter/callback', callback)
  app.get('/dashboard', (req,res,next) => {
    req.cookies.twitter_screen_name = data["screen_name"];
    res.send(`Hello, ${req.cookies.twitter_screen_name}`)
  })



