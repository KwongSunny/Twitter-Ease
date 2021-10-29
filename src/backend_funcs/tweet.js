require("dotenv").config();
const twit = require('./twitter');

// Tweet fcn that takes in a parm: message = the the message you are trying to call 

function tweet(){ 

    var message = 'Testing123';
    twit.twitterAPI.post('statuses/update', {status:message },function(err,data,response) {
        console.log(data)
    })
}


tweet(); 


