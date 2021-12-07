import _interface from './interface.js';
import axios from 'axios';

let schedules;

//_interface.scheduled_tweets('1', '00', '00', '12', '', '', 'wed,thu', 'hello', 'test', true, true, 'yes');

//_interface.update_schedules(1234, '0', '3', '12', '', '', 'tue,wed,thu', 'hello2', 'test2', true, true);

axios({
    url:"http://localhost:5000/twitter/schedule_database",
    method:"GET"          
})
.then((response)=> {
    //console.log(response)
    let arr = response.data;
    console.log(arr);
})
.catch((error) => {
    console.log(error);
})

