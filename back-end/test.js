require("dotenv").config();
const twit = require('./twitter');


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