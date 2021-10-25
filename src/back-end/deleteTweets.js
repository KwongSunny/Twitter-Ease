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
            let deleteId = dat.id_str; 
            twit.twitterAPI.post('statuses/destroy/:id', {id: deleteId}, (err, response)=>
            {
                if (response)
                    console.log('Post deleted!!! with retweetID - ' + deleteId)
                if (err)
                    console.log('Already DELETED...')
            })
        }
    }
})