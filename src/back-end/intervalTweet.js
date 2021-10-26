require("dotenv").config();
const twit = require('./twitter');



function intervalTweet(){

    let message = 'test123';
    console.log('The bot is starting')

    var r = Math.floor(Math.random()*100); 

    twit.twitterAPI.post('statuses/update', {status:message + r },function(err,data,response) {
        console.log(data)
    })
}

intervalTweet();  // calling the tweeting fcn 
setInterval(intervalTweet,1000*5)//tweet every 5 seconds


