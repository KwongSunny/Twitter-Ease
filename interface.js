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
function checkValidAccount(accountInfo);

/*
    Backend must add the account information to the account database, you have to generate a UID for each user and also check that this email doesn't already exist
    @parameters: 
        accountInfo - Json {email, password}
    @returns: 
        boolean: true if backend successfully added an account, false if the email is taken or an error ocurred
    
    priority: high (as of 10/4)
*/
function registerAccount(accountInfo);

/*
    Frontend sends the backend a tweet to post
    @parameter: 
        tweet - Json {tweet_text} 
    @returns: 
        boolean: true if sucessful tweet, false otherwise

    priority: medium (as of 10/4)
*/
function postTweet(tweet);

/*
    Backend retrieves `num` amount of recent tweets from the account 
    @parameters: 
        twitterAccount: Json {email, password}
        num: number of tweets to be retrieved - int
    @returns: 
        Json {tweet1, tweet2, tweet3...}

    priority: low (as of 10/4)
*/
function retrieveTweets(twitterAccount, num);