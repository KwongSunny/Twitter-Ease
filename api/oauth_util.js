const oauth = require('oauth')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const TWITTER_CONSUMER_API_KEY = process.env.npm_config_twitter_consumer_api_key || process.env.api_key
const TWITTER_CONSUMER_API_SECRET_KEY = process.env.npm_config_twitter_consumer_api_secret_key || process.env.api_secret
const TEMPLATE = fs.readFileSync(path.resolve(__dirname, 'client', 'template.html'), { encoding: 'utf8' })

const oauthConsumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  '1.0A', 'http://127.0.0.1:3000/twitter/callback', 'HMAC-SHA1')

// get user by id -> returns body of object type
async function oauthGetUserById (userId, { oauthAccessToken, oauthAccessTokenSecret } = {}) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, oauthAccessToken, oauthAccessTokenSecret)
    .then(body => JSON.parse(body))
}

async function getOAuthAccessTokenWith ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier } = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth access token'))
        : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
    })
  })
}

async function getOAuthRequestToken () {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
      return error
        ? reject(new Error('Error getting OAuth request token'))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
    })
  })
}
// method defaults to authorize
function twitter (method = 'authorize') {
  return async (req, res) => {
    console.log(`/twitter/${method}`)
    const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken() // gets the request token using getOAuthRequestToken()
    console.log(`/twitter/${method} ->`, { oauthRequestToken, oauthRequestTokenSecret })

    req.session.oauthRequestToken = oauthRequestToken
    req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

    const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`
    console.log('redirecting user to ', authorizationUrl)
    res.redirect(authorizationUrl)
  }
}

function logout (req, res, next) {
  res.clearCookie('twitter_screen_name')
  req.session.destroy(() => res.redirect('/'))
}

// authenticate request token
async function callback(req, res) {
  const { oauthRequestToken, oauthRequestTokenSecret } = req.session
  const { oauth_verifier: oauthVerifier } = req.query
  console.log('/twitter/callback', { oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })

  const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
  req.session.oauthAccessToken = oauthAccessToken

  const { user_id: userId } = results
  const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret })
  console.log(user)

  req.session.twitter_screen_name = user.screen_name
  res.cookie('twitter_screen_name', user.screen_name, { maxAge: 900000, httpOnly: true })

  console.log('user succesfully logged in with twitter', user.screen_name)
  req.session.save(() => res.redirect('/'))
}

async function home(req, res, next) {
  console.log('/ req.cookies', req.cookies)
  if (req.cookies && req.cookies.twitter_screen_name) {
    console.log('/ authorized', req.cookies.twitter_screen_name)
    return res.send(TEMPLATE.replace('CONTENT', `
      <h1>Hello ${req.cookies.twitter_screen_name}</h1>
      <br>
      <a href="/twitter/logout">logout</a>
    `))
  }
  return next()
}

module.exports = {
  twitter,
  oauthGetUserById,
  getOAuthAccessTokenWith,
  getOAuthRequestToken,
  logout,
  callback,
  home
}