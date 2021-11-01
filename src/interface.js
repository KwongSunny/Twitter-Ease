import axios from 'axios'
import Twit from 'twit';
/*
Functions that interface between front and back end
*/
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
    let email_part = accountInfo.email;
    let password_part = accountInfo.password;    try {
        const response = axios.get(`http://twitter-ease-api.herokuapp.com/validate/${email_part}/${password_part}`)
        if(response.status == 200) {
            return true
        }
        throw new Error("Request failed!")
    }
    catch(error) {
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
    let email_part = accountInfo.email;
    let password_part = accountInfo.password;
    let id_part = accountInfo.id;

    try {
        const response = axios.post(`http://twitter-ease-api.herokuapp.com/accounts`,{
            email:email_part,
            password:password_part,
            id:id_part
        })
        if(response.status == 200) {
            return true
        }
        throw new Error("Request failed!")
    }
    catch(error) {
        return false
    }
}

/*
    Frontend sends the backend a tweet to post
    @parameter: 
        tweet - Json {tweet_text} 
    @returns: 
        boolean: true if sucessful tweet, false otherwise
    priority: medium (as of 10/4)
*/

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
function retrieveTweets(twitterAccount, num) {
    
}
// ^ 


export default {
    checkValidAccount,
    registerAccount,
    retrieveTweets
}