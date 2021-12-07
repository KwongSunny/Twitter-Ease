
import axios from 'axios'
import { CronJob, job } from 'cron';
import { param } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import { DatabaseError } from 'pg-protocol';
import { tupleExpression } from '@babel/types';


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
        if(response.status === 200) {
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
        if(response.status === 200) {
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


//////////////////////////////// -------------------------->  FUNCTIONS FOR FEATURES <------------------------------- /////////////////////////////////////////
const login = () => {
    (async () => { 
      try {
        //OAuth Step 1
        const response = await axios.get('/twitter/authorize')
        console.log(response)
        const oauth_token  = response.data.url
        console.log(oauth_token)
        window.location.assign(oauth_token)
      } catch (error) {
        console.error(error); 
      }
    })();
  }

// function to tweet
function tweeting(message) {
      axios({
        url:'http://localhost:5000/twitter/tweet',
        method:'POST',
        headers:{"Content-Type":"text/plain"},
        data: message
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    }

// function to logout
  const logout = () => {
    (async () => {
      try {
        await axios({
          url: `/twitter/logout`, 
          method: 'GET'
        });
      } catch (error) {
        console.error(error); 
      }
    })();
  }
  
// function to pull timeline
  const homePage = () => {
      axios({
          url:'http://localhost:5000/twitter/home',
          method:'GET',
      })
      .then((response) =>{
          console.log(response)
          return response;
      })
      .catch((error)=> {
          console.log(error);
      })
  }


  const retweet = (query) => {
      axios({
          url:`http://localhost:5000/twitter/search/retweet`,
          method:'GET',
          params: {
              q:query
          }
      })
      .then((response)=> {
          console.log(response)
      })
      .catch((error) => {
          console.log(error);
      })
  }

  // attempts to delete everything from timeline
  const mass_deletion = () => {
      axios({
          url:'http://localhost:5000/twitter/home/purge',
          method:'GET'
      })
      .then((response) => {
          console.log(response)
      })
      .catch((error)=>{
          console.log(error)
      })
  }

  // UNLIKES RETWEETS ONLY!!! UNLIKES ALL RETWEETS ON YOUR TIMELINE
  const unlike_retweeted_all = () => {
    axios({
        url:'http://localhost:5000/twitter/home/unlike1',
        method:'GET',
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
}

// JUST UNLIKES EVERYTHING ON YOUR TIMELINE
const unlike_all = () => {
    axios({
        url:'http://localhost:5000/twitter/home/unlike2',
        method:'GET',
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
}

// like and retweets all that match the given query keyword
const like_n_retweet_all = (query) => {
    axios({
        url:'http://localhost:5000/twitter/like-n-retweet',
        method:'GET',
        params: {
          q:query
      }
    })
    .then((response)=> {
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
    })
}

// unlikes everything given a query keyword
const mass_like = (query) => {
    axios({
        url:'http://localhost:5000/twitter/search/like',
        method:'GET',
        params: {
            q:query
        }
    })
    .then((response)=> {
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
    })
}

//unretweets everything on timeline
const unretweet = () => {
    axios({
        url:'http://localhost:5000/twitter/home/unretweet',
        method:'GET'
    })
    .then((response)=> {
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
    })
}


/*
const scheduled_tweets = (message, minute='*', hour='*', dayOfMonth='*', month='*', dayOfWeek='*', repeat=true) => {
    let job = new CronJob(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}` ,function() {
        console.log(message)
        axios({
            url:'http://localhost:5000/twitter/tweet',
            method:'POST',
            headers:{"Content-Type":"text/plain"},
            data: message
            })
            .then(response => {
            console.log(response.data)
            schedule.push({
                id: uuidv4(),
                name: response.data['user']['name'].name,
                text: message,
                day: dayOfMonth,
                time: hour + ":" + minute,
                active: active,
                repeating: repeat,
                twitterHandle: response.data['user']['screen_name'].screen_name })
            })
            .catch(function (error) {
            console.log(error);
            })
            if(repeat != true) {
                job.stop()
            }
        })
        job.start()
    }
*/

function scheduled_tweets(id=uuidv4(),second,minute,hour,dayOfmonth,month,dayOfweek,message,name,active,repeat,twitterHandle) {
    const json_string = {
      id:id,
      second:second,
      minute:minute,
      hour:hour,
      dayOfmonth:dayOfmonth,
      month:month,
      dayOfweek:dayOfweek,
      message:message,
      name:name,
      active:active,
      repeat:repeat,
      twitterHandle:twitterHandle
    };
    axios({
      url:'http://localhost:5000/twitter/scheduler',
      method:'POST',
      headers:{"Content-Type":"application/json"},
      data: json_string
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  // returns all schedules
  function get_schedule() {
      axios({
          url:"http://localhost:5000/twitter/schedule_database",
          method:"GET"          
      })
      .then((response)=> {
        console.log(response)
      })
      .catch((error) => {
          console.log(error);
      })
    }

  // insert id and what parts you want to modify -> defaults to null if left empty
  function update_schedules(id,second,minute,hour,dayOfmonth,month,dayOfweek,message,name,active,repeat) {
    const json_string = {
      second:second,
      minute:minute,
      hour:hour,
      dayOfmonth:dayOfmonth,
      month:month,
      dayOfweek:dayOfweek,
      message:message,
      name:name,
      active:active,
      repeat:repeat,
    };
      axios({
        url:`http://localhost:5000/twitter/scheduler/${id}`,
        method:'PUT',
        headers:{"Content-Type":"application/json"},
        data: json_string
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })   
  } // end of function

  //update_schedules('1234', '00', '00', '00','1','Jan','mon','This is an example schedule.','Example Schedule',false,true)
  // likes a single tweet given the id
  const singleLike = (likeId) => {
    axios({
      url:'http://localhost:5000/twitter/search/singular-like', // change URL
      method:'POST',
      headers:{"Content-Type":"text/plain"},
      data: likeId
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // likes a single tweet given the id
const singleUnlike = (unlikeID) => {
    axios({
      url:'http://localhost:5000/twitter/search/singular-unlike', // change URL
      method:'POST',
      headers:{"Content-Type":"text/plain"},
      data: unlikeID
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // retweets a single tweet given the id
const singleRetweet = (retweetId) => {
    axios({
      url:'http://localhost:5000/twitter/search/singular-retweet', // change URL
      method:'POST',
      headers:{"Content-Type":"text/plain"},
      data: retweetId
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // unretweets a single retweet given the id
const singleUnretweet = (unretweetID) => {
    axios({
      url:'http://localhost:5000/twitter/search/singular-unretweet', // change URL
      method:'POST',
      headers:{"Content-Type":"text/plain"},
      data: unretweetID
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  // delete id -> which is a string
  const delete_schedule = (id) => {
    axios({
      url:`http://localhost:5000/twitter/delete_schedule/${id}`,
      method: 'DELETE',
      data: id
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }


    

export default {singleUnretweet,singleUnlike,singleRetweet,singleLike,login,tweeting,logout,homePage,retweet,mass_deletion,unlike_retweeted_all,like_n_retweet_all,mass_like,unlike_all,unretweet,scheduled_tweets,get_schedule,update_schedules,delete_schedule};
