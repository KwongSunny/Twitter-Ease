require("dotenv").config();
const twit = require('./twitter');

<<<<<<< HEAD
// just test
//twit.twitterAPI.post('statuses/update', {status:'hello world!'  },function(err,data,response) {
//    console.log(data)
//})



function timedtweet() {

    var num = Math.floor(Math.random() * 100); //displays number @ end
    twit.twitterAPI.post('statuses/update', {status: 'this is a timed tweet!' + num }, function(err,data,response) { 
        console.log(data)
    })

}

setInterval(timedtweet,1000*3)



=======

//-----------------SEND DIRECT MESSAGE

function sendDM(userID,message){


    let userName = {recipient_id:userID, message_data:message};

    twit.twitterAPI.post("direct_messages/events/new", userName, (err, data) => {
        if(err){
            console.log("Error sending DM"); 
            return; 
        }
        if (data){
            console.log("DM sent"); 
        }


    }

sendDM(christy_o_o, "hi"); 
>>>>>>> e32266e34e2c85410eb6d8554f75d5d0e95b752b
