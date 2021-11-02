
import axios from 'axios'

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
    let password_part = accountInfo.password;

    try {
        const response = await axios.get(`http://twitter-ease-api.herokuapp.com/validate/${email_part}/${password_part}`)
        if(response.status == 200) {
            return true
        }
        throw new Error("Request failed!")
    }
    catch(error) {
        return false
    }
}


//returns an array of jsons filled with twitter accounts bound to the twitter ease account
/*
    @parameters:
        accountInfo - Json {email, password}
    @returns:
        [{
            twitterHandle,
            twitterEmail,
            twitterPassword,
        },...]
        *Whatever you think we need, honesly you can just return every piece of information to make it easier
*/
function retrieveTwitterAccounts(accountInfo){


}

/*
    Backend must add the account information to the account database, you have to generate a UID for each user and also check that this email doesn't already exist
    @parameters: 
        accountInfo - Json {email, password}
    @returns: 
        boolean: true if backend successfully added an account, false if the email is taken or an error ocurred
    
    priority: high (as of 10/4)
*/
async function registerAccount(accountInfo) {
    let email_part = accountInfo.email;
    let password_part = accountInfo.password;
    let id_part = accountInfo.id

    try {
        const response = await axios.post(`http://twitter-ease-api.herokuapp.com/accounts`,{
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

// oauth login
async function login() {
      try {
        //OAuth Step 1
        const response = await axios({
          url: `${apiPath}/twitter/authorize'`, 
          method: 'POST'
        })
        const { oauth_token } = response.data;
        //Oauth Step 2
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    }
    catch (error) {
        console.error(error); 
    }
}

useEffect(() => {
    (async() => {
      
        const {oauth_token, oauth_verifier} = queryString.parse(window.location.search);  
        
        if (oauth_token && oauth_verifier) {
         try {
            //Oauth Step 3
            await axios({
              url: `${apiPath}/twitter/oauth/access_token`,  
              method: 'POST',
              data: {oauth_token, oauth_verifier}
            });
         } catch (error) {
          console.error(error); 
         }
        }
        
        try {
          //Authenticated Resource Access
          const {data: {name, profile_image_url_https, status, entities}} = await axios({
            url: `${apiPath}/twitter/users/profile_banner`,
            method: 'GET'
          });
          
          setIsLoggedIn(true);
          setName(name);
          setImageUrl(profile_image_url_https);
          setStatus(status.text);
          setUrl(entities.url.urls[0].expanded_url);
         } catch (error) {
          console.error(error); 
         }
        
      
    })();
  }, []);


