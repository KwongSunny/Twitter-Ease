const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000
const {
  tweet, timeline, retweet, deleteTweet, unlike1, likeNretweet
} = require('./twitter_func/features')
const { twitter, callback} = require('./oauth_util')
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(
    express.urlencoded({
    extended: true
  })
  )
  app.use(express.raw())
  app.use(express.text())
  //app.use(express.static('src'))
  //app.use('public',express.static('public'))
  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || 'secret' }))
  app.listen(PORT, () => console.log(`listening on ${PORT}`))


  // ************ROUTERS AND STUFF**********
  // path to client 
 // app.use(express.static(path.join(__dirname,'../../public','index.html')))
 console.log(__dirname)
  // simple home page
  app.get('/', (req, res, next) => {
    res.redirect('http://localhost:3000/')
    //if (req.cookies && req.cookies.twitter_screen_name)  {
    //  console.log('hello')
      //return res.send(req.cookies.twitter_screen_name)
      //res.sendFile(__dirname + '../../public' + 'index.html')
      //res.sendFile(path.join(__dirname, "../../public", "index.html"));
    //}
  //return next()
  })
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
   // res.sendFile(__dirname + '../../','public' + 'index.html')
    res.send(`Hello, ${req.cookies.twitter_screen_name}`)
  })
  app.post('/twitter/tweet',tweet)
  app.get('/twitter/home',timeline)
  app.get('/twitter/search/:q',retweet)
  app.get('/twitter/home',deleteTweet)
  app.get('/twitter/home/unlike1',unlike1)
  app.get('/twitter/like-n-retweet/:q',likeNretweet)






