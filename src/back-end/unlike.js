require("dotenv").config();
const twit = require('./twitter');


console.log('bot is starting'); 

twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) // gets the tweets of the timeline
{   
    // console.log(data);
    let tweets=data
    if (!err)
    {
        for (let dat of tweets)
        {
            let unlikeID = dat.id_str; 
            twit.twitterAPI.post('favorites/destroy', {id: unlikeID}, (err, response)=>
            {
                if (response)
                    console.log('Post unliked!!! with retweetID - ' + unlikeID)
                if (err)
                    console.log('Already unliked...')

            })
        }
    }
})