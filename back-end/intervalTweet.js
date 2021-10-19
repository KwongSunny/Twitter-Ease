require("dotenv").config();
const twit = require('./twitter');


//--------------------- tweet every x second, minute, hr, etc  ---------------

console.log('The bot is starting')
function intervalTweet(){
    var r = Math.floor(Math.random()*100); 

    twit.twitterAPI.post('statuses/update', {status:message + r },function(err,data,response) {
        console.log(data)
    })
}
var message = 'Testing123';

intervalTweet(message);  // calling the tweeting fcn 
setInterval(intervalTweet,1000*5)//tweet every 5 seconds

