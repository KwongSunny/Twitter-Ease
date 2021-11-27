
require('dotenv').config()
const CronJob = require('cron').CronJob
const twit = require('./twitter')
const database = require('../schedules')
const schedule = require('node-schedule')
const { v4: uuidv4 } = require('uuid');

// ----------------retrieve all the posts youve made 
 const timeline = (req,res) => {
    twit.twitterAPI.get('statuses/home_timeline',function(err,data,response) {// gets the tweets of the timeline
    console.log(data); 
    res.send(data)
    })
}

// ----------------posts a tweet 

 const tweet = (req,res) => { 
        twit.twitterAPI.post('statuses/update', {status:req.body}, (err,data,response) =>{
            console.log(req.body)
            res.send(data)
        }) 
    }

// ----------------interval tweeting 

// currently not needed
function intervalTweet(message){

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

function like(res, req, resultType, count)
{
    let params={
        q:req.query.q,
        result_type:resultType,
        count:count // how many posts to retweet 
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


function likeNretweet(req,res, resultType=recent)

{
    let params={
        q:req.params.q, 
        result_type:resultType,
        //count:count // how many posts to retweet 
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

function retweet(req,res,resultType=recent) 
{
    let params={
        q:req.query.q,
        //q:req.query,
        result_type:resultType
        
        //count:count// how many posts to retweet 
    }
    console.log(params)
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
                                console.log('Post retweeted with retweetID - ' + retweetId)
                            if (err)
                                console.log('Already RETWEETED...')
                        })
                    }
                }
            res.send(data)
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
/*
 function tweeting(txt){// same thing as tweet() but this takes a param
    twit.twitterAPI.post('statuses/update', {status:txt },function(err,data,response) {
        console.log(data)
    })
}
*/
/*
// ---------------- setting up a user stream 
var stream = twit.twitterAPI.stream('user');
stream.on ('follow', followed);  
*/

// ---------------- anyone who followed, this will happen 
/*
function followed(eventMsg) {
    const name = eventMsg.source.name;
    const screenName = eventMsg. source.screen_name; 
    tweeting('@' + screenName + 'Thanks for following me')
}
*/

// ---------------- scheduling tweets 
/*
function scheduleTweet(req, res, minute="*", hour="*", dayOfMonth="*", month="*", dayOfWeek="*"){ 
   const job = new CronJob("*" + " " + minute + " " + hour +  " " + dayOfMonth + " " + month + " " + dayOfWeek, function(){
      twit.twitterAPI.post('statuses/update', {status: req.body}, function(err,data,response) {
           console.log(data);
           if(err) {
               console.log(err)
           }
           //res.send(data);
           database.schedule.push({
               id: uuidv4(),
               name: data.user.name,
               text: req.body,
               day: dayOfMonth,
               time: hour + ":" + minute,
               active: active,
               repeating: repeat,
               twitterHandle: data.user.twitterHandle
           })
       })
       res.send(data);
       if(repeat != true) {
           job.stop()
       } 
   })
   job.start();
}
*/
// express only takes 3 pamraeters

function scheduleTweet(req,res){
    console.log('started')
    const {second,minute,hour,dayOfmonth,month,dayOfweek,message} = req.body
    const date = `${second} ${minute} ${hour} ${dayOfmonth} ${month} ${dayOfweek}`
    console.log(date)
    console.log(message)
    // based on a precise time not every second, every minute etc
    const job = schedule.scheduleJob(date, function(){
       twit.twitterAPI.post('statuses/update', {status: message},function(err,data,response) {
            console.log(data); 
            //res.send(data)
            //console.log(data['user'].name)
            //console.log(test)
            database.schedule.push({
                id: uuidv4(),
                name: data['user'].name,
                text: req.body,
                month: month,
                day: dayOfmonth,
                dayOfweek:dayOfweek,
                time: hour + ":" + minute,
                twitterHandle: data['user'].screen_name
            })
        })  
            if(repeat = false) {
                job.cancel() // stop the repetition of the jobj
            }
    })
}


 // function to retreive schedule from file database
function getSchedule(req,res) {
    
}


module.exports = {
    timeline,
    tweet,
    deleteTweet,
    intervalTweet,
    like,
    unlike1,
    unlike2,
    likeNretweet,
    retweet,
    unretweet,
    scheduleTweet
}


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



