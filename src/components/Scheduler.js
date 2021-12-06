import * as React from 'react';
import styles from '../stylesheets/Scheduler.module.css';
import Infobox from './Infobox';
import DotwButton from './DotwButton';
import interfaceUtils from '../interface.js';
import edit_img from '../images/edit_button.png';
import delete_img from '../images/deleter_button.png';
import {v4 as uuidv4} from 'uuid';

function Scheduler(props){
    //the original list of schedules
    const twitterHandle = props.twitterHandle;
    const tweetSchedules = props.schedules.tweetSchedules;
    const setTweetSchedules = props.schedules.setTweetSchedules;

    const [creatingSchedule, setCreatingSchedule] = React.useState(false);
    
    //the current schedule being displayed
    const [currentSchedule, setCurrentSchedule] = React.useState(tweetSchedules[props.schedules.scheduleIndex]?tweetSchedules[props.schedules.scheduleIndex]:undefined);
    if(!creatingSchedule && tweetSchedules.length === 0) setCreatingSchedule(true);

    //staged changes for the current schedule
    const stagedSchedule = {
        id: uuidv4(),
        name: 'New Schedule',
        text: 'Enter some text...',
        mon: false,
        tue: false,
        wed: false,
        thur: false,
        fri: false,
        sat: false,
        sun: false,
        time: '00:00',
        active: true,
        repeating: true,
    };
    
    console.log('tweetSchedules1: ',tweetSchedules);
    console.log('currentSchedule1: ', currentSchedule);

    if(!creatingSchedule && currentSchedule){
        stagedSchedule.id = currentSchedule.id;
        stagedSchedule.name = currentSchedule.name;
        stagedSchedule.text = currentSchedule.text;
        stagedSchedule.mon = currentSchedule.mon;
        stagedSchedule.tue = currentSchedule.tue;
        stagedSchedule.wed = currentSchedule.wed;
        stagedSchedule.thur = currentSchedule.thur;
        stagedSchedule.fri = currentSchedule.fri;
        stagedSchedule.sat = currentSchedule.sat;
        stagedSchedule.sun = currentSchedule.sun;
        stagedSchedule.time = currentSchedule.time;
        stagedSchedule.active = currentSchedule.active;
        stagedSchedule.repeating = currentSchedule.repeating;
    }

    return(
        <div className = {styles.SchedulerPage}>
            <div className = {styles.Header}><span>Scheduler</span>                
                <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('schedulerInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('schedulerInfobox').style.visibility = 'hidden'}}>
                    i<Infobox id = {'schedulerInfobox'} title = {'Scheduler'} desc = {"Schedule automated tweets and let our app do its work while you do yours! Just configure the message, time and days and you're all set."}/>
                </div>
            </div>
            <hr style = {{marginTop: '28px'}}/>

            <div className = {styles.ScheduleNamebar}>
                <span 
                    className = {styles.SchedulePicker} 
                    style = {(props.schedules.scheduleIndex === 0)?{marginRight:'20px', color: 'gray'}:{marginRight:'20px'}} 
                    onClick = {() => {
                        if(props.schedules.scheduleIndex > 0){props.schedules.scheduleIndex--; 
                        setCurrentSchedule(tweetSchedules[props.schedules.scheduleIndex])};
                }}>
                    {!creatingSchedule?'<<':''}
                </span>
                <span style = {{marginRight: '8px'}}><input id = "Is_Active_Input" type = 'checkbox' defaultChecked = {stagedSchedule.active} key = {'isActive' + stagedSchedule.id}
                onClick = {() =>{
                    if(stagedSchedule.active) stagedSchedule.active = false;
                    else stagedSchedule.active = true;
                }}/></span>
                <span className = {styles.NameInput} id = "Schedule_Name_Input" contentEditable = "false">{stagedSchedule.name}</span>
                <span className = {styles.EditNameButton} onClick = {() => {
                    let element = document.getElementById("Schedule_Name_Input");
                    //need to fix new line enter
                    if(element.contentEditable === 'true'){
                        element.contentEditable = "false";
                        element.style.border = 'none';
                        element.style.padding = '0px 8px';
                    }
                    else{
                        element.contentEditable = "true";
                        element.style.borderBottom = 'dashed white 2px';
                        element.style.padding = '0px 8px';
                    }
                }}><img src = {edit_img}/></span>
                {!creatingSchedule && <span className = {styles.DeleteScheduleButton}
                    onClick = {() => {
                        tweetSchedules.splice(props.schedules.scheduleIndex,1);
                        interfaceUtils.delete_schedule(stagedSchedule.id);
                        setCurrentSchedule(tweetSchedules[0]);
                    }}
                ><img src = {delete_img}/></span>}
                <span className = {styles.AddScheduleButton}
                    onClick = {() => {
                        setCreatingSchedule(!creatingSchedule);
                    }}
                >{creatingSchedule?"x":"+"}</span>
                <span 
                    className = {styles.SchedulePicker} 
                    style = {(props.schedules.scheduleIndex === tweetSchedules.length-1)?{marginLeft:'20px', color: 'gray'}:{marginLeft:'20px'}} 
                    onClick = {() => {
                        if(props.schedules.scheduleIndex < tweetSchedules.length-1)
                        {
                            props.schedules.scheduleIndex++; 
                            setCurrentSchedule(tweetSchedules[props.schedules.scheduleIndex])};
                }}>
                    {!creatingSchedule?'>>':''}
                </span>
            </div>

            <div className = {styles.TweetInputDiv}><textarea className = {styles.TweetInput} id = "Schedule_Tweet_Input" key = {'scheduleText' + stagedSchedule.id} 
                onClick = {() => {
                    if(creatingSchedule){
                        document.getElementById('Schedule_Tweet_Input').value = '';
                    }
                }}>
                    {stagedSchedule.text}
                </textarea>
            </div>

            <form className = {styles.DotwButtons}>
                <DotwButton id = {'Mon_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'M'} value = "mon" index = {1}/>
                <DotwButton id = {'Tue_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'T'} value = "tue" index = {2}/>
                <DotwButton id = {'Wed_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'W'} value = "wed" index = {3}/>
                <DotwButton id = {'Thu_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'T'} value = "thur" index = {4}/>
                <DotwButton id = {'Fri_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'F'} value = "fri" index = {5}/>
                <DotwButton id = {'Sat_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'S'} value = "sat" index = {6}/>
                <DotwButton id = {'Sun_Button_' + stagedSchedule.id} stagedSchedule = {stagedSchedule} currentSchedule = {currentSchedule} text = {'S'} value = "sun" index = {7}/>
            </form>
            <input className = {styles.TimeInput} id = {'Time_Input'} style = {{background: 'unset'}} type = 'time' defaultValue = {stagedSchedule.time} key = {'timeInput' + stagedSchedule.id} readOnly ={false}/>
            <input style = {{marginLeft: '16px'}} type = 'checkbox' defaultChecked = {stagedSchedule.repeating} key = {'isRepeating' + stagedSchedule.id}
                onClick = {() => {
                    stagedSchedule.repeating = !stagedSchedule.repeating;
                }}
            /><span>Repeating?</span>

            <div className = {styles.ApplyButtonDiv}>
                <span className = {styles.ApplyButton} 
                    onClick = {() => {
                        stagedSchedule.time = document.getElementById('Time_Input').value;
                        stagedSchedule.name = document.getElementById('Schedule_Name_Input').innerText;
                        stagedSchedule.text = document.getElementById('Schedule_Tweet_Input').value;

                        let dayOfWeek = '';
                        if(stagedSchedule.mon) dayOfWeek += 'mon,';
                        if(stagedSchedule.tue) dayOfWeek += 'tue,';
                        if(stagedSchedule.wed) dayOfWeek += 'wed,';
                        if(stagedSchedule.thur) dayOfWeek += 'thu,';
                        if(stagedSchedule.fri) dayOfWeek += 'fri,';
                        if(stagedSchedule.sat) dayOfWeek += 'sat,';
                        if(stagedSchedule.sun) dayOfWeek += 'sun,';
                        if(dayOfWeek.charAt(dayOfWeek.length-1) === ',')
                            dayOfWeek = dayOfWeek.substring(0, dayOfWeek.length-1);

                        if(creatingSchedule){
                            tweetSchedules.push(stagedSchedule);
                            setCreatingSchedule(false);
                        }
                        else{
                            tweetSchedules[props.schedules.scheduleIndex] = stagedSchedule;
                        }
                        if(creatingSchedule){
                            interfaceUtils.scheduled_tweets(
                                stagedSchedule.id,
                                '00',
                                stagedSchedule.time.substring(0,2),
                                stagedSchedule.time.substring(3), 
                                '', 
                                '', 
                                dayOfWeek, 
                                stagedSchedule.text,
                                stagedSchedule.name,
                                stagedSchedule.active,
                                stagedSchedule.repeating,
                                twitterHandle
                            );
                        }
                        else{
                            // interfaceUtils.update_schedules(
                            //     stagedSchedule.id,
                            //     '00',
                            //     stagedSchedule.time.substring(0,2),
                            //     stagedSchedule.time.substring(3), 
                            //     '', 
                            //     '', 
                            //     dayOfWeek, 
                            //     stagedSchedule.text
                            // );
                        }
                    }}
                >{creatingSchedule?"Create":"Apply"}</span>
            </div>

            <hr style = {{marginTop: '28px'}}/>
        </div>
    )
}

export default Scheduler;