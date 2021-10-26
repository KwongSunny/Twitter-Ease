require("dotenv").config();
const twit = require('./twitter');
const schedule = require('node-schedule');// so we an use the schedule fcn


function scheduleTweet(){
   console.log('The bot is starting')


   const job = schedule.scheduleJob({hour: 17, minute: 6}, function(){
      twit.twitterAPI.post('statuses/update', {status:'testing123' },function(err,data,response) {
           console.log(data); 
       })
      job.cancel(); // stop the repetition of the job 
   });
}

scheduleTweet();

// time = military time 
// https://www.npmjs.com/package/node-schedule 



