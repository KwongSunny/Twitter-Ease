require("dotenv").config();
const twit = require('./twitter');


console.log('bot is starting'); 

function timeline(){

    twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) {// gets the tweets of the timeline
    console.log(data); 

    })
}



timeline(); 


