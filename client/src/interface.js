
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

//////////////////////////////// -------------------------->  FUNCTIONS FOR FEATURES <------------------------------- /////////////////////////////////////////
const login = () => {
    (async () => { 
      try {
        //OAuth Step 1
        const response = await axios.get('/twitter/authorize')
        console.log(response)
        const oauth_token  = response.data.url
        //console.log(oauth_token)
        //window.location.assign(oauth_token)
      } catch (error) {
        console.error(error); 
      }
    })();
  }

// function to tweet
function tweeting(message) {
      axios({
        url:'/twitter/tweet',
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
          url:'/twitter/home',
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
          url:`/twitter/search/retweet`,
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
          url:'/twitter/home/purge',
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
        url:'/twitter/home/unlike1',
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
        url:'/twitter/home/unlike2',
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
        url:'/twitter/like-n-retweet',
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
        url:'/twitter/search/like',
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
        url:'/twitter/home/unretweet',
        method:'GET'
    })
    .then((response)=> {
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
    })
}


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
      url:'/twitter/scheduler',
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
          url:"/twitter/schedule_database",
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
        url:`/twitter/scheduler/${id}`,
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
      url:'/twitter/search/singular-like', // change URL
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
      url:'/twitter/search/singular-unlike', // change URL
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
      url:'/twitter/search/singular-retweet', // change URL
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
      url:'/twitter/search/singular-unretweet', // change URL
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
      url:`/twitter/delete_schedule/${id}`,
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
