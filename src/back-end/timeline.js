require("dotenv").config();
const twit = require('./twitter');


console.log('bot is starting'); 

twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) {// gets the tweets of the timeline
    console.log(data); 

})




