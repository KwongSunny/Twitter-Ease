require("dotenv").config();
const twit = require('./twitter');

// ----------------retrieve all the posts youve made 
function timeline(){
    twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) {// gets the tweets of the timeline
    console.log(data); 
    })
}

// ----------------posts a tweet 
function tweet(){ 
    var message = 'Testing123';
    twit.twitterAPI.post('statuses/update', {status:message },function(err,data,response) {
        console.log(data)
    })
}


// ----------------interval tweeting 
function intervalTweet(){

    let message = 'test123';

    var r = Math.floor(Math.random()*100); 

    twit.twitterAPI.post('statuses/update', {status:message + r },function(err,data,response) {
        console.log(data)
    })
}

// ----------------deletes all the tweets on your timeline
function deleteTweet(){
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
}

// ----------------searches for a specific tag to like 
function like()
{
    let params={
        q:'#cat min_retweets:20 lang:en', 
        result_type:'recent',
        count:2 // how many posts to retweet 
    }
    twit.twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let likeId = dat.id_str;
                        twit.twitterAPI.post('favorites/create', {id: likeId}, (err, response)=>
                        {
                            if (response)
                                console.log('Post liked!!! with likeId - ' + likeId)
                            if (err)
                                console.log('Already LIKED...')
                        })
                    }
                }
            })
}


// ----------------unlikes all (works when theres are posts that are retweeted) 

function unlike1 (){
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

}



// ----------------unlike all (unlike posts that are just liked) 


function unlike2(){
    twit.twitterAPI.get('favorites/list',function(err,data,response) // gets the tweets of the timeline
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
}

// ----------------likes & retweets at the same time given a keyword


function likeNretweet()
{
    let params={
        q:'#cats min_retweets:20 lang:en', 
        result_type:'recent',
        count:2 // how many posts to retweet 
    }
    twit.twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let tweetID = dat.id_str;
                        twit.twitterAPI.post('statuses/retweet/:id', {id: tweetID}, (err, response)=>
                        twit.twitterAPI.post('favorites/create', {id: tweetID}, (err, response)=>
                        {
                            if (response)
                                console.log('Post liked & retweeted!!! with likeId/tweetID - ' + tweetID)
                            if (err)
                                console.log('Already LIKED & RETWEETED...')
                        }))
                    }
                }
            })


}
// ----------------retweets posts given a key word

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

// ----------------unretweet everything
function unretweet(){

    twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) // gets the tweets of the timeline
    {   
        // console.log(data);
        let tweets=data
        if (!err)
        {
            for (let dat of tweets)
            {
                let deleteId = dat.id_str; 
                twit.twitterAPI.post('statuses/unretweet/:id', {id: deleteId}, (err, response)=>
                {
                    if (response)
                        console.log('Post untweeted!!! with retweetID - ' + deleteId)
                    if (err)
                        console.log('Already untweeted...')

                })
            }
        }
    })

}


// ---------------- when someone follows you, you tweet and @ them 

function tweeting(txt){// same thing as tweet() but this takes a param
    twit.twitterAPI.post('statuses/update', {status:txt },function(err,data,response) {
        console.log(data)
    })
}

// ---------------- setting up a user stream 
var stream = twit.twitterAPI.stream('user');
stream.on ('follow', followed);  


// ---------------- anyone who followed, this will happen 
function followed(eventMsg) {
    var name = eventMsg.source.name;
    var screenName = eventMsg. source.screen_name; 
    tweeting('@' + screenName + 'Thanks for following me')
}


// ---------------- scheduling tweets 
function scheduleTweet(){
   console.log('The bot is starting')


   const job = schedule.scheduleJob({hour: 17, minute: 6}, function(){
      twit.twitterAPI.post('statuses/update', {status:'testing123' },function(err,data,response) {
           console.log(data); 
       })
      job.cancel(); // stop the repetition of the job 
   });
}









console.log('bot is starting'); 
// timeline(); 

// tweet(); 

// deleteTweet();

// intervalTweet();  // calling the tweeting fcn 
// setInterval(intervalTweet,1000*5)//tweet every 5 seconds

// like(); 


// unlike1(); //unlikes all (works when theres are posts that are retweeted) 

// unlike2(); //unlike all (unlike posts that are just liked) 

// likeNretweet(); 

// retweet(); 

// unretweet(); 

// followed(); 

// scheduleTweet();



