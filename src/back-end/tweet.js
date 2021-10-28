import pkg from 'dotenv';
const twit = require('./twitter');
const prompt = require('prompt-sync')({sigint: true});

// Tweet fcn that takes in a parm: message = the the message you are trying to call 

function tweet(){ 
    let message = prompt('Enter tweet to post: ')
    twit.twitterAPI.post('statuses/update', {status:message },function(err,data,response) {
        console.log(data)
    })
}



