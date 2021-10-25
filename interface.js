/*
Functions that interface between front and back end
*/

const twit_funcs = require("./back-end/dm");

//BACKEND TODO:
/*
    Front end gives the backend a Json with username and password values, check if these values are in the account database
    @parameters: 
        accountInfo - Json {email, password}
    @returns: 
        boolean, true if the account exists, false otherwise
    priority: high (as of 10/4)
*/
async function checkValidAccount(accountInfo) {
    const email_part = accountInfo.email
    const password_part = accountInfo.password
    try {
        const response = new fetch(`twitter-ease-api.herokuapp.com/accounts/${email_part}/${password_part}`)
        if(response.ok) {
            const jsonResponse = await response.json();
            if(jsonResponse != ''){
                return true
            }
        }
        throw new Error("Request failed!")
    }
    catch(error) {
        console.log(error)
        return false
    }
}

/*
    Backend must add the account information to the account database, you have to generate a UID for each user and also check that this email doesn't already exist
    @parameters: 
        accountInfo - Json {email, password}
    @returns: 
        boolean: true if backend successfully added an account, false if the email is taken or an error ocurred
    
    priority: high (as of 10/4)
*/
function registerAccount(accountInfo) {

}

/*
    Frontend sends the backend a tweet to post
    @parameter: 
        tweet - Json {tweet_text} 
    @returns: 
        boolean: true if sucessful tweet, false otherwise
    priority: medium (as of 10/4)
*/
function postTweet(tweet) {}
// ^ function tweet(message)  <- use this 

/*
    Backend retrieves `num` amount of recent tweets from the account 
    @parameters: 
        twitterAccount: Json {email, password}
        num: number of tweets to be retrieved - int
    @returns: 
        Json {tweet1, tweet2, tweet3...}
    priority: low (as of 10/4)
*/
function retrieveTweets(twitterAccount, num) {}
// ^ 


module.export = {
    checkValidAccount,
    registerAccount,
    postTweet,
    retrieveTweets
}