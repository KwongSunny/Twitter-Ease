require("dotenv").config();
const twit = require('./twitter');

// just test
//twit.twitterAPI.post('statuses/update', {status:'hello world!'  },function(err,data,response) {
//    console.log(data)
//})



function timedtweet() {

    var num = Math.floor(Math.random() * 100); //displays number @ end
    twit.twitterAPI.post('statuses/update', {status: 'this is a timed tweet!' + num }, function(err,data,response) { 
        console.log(data)
    })

}

setInterval(timedtweet,1000*3)



