require("dotenv").config();
const twit = require('./twitter');

function tweeting(txt){
    twit.twitterAPI.post('statuses/update', {status:txt },function(err,data,response) {
        console.log(data)
    })
}

// setting up a user stream 
var stream = twit.twitterAPI.stream('user');
stream.on ('follow', followed);  


// anyone who followed, this will happen 
function followed(eventMsg) {
    var name = eventMsg.source.name;
    var screenName = eventMsg. source.screen_name; 
    tweeting('@' + screenName + 'Thanks for following me')
}


followed(); 


