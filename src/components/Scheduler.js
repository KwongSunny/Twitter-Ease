import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';
import interfaceUtils from '../interface';

function Scheduler(props){
    const tweetSchedules = props.schedules.tweetSchedules;
    const setTweetSchedules = props.schedules.setTweetSchedules;

    const [currentSchedule, setCurrentSchedule] = React.useState(tweetSchedules[0]?tweetSchedules[0]:undefined);

    return(
        <div className = {styles.SchedulerTab}>
            <span id = "scheduleNameInput" className = {styles.ScheduleNamebar} contentEditable = "false">{currentSchedule.name}</span>
            <span onClick = {() => {
                let element = document.getElementById("scheduleNameInput");
                console.log(element.contentEditable);
                element.contentEditable === "true"?(element.contentEditable = "false"):(element.contentEditable = "true");
            }}>Change</span>

        </div>
    )

}

export default Scheduler;