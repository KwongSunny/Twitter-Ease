
const twit = require('./twitter')
const CronJob = require('cron').CronJob
function scheduler(req,res,minute="*", hour="*", dayOfMonth="*", month="*", dayOfWeek="*"){ 
    const job = new CronJob("*" + " " + minute + " " + hour +  " " + dayOfMonth + " " + month + " " + dayOfWeek, function(){
        twit.twitterAPI.post('statuses/update', {status: req.body}, function(err,data,response) {
            console.log(data);
        })
    })
    job.start();
}


module.exports = {
    scheduler
}