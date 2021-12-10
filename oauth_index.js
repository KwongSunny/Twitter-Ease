const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 5000
const {
  tweet, timeline, retweet, deleteTweet, unlike1, likeNretweet, like, unlike2, unretweet,scheduleTweet, updateTweet, all_schedules, unlike, singular_like, singular_retweet, singular_unretweet, delete_schedule
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
  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || 'secret' }))
  //static file
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.listen(PORT, () => console.log(`listening on ${PORT}`))
  app.get('/', (req, res, next) => {
    res.redirect('http://localhost:3000/')
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
  app.get('/twitter/search/retweet',retweet)
  app.get('/twitter/home/purge',deleteTweet)
  app.get('/twitter/home/unlike1',unlike1)
  app.get('/twitter/home/')
  app.get('/twitter/like-n-retweet',likeNretweet)
  app.get('/twitter/search/like',like)
  app.get('/twitter/home/unlike2',unlike2)
  app.get('/twitter/home/unretweet',unretweet)
  app.post('/twitter/scheduler',scheduleTweet)
  app.put('/twitter/scheduler/:id',updateTweet)
  app.get('/twitter/schedule_database',all_schedules)
  app.post('/twitter/search/singular-like',singular_like)
  app.post('/twitter/search/singular-unlike',unlike)
  app.post('/twitter/search/singular-retweet',singular_retweet)
  app.post('/twitter/search/singular-unretweet',singular_unretweet)
  app.delete('/twitter/delete_schedule/:id',delete_schedule)


  
  






