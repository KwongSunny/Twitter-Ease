import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';

function Scheduler(props){
    const twitterAccounts = props.twitterAccounts;
    const scheduledTweetsList = props.scheduledTweets;
    const setScheduledTweets = props.setScheduledTweets;
    const currentScheduleName = props.currentScheduleName;
    const setCurrentScheduleName = props.setCurrentScheduleName;
    const currentSchedule = currentScheduleName !== ''? scheduledTweetsList.find(schedule => schedule.name === currentScheduleName):
        {  
            name: '',
            text: '',
            day: '0000000',
            time: '12:00',
            accounts: []
        }
    /*
        Schedule{
            name: 'schedule1',
            text: 'hello world!',
            day: '0010001', (each digit represents a dotw, ex: 1 is wednesday and sunday)
            time: '23:59',
            accounts:
                [
                    'johndoe1', 'test1', 'twittereaseofficial'
                ] (list of twitter handles from the list of twitter accounts)
        }
    */

    return(
        <div className = {styles.SchedulerPage}>
            <div className = {styles.ScheduleList}>
                {//if there are scheduled tweets, show them
                    scheduledTweetsList.length > 0 && <div>
                        {
                            scheduledTweetsList.map((schedule) => {
                                if(currentScheduleName === schedule.name){
                                    return(
                                        <div style = {{backgroundColor: '#'}} className = {styles.ScheduleListItem} onClick = {() => {setCurrentScheduleName(schedule.name)}}>
                                            {schedule.name}
                                        </div>
                                    )
                                }
                                else{
                                    return(
                                        <div className = {styles.ScheduleListItem} onClick = {() => {setCurrentScheduleName(schedule.name)}}>
                                            {schedule.name}
                                        </div>)
                                }
                            })
                        }
                        <div className = {styles.ScheduleListItem} onClick = {() => {setCurrentScheduleName('')}}>[+] Add a Scheduled Tweet</div>
                    </div>
                }
                {//if there are no scheduled tweets
                    scheduledTweetsList.length === 0 && <div>
                        {
                            'Looks like you have no scheduled tweets.'
                        }
                    </div>
                }
            </div>
            <div>
                {//if the currentSchedule exists, reveal information about it
                    currentScheduleName !== ''  && <div className = {styles.AddingSchedule}>
                    <div style = {{margin: '10px 0px'}}>Schedule Name</div>
                    <textarea id = 'NewScheduleName' className = {styles.ScheduleNameInput} defaultValue = {currentSchedule.name} readOnly = {false}/><br/>
                    <div style = {{margin: '10px 0px'}}>What would you like this scheduler to tweet?</div>
                    <textarea id = 'NewScheduleText' className = {styles.ScheduleTextInput} defaultValue = {currentSchedule.text}/><br/>
                    <div style = {{marginTop: '10px'}}>What days do you want this scheduler to run on?</div>
                    <form className = {styles.DotwButtons}>
                        <span id = "Mon_Button" style = {(currentSchedule.day.substring(0,1) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Mon_Button");
                            if(currentSchedule.day.substring(0,1) === '0'){
                                currentSchedule.day = '1' + currentSchedule.day.substring(1);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = '0' + currentSchedule.day.substring(1);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>M</span>
                        <span id = "Tue_Button" style = {(currentSchedule.day.substring(1,2) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Tue_Button");
                            if(currentSchedule.day.substring(1,2) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 1) + '1' + currentSchedule.day.substring(2);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 1) + '0' + currentSchedule.day.substring(2);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>T</span>
                        <span id = "Wed_Button" style = {(currentSchedule.day.substring(2,3) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Wed_Button");
                            if(currentSchedule.day.substring(2,3) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 2) + '1' + currentSchedule.day.substring(3);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 2) + '0' + currentSchedule.day.substring(3);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>W</span>
                        <span id = "Thu_Button" style = {(currentSchedule.day.substring(3,4) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Thu_Button");
                            if(currentSchedule.day.substring(3,4) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 3) + '1' + currentSchedule.day.substring(4);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 3) + '0' + currentSchedule.day.substring(4);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>T</span>
                        <span id = "Fri_Button" style = {(currentSchedule.day.substring(4,5) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Fri_Button");
                            if(currentSchedule.day.substring(4,5) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 4) + '1' + currentSchedule.day.substring(5);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 4) + '0' + currentSchedule.day.substring(5);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>F</span>
                        <span id = "Sat_Button" style = {(currentSchedule.day.substring(5,6) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Sat_Button");
                            if(currentSchedule.day.substring(5,6) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 5) + '1' + currentSchedule.day.substring(6);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 5) + '0' + currentSchedule.day.substring(6);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>S</span>
                        <span id = "Sun_Button" style = {(currentSchedule.day.substring(6,7) === '1')?{backgroundColor: '#1DA1F2'}:{backgroundColor:'unset'}} className = {styles.DotwButton} onClick = {() => {
                            let button = document.getElementById("Sun_Button");
                            if(currentSchedule.day.substring(6,7) === '0'){
                                currentSchedule.day = currentSchedule.day.substring(0, 6) + '1' + currentSchedule.day.substring(7);
                                button.style.backgroundColor = '#1DA1F2';
                                button.style.color = 'white';
                            }
                            else{
                                currentSchedule.day = currentSchedule.day.substring(0, 6) + '0' + currentSchedule.day.substring(7);
                                button.style.backgroundColor = 'transparent';
                                button.style.color = 'lightgray';
                            }
                            console.log(currentSchedule);
                        }
                        }>S</span>
                    </form>
                
                    What time do you want the scheduler to post?<br/>
                    <div className = {styles.TimeDiv}>
                        <input id = 'NewScheduleTime' type = 'time'/><br/>
                    </div>

                    <div style = {{margin: '10px 0px'}}>Applicable Twitter Accounts</div>
                    <div className = {styles.TwitterAccountList}>
                        {
                            twitterAccounts.map((account) => {
                                return(
                                    <div id = {account.handle + 'ListItem'} className = {styles.TwitterAccountListItem} onClick = {() => {
                                        //adds the current account to list of accounts tied to the current schedule
                                        let index = currentSchedule.accounts.indexOf(account.handle);
                                        if(index === -1)
                                            currentSchedule.accounts.push(account.handle);
                                        else
                                            currentSchedule.accounts.splice(index, 1);
                                        //change the color, MUST COME AFTER THE PREVIOUS segment
                                        let element = document.getElementById(account.handle + 'ListItem');
                                        if(currentSchedule.accounts.find(accountHandle => accountHandle === account.handle)){
                                            element.style.backgroundColor = '#35404B';
                                            element.style.color = 'white';
                                        }
                                        else{
                                            element.style.backgroundColor = 'unset';
                                            element.style.color = 'lightgray';
                                        }
                                    }}>
                                        {account.handle}
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div style = {{marginTop:'20px'}}><span className = {styles.AddScheduleButton} onClick = {() => {
                        currentSchedule.name = document.getElementById('NewScheduleName').value;
                        currentSchedule.text = document.getElementById('NewScheduleText').value;
                        currentSchedule.time = document.getElementById('NewScheduleTime').value;

                        //check if empty slots
                        //checkEmptySchedule()

                        let newList = scheduledTweetsList;
                        newList.push(currentSchedule);
                        setScheduledTweets(newList);
                        console.log(scheduledTweetsList);
                    }}
                    >Apply</span></div>
                </div>

                }
                {//if currentAccount does not exist, then show a UI to add an account
                    currentScheduleName === ''  && <div className = {styles.AddingSchedule}>
                        <div style = {{margin: '10px 0px'}}>Schedule Name</div>
                        <textarea id = 'NewScheduleName' className = {styles.ScheduleNameInput}/><br/>
                        <div style = {{margin: '10px 0px'}}>What would you like this scheduler to tweet?</div>
                        <textarea id = 'NewScheduleText' className = {styles.ScheduleTextInput}/><br/>
                        <div style = {{marginTop: '10px'}}>What days do you want this scheduler to run on?</div>
                        <form className = {styles.DotwButtons}>
                            <span id = "Mon_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Mon_Button");
                                if(currentSchedule.day.substring(0,1) === '0'){
                                    currentSchedule.day = '1' + currentSchedule.day.substring(1);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = '0' + currentSchedule.day.substring(1);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>M</span>
                            <span id = "Tue_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Tue_Button");
                                if(currentSchedule.day.substring(1,2) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 1) + '1' + currentSchedule.day.substring(2);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 1) + '0' + currentSchedule.day.substring(2);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>T</span>
                            <span id = "Wed_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Wed_Button");
                                if(currentSchedule.day.substring(2,3) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 2) + '1' + currentSchedule.day.substring(3);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 2) + '0' + currentSchedule.day.substring(3);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>W</span>
                            <span id = "Thu_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Thu_Button");
                                if(currentSchedule.day.substring(3,4) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 3) + '1' + currentSchedule.day.substring(4);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 3) + '0' + currentSchedule.day.substring(4);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>T</span>
                            <span id = "Fri_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Fri_Button");
                                if(currentSchedule.day.substring(4,5) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 4) + '1' + currentSchedule.day.substring(5);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 4) + '0' + currentSchedule.day.substring(5);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>F</span>
                            <span id = "Sat_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Sat_Button");
                                if(currentSchedule.day.substring(5,6) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 5) + '1' + currentSchedule.day.substring(6);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 5) + '0' + currentSchedule.day.substring(6);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>S</span>
                            <span id = "Sun_Button" className = {styles.DotwButton} onClick = {() => {
                                let button = document.getElementById("Sun_Button");
                                if(currentSchedule.day.substring(6,7) === '0'){
                                    currentSchedule.day = currentSchedule.day.substring(0, 6) + '1' + currentSchedule.day.substring(7);
                                    button.style.backgroundColor = '#1DA1F2';
                                    button.style.color = 'white';
                                }
                                else{
                                    currentSchedule.day = currentSchedule.day.substring(0, 6) + '0' + currentSchedule.day.substring(7);
                                    button.style.backgroundColor = 'transparent';
                                    button.style.color = 'lightgray';
                                }
                                console.log(currentSchedule);
                            }
                            }>S</span>
                        </form>
                    
                        What time do you want the scheduler to post?<br/>
                        <div className = {styles.TimeDiv}>
                            <input id = 'NewScheduleTime' type = 'time'/><br/>
                        </div>

                        <div style = {{margin: '10px 0px'}}>Applicable Twitter Accounts</div>
                        <div className = {styles.TwitterAccountList}>
                            {
                                twitterAccounts.map((account) => {
                                    return(
                                        <div id = {account.handle + 'ListItem'} className = {styles.TwitterAccountListItem} onClick = {() => {
                                            //adds the current account to list of accounts tied to the current schedule
                                            let index = currentSchedule.accounts.indexOf(account.handle);
                                            if(index === -1)
                                                currentSchedule.accounts.push(account.handle);
                                            else
                                                currentSchedule.accounts.splice(index, 1);
                                            //change the color, MUST COME AFTER THE PREVIOUS segment
                                            let element = document.getElementById(account.handle + 'ListItem');
                                            if(currentSchedule.accounts.find(accountHandle => accountHandle === account.handle)){
                                                element.style.backgroundColor = '#35404B';
                                                element.style.color = 'white';
                                            }
                                            else{
                                                element.style.backgroundColor = 'unset';
                                                element.style.color = 'lightgray';
                                            }
                                        }}>
                                            {account.handle}
                                        </div>
                                    )
                                })
                            }
                        </div>


                        <div style = {{marginTop:'20px'}}><span className = {styles.AddScheduleButton} onClick = {() => {
                            currentSchedule.name = document.getElementById('NewScheduleName').value;
                            currentSchedule.text = document.getElementById('NewScheduleText').value;
                            currentSchedule.time = document.getElementById('NewScheduleTime').value;

                            //check if empty slots
                            //checkEmptySchedule()

                            let newList = scheduledTweetsList;
                            newList.push(currentSchedule);
                            setScheduledTweets(newList);
                            console.log(scheduledTweetsList);
                        }}
                        >Add</span></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Scheduler;