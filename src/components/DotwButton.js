import * as React from 'react';
import styles from '../stylesheets/DotwButton.module.css';

function DotwButton(props){
    const id = props.id;
    const stagedSchedule = props.stagedSchedule;
    const currentSchedule = props.currentSchedule;
    const text = props.text;
    const index = props.index;
    const value = props.value;
    


    return(
        <span 
            style = {stagedSchedule[value]?{backgroundColor: 'rgba(255,255,255,0.6)'}:{backgroundColor:'unset'}}
            id = {id} 
            className = {styles.DotwButton} 
            key = {id}
            onClick = {() => {
                let button = document.getElementById(id);

                if(stagedSchedule[value]){
                    button.style.backgroundColor = 'unset';
                }
                else{
                    button.style.backgroundColor = 'rgba(255,255,255,0.6)';
                }
                
                stagedSchedule[value] = !stagedSchedule[value];
        }}
        >{text}</span>
    )

    // return(
    //     <span id = {id} 
    //         style = {(currentSchedule.day.substring(index, index-1) === '1')?{backgroundColor: 'rgba(255,255,255,0.6)'}:{backgroundColor:'unset'}} 
    //         className = {styles.DotwButton} 
    //         onClick = {() => {
    //             let button = document.getElementById(id);
    //             if(stagedSchedule.day.substring(index, index-1) === '0'){
    //                 stagedSchedule.day = stagedSchedule.day.substring(0, index-1) + '1' + stagedSchedule.day.substring(index);


    //                 button.style.backgroundColor = 'rgba(255,255,255,0.6)';
    //                 button.style.color = 'white';
    //             }
    //             else{
    //                 stagedSchedule.day = stagedSchedule.day.substring(0, index-1) + '0' + stagedSchedule.day.substring(index);


    //                 button.style.backgroundColor = 'unset';
    //                 button.style.color = 'white';
    //             }
    //             console.log(stagedSchedule);
    //         }}
    //     >{text}</span>
    // )
}

export default DotwButton;