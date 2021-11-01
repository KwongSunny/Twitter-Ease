const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const {
  twitter,
  logout,
  callback,
  home
} = require('./oauth_util')

const path = require('path')
const COOKIE_SECRET = process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET

main()
  .catch(err => console.error(err.message, err))

async function main () {
  const app = express()
  app.use(cookieParser())
  app.use(session({ secret: COOKIE_SECRET || 'secret' }))

  app.listen(3000, () => console.log('listening on http://127.0.0.1:3000'))

  app.get('/', home)
  // path to client 
  app.use(express.static(path.resolve(__dirname, 'client')))

  app.get('/twitter/logout', logout)
  app.get('/twitter/authenticate', twitter('authenticate'))
  app.get('/twitter/authorize', twitter('authorize'))
  app.get('/twitter/callback', callback)
}