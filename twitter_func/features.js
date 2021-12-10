
require('dotenv').config()
const twit = require('twit');
const oauth_between = require('../oauth_between');
const database = require('../schedules')
const schedule = require('node-schedule')

// ----------------retrieve all the posts youve made 
 const timeline = (req,res) => {
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('statuses/home_timeline',function(err,data,response) {// gets the tweets of the timeline
    console.log(data); 
    res.send(data)
    })
}

// ----------------posts a tweet 

 const tweet = (req,res) => { 
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
        twitterAPI.post('statuses/update', {status:req.body}, (err,data,response) =>{
            console.log(req.body)
            res.send(data)
        }) 
    }

// ----------------interval tweeting 

// currently not needed
function intervalTweet(req,res){
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });

    var r = Math.floor(Math.random()*100); 

    twitterAPI.post('statuses/update', {status:req.body + r },function(err,data,response) {
        console.log(data)
    })
}

// ----------------deletes all the tweets on your timeline
 function deleteTweet(){
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('statuses/home_timeline',function(err,data,response) // gets the tweets of the timeline
    {   
        // console.log(data);
        let tweets=data
        if (!err)
        {
            for (let dat of tweets)
            {
                let deleteId = dat.id_str; 
                twitterAPI.post('statuses/destroy/:id', {id: deleteId}, (err, response)=>
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

// ----------------searches for a specific tag to mass like 

function like(res, req, resultType, count)
{
    let params={
        q:req.query.q,
        result_type:resultType,
        count:count // how many posts to retweet 
    }

    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let likeId = dat.id_str;
                        twitterAPI.post('favorites/create', {id: likeId}, (err, response)=>
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
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('statuses/home_timeline',function(err,data,response) // gets the tweets of the timeline
    {   
        // console.log(data);
        let tweets=data
        if (!err)
        {
            for (let dat of tweets)
            {
                let unlikeID = dat.id_str; 
                twitterAPI.post('favorites/destroy', {id: unlikeID}, (err, response)=>
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
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('favorites/list',function(err,data,response) // gets the tweets of the timeline
    {   
        // console.log(data);
        let tweets=data
        if (!err)
        {
            for (let dat of tweets)
            {
                let unlikeID = dat.id_str; 
                twitterAPI.post('favorites/destroy', {id: unlikeID}, (err, response)=>
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
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    let params={
        q:req.query.qq, 
        result_type:resultType,
        //count:count // how many posts to retweet 
    }
    twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let tweetID = dat.id_str;
                        twitterAPI.post('statuses/retweet/:id', {id: tweetID}, (err, response)=>
                        twitterAPI.post('favorites/create', {id: tweetID}, (err, response)=>
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
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    let params={
        q:req.query.q,
        //q:req.query,
        result_type:resultType
        
        //count:count// how many posts to retweet 
    }
    console.log(params)
    twitterAPI.get('search/tweets', params,(err,data,response)=>
        {
            let tweets=data.statuses
            if(!err)
                {
                    for(let dat of tweets)
                    {
                        let retweetId = dat.id_str;
                        twitterAPI.post('statuses/retweet/:id', {id: retweetId}, (err, response)=>
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
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.get('statuses/home_timeline',function(err,data,response) // gets the tweets of the timeline
    {   
        // console.log(data);
        let tweets=data
        if (!err)
        {
            for (let dat of tweets)
            {
                let deleteId = dat.id_str; 
                twitterAPI.post('statuses/unretweet/:id', {id: deleteId}, (err, response)=>
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

// function to like singular tweets by id
function singular_like(req,res)
{
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.post('favorites/create', {id: req.body}, function(err,data,response) {
        // console.log(err)
        console.log(data)
        // console.log(response)
    })   
}

// function to unlike tweets by id
function unlike(req,res){   
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.post('favorites/destroy', {id: req.body}, function(err,data,response) {
        console.log(data)
    })
}

// retweet tweets by id
function singular_retweet(req,res){
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.post('statuses/retweet/:id', {id: req.body}, function(err,data,response) {
        console.log(data)
    })
}

// unretweet tweets by id   
function singular_unretweet(id){
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    twitterAPI.post('statuses/unretweet/:id', {id: id}, function(err,data,response) {
        console.log(data)
    })
}

// express only takes 3 pamraeters

function scheduleTweet(req,res){
    const twitterAPI = new twit({
        consumer_key : process.env.api_key,
        consumer_secret : process.env.api_secret,
        access_token : oauth_between.getAccessTokens()[0],
        access_token_secret : oauth_between.getAccessTokens()[1]
    });
    console.log('started')
    const {id,second,minute,hour,dayOfmonth='*',month='*',dayOfweek='*',message,name,active=true,repeat=false,twitterHandle} = req.body
    const date = `${second} ${minute} ${hour} ${dayOfmonth} ${month} ${dayOfweek}`
    console.log(date)
    console.log(message)
    // based on a precise time not every second, every minute etc
    if(active == true) {
        database.schedule.push({
            id: id,
            name: name,
            message: message,
            month: month,
            dayOfmonth: dayOfmonth,
            dayOfweek:dayOfweek,
            time: hour + ":" + minute + ":" + second,
            active:active,
            repeat:repeat,
            twitterHandle: twitterHandle
        })
    const job = schedule.scheduleJob(date, function(){
       twitterAPI.post('statuses/update', {status: req.body.message},function(err,data,response) {
            console.log(data); 
        })  
        if(repeat == false) {
            job.cancel() // stop the repetition of the job
            res.sendStatus(200)
        }
    })
}
}


// returns all schedules from the database
function all_schedules(req,res,next) {
    res.send(database.schedule.slice(0))
}

// updates tweeets
function updateTweet(req,res,next) {
    const {id} = req.params
    console.log(id)
    const {second,minute,hour,dayOfmonth,month,dayOfweek,message,name,active=true,repeat} = req.body
    const date = `${second} ${minute} ${hour} ${dayOfmonth} ${month} ${dayOfweek}`
    console.log(message)
    console.log(second)
    // filters schedule by id
    const filter_id = database.schedule.filter(schedules=>schedules.id == id)[0]    // returns the whole schdule with that id
    if (second !== undefined) { 
        filter_id['message'] = message
    }
    if (month !== undefined) {
        filter_id['month'] = month
    }
    if (dayOfmonth !== undefined) {
        filter_id['dayOfmonth'] = dayOfmonth
    }
    if (dayOfweek !== undefined || '') {
        filter_id['dayOfweek'] = dayOfweek
    }
    if (hour !== undefined && minute !== undefined && second !== undefined) {
        filter_id['time'] = hour + ":" + minute + ":" + second
    }
    if (name !== undefined || '') {
        filter_id['name'] = name
    }
    if (active !== undefined || '') {
        filter_id['active'] = active
    }
    if (repeat !== undefined || '') {
        filter_id['repeat'] = repeat
    }
    if(active == false) {
        delete_schedule(id)
        res.sendStatus(204)
    }
    else {
    const job = schedule.scheduleJob(date, function(){
        twitterAPI.post('statuses/update', {status: req.body.message},function(err,data,response) {
             console.log(data); 
         })  
         if(repeat == false) {
             job.cancel() // stop the repetition of the job
            }
     })
    }
    res.sendStatus(201)
}

function delete_schedule(req,res,next) {
    const {id} = req.params 
    const schedule = database.schedule.filter(schedules=>schedules.id == id)[0]  
    const find = database.schedule.indexOf(schedule)
    if(find !== -1) {
        console.log(find)
        database.schedule.splice(find,1)
        res.sendStatus(204)
    }    
    else {
        res.status(404).send('404 ERROR')
    }
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
    all_schedules,
    scheduleTweet,
    updateTweet,
    singular_like,
    unlike,
    singular_retweet,
    singular_unretweet,
    delete_schedule
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



