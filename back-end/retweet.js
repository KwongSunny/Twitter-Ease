require("dotenv").config();
const twit = require('./twitter');


console.log('bot is starting'); 

function retweet()
{
    let params={
        q:'#COVID19 min_retweets:20 lang:en', 
        result_type:'recent',
        count:10 // how many posts to retweet 
    }
    twit.twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let retweetId = dat.id_str;
                        twit.twitterAPI.post('statuses/retweet/:id', {id: retweetId}, (err, response)=>
                        {
                            if (response)
                                console.log('Post retweeted!!! with retweetID - ' + retweetId)
                            if (err)
                                console.log('Already RETWEETED...')
                        })
                    }
                }
            })


}
retweet(); 
setInterval(retweet,60000) 