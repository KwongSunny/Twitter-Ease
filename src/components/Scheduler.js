import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';

function Scheduler(props){
    const twitterAccounts = props.twitterAccounts;
    const scheduledTweetsList = props.scheduledTweets;
    const setScheduledTweets = props.setScheduledTweets;
    const [currentSchedule, setCurrentSchedule] = React.useState('');
    const [addingSchedule, setAddingSchedule] = React.useState(true);

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
                                return(
                                    <div className = {styles.ScheduleListItem} onClick = {() => {setCurrentSchedule(schedule.name); setAddingSchedule(false)}}>
                                        {schedule.name}
                                    </div>)
                            })
                        }
                        <div className = {styles.ScheduleListItem} onClick = {() => {setAddingSchedule(true)}}>[+] Add a Scheduled Tweet</div>
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
                    !addingSchedule && <div className = {styles.ScheduleInfo}>
                        Empty Schedule
                    </div>

                }
                {//if currentAccount does not exist, then show a UI to add an account
                    addingSchedule && <div className = {styles.AddingSchedule}>
                        Schedule Name<br/>
                        <textarea className = {styles.ScheduleNameInput}/><br/>
                        What would you like this scheduler to tweet? <br/>
                        <textarea className = {styles.ScheduleTextInput}/><br/>
                        What days do you want this scheduler to run on?<br/>
                        <form className = {styles.DotwButtons}>
                            <span className = {styles.DotwButton}>M</span>
                            <span className = {styles.DotwButton}>T</span>
                            <span className = {styles.DotwButton}>W</span>
                            <span className = {styles.DotwButton}>T</span>
                            <span className = {styles.DotwButton}>F</span>
                            <span className = {styles.DotwButton}>S</span>
                            <span className = {styles.DotwButton}>S</span>
                        </form>
                    
                        What time do you want the scheduler to post?<br/>
                        <div className = {styles.TimeDiv}>
                            <input type = 'time' value = '12:00'/><br/>
                        </div>

                        Select the Twitter Accounts you want this schedule to be added to:<br/>
                        <div className = {styles.TwitterAccountList}>
                            {
                                twitterAccounts.map((account) => {
                                    return(
                                        <div className = {styles.TwitterAccount}>
                                            {account.handle}
                                        </div>
                                    )
                                })
                            }
                        </div>


                        <div style = {{marginTop:'20px'}}><span className = {styles.AddScheduleButton}>Add</span></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Scheduler;