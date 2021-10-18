require("dotenv").config();
const twit = require('./twitter');

// just test
twit.twitterAPI.post('statuses/update', {status:'hello world!'},function(err,data,response) {
    console.log(data)
})

