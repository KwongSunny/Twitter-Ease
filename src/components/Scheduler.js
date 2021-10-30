import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';

function Scheduler(props){
    const twitterAccounts = props.twitterAccounts;
    const scheduledTweetsList = props.scheduledTweets;
    const setScheduledTweeets = props.setScheduledTweeets;
    const [currentSchedule, setCurrentSchedule] = React.useState('');
    const [addingSchedule, setAddingSchedule] = React.useState(false);

    return(
        <div className = {styles.SchedulerPage}>
            <div className = {styles.ScheduleList}>
                {//if there are scheduled tweets, show them
                    scheduledTweetsList.length > 0 && <div>
                        {
                            scheduledTweetsList.map((schedule) => {
                                return(
                                    <div className = {styles.ScheduleListItem} onClick = {() => {setCurrentSchedule(schedule.name); setAddingSchedule(false)}}>
                                        Schedule a
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
                        <div><p></p></div>
                        <div>
                            <div className = {styles.ScheduleDates}>
                                <div>
                                    Please give your Schedule a name <br/>
                                    <textarea className = {styles.scheduleNameInput}/><br/>
                                    What would you like this scheduler to tweet? <br/>
                                    <textarea className = {styles.scheduleTextInput}/><br/>
                                    What days do you want this scheduler to run on?<br/>
                                    <form>
                                        <input type = 'checkbox'/><span>Mon</span>
                                        <input type = 'checkbox'/><span>Tue</span>
                                        <input type = 'checkbox'/><span>Wed</span>
                                        <input type = 'checkbox'/><span>Thur</span>
                                        <input type = 'checkbox'/><span>Fri</span>
                                        <input type = 'checkbox'/><span>Sat</span>
                                        <input type = 'checkbox'/><span>Sun</span>
                                    </form><br/>
                                
                                    What time do you want the scheduler to post?
                                    <input type = 'time'/><br/>
                                     <div>Apply</div>
                                 </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>

                }
                {//if currentAccount does not exist, then show a UI to add an account
                    addingSchedule && <div className = {styles.AddingSchedule}>
                        <div>
                            <div className = {styles.ScheduleDates}>
                                <div>
                                    Please give your Schedule a name <br/>
                                    <textarea className = {styles.scheduleNameInput}/><br/>
                                    What would you like this scheduler to tweet? <br/>
                                    <textarea className = {styles.scheduleTextInput}/><br/>
                                    What days do you want this scheduler to run on?<br/>
                                    <form>
                                        <input type = 'checkbox'/><span>Mon</span>
                                        <input type = 'checkbox'/><span>Tue</span>
                                        <input type = 'checkbox'/><span>Wed</span>
                                        <input type = 'checkbox'/><span>Thur</span>
                                        <input type = 'checkbox'/><span>Fri</span>
                                        <input type = 'checkbox'/><span>Sat</span>
                                        <input type = 'checkbox'/><span>Sun</span>
                                    </form><br/>
                                
                                    What time do you want the scheduler to post?<br/>
                                    <input type = 'time'/><br/>
                                     <div>Apply</div>
                                 </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Scheduler;