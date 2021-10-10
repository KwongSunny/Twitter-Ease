require("dotenv").config();
const twit = require('./twitter');

// just test
twit.twitterAPI.post('statuses/update', {status:'hello world!'  },function(erro,data,res) {
    console.log(data)
})  