// twitter dev account keys to access API
require('dotenv').config()
const twit = require('twit')
const twitterAPI = new twit({
    consumer_key : process.env.api_key,
    consumer_secret : process.env.api_secret,
    access_token : process.env.access_token,
    access_token_secret : process.env.access_token_secret
});
module.exports = {twitterAPI}