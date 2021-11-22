import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';
import Infobox from './Infobox';
import DotwButton from './DotwButton';
import interfaceUtils from '../interface';

function Scheduler(props){
    const tweetSchedules = props.schedules.tweetSchedules;
    const setTweetSchedules = props.schedules.setTweetSchedules;
    const [currentSchedule, setCurrentSchedule] = React.useState(tweetSchedules[props.schedules.scheduleIndex]?tweetSchedules[props.schedules.scheduleIndex]:undefined);

    const stagedSchedule = {
        id: currentSchedule.id,
        name: currentSchedule.name,
        text: currentSchedule.text,
        day: currentSchedule.day,
        time: currentSchedule.time
    };

    React.useEffect(() => {
        console.log('test');
        //document.getElementById('ScheduleTweetInput').defaultValue = stagedSchedule.text;
    }, [currentSchedule])

    return(
        <div className = {styles.SchedulerPage}>
            <div className = {styles.Header}><span>Scheduler</span>                
                <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('schedulerInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('schedulerInfobox').style.visibility = 'hidden'}}>
                    i<Infobox id = {'schedulerInfobox'} title = {'Scheduler'} desc = {"Schedule automated tweets and let our app do its work while you do yours! Just configure the message, time and days and you're all set."}/>
                </div>
            </div>
            <hr style = {{marginTop: '28px'}}/>


            <div className = {styles.ScheduleNamebar}>
                <span style = {{marginRight:'20px', display:'inline-block'}} onClick = {() => {if(props.schedules.scheduleIndex > 0){props.schedules.scheduleIndex--; setCurrentSchedule(tweetSchedules[props.schedules.scheduleIndex])}}}>{'<<'}</span>
                <span id = "Schedule_Name_Input" contentEditable = "false">{currentSchedule.name}</span>
                <span onClick = {() => {
                    let element = document.getElementById("scheduleNameInput");
                    console.log(element.contentEditable);
                    element.contentEditable === "true"?(element.contentEditable = "false"):(element.contentEditable = "true");
                }}>Change</span>
                <span style = {{marginLeft:'20px', display:'inline-block'}} onClick = {() => {if(props.schedules.scheduleIndex < tweetSchedules.length-1){props.schedules.scheduleIndex++; setCurrentSchedule(tweetSchedules[props.schedules.scheduleIndex])}}}>{'>>'}</span>
            </div>

            <div className = {styles.TweetInputDiv}><textarea className = {styles.TweetInput} id = "ScheduleTweetInput" key = {'1'}>{stagedSchedule.text}</textarea></div>

            <form className = {styles.DotwButtons}>
                <DotwButton id = {'Mon_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'M'} index = {1}/>
                <DotwButton id = {'Tue_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'T'} index = {2}/>
                <DotwButton id = {'Wed_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'W'} index = {3}/>
                <DotwButton id = {'Thu_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'T'} index = {4}/>
                <DotwButton id = {'Fri_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'F'} index = {5}/>
                <DotwButton id = {'Sat_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'S'} index = {6}/>
                <DotwButton id = {'Sun_Button'} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'S'} index = {7}/>
            </form>
            <input id = {'Time_Input'} style = {{background: 'unset'}} type = 'time' defaultValue = {currentSchedule.time} readOnly ={false}/>
            {/* <div><span onClick = {() => {
                console.log('currentSchedule: ', currentSchedule);
                console.log('stagedSchedule: ', stagedSchedule);
                console.log('time: ', document.getElementById('Time_Input').value)
            }}>ConsoleLog</span></div> */}

            <div className = {styles.ApplyButtonDiv}>
                <span className = {styles.ApplyButton} 
                    onClick = {() => {
                        stagedSchedule.time = document.getElementById('Time_Input').value;
                        stagedSchedule.name = document.getElementById('Schedule_Name_Input').value;
                        tweetSchedules[props.schedules.scheduleIndex] = stagedSchedule;
                        //need to update database
                        //    
                        interfaceUtils.scheduler(stagedSchedule.text, '18', '28');
                    }}
                >Apply</span>
            </div>

        </div>
    )

}

export default Scheduler;