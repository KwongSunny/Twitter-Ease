const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {
  tweet
} = require('./twitter_func/features')

const { twitter, callback} = require('./oauth_util')
const { response } = require('express')
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET

  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(
    express.urlencoded({
    extended: true
  })
  )


  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || 'secret' }))

  app.listen(3000, () => console.log('listening on 3000'))


  // ************ROUTERS AND STUFF**********
  // path to client 
 //app.use(express.static(path.join('../../public')))

  // simple home page
  app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
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
    res.send(`Hello, ${req.cookies.twitter_screen_name}`)
  })
  app.post('/twitter/tweet',tweet)





