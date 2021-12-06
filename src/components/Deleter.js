import * as React from 'react';
import interfaceUtil from '../interface';
import styles from '../stylesheets/Deleter.module.css';

function Deleter(props){

    return(
        <div className = {styles.DeleterPage}>
            <div className = {styles.DeleteButtonDiv}>
                <div className = {styles.DeleteButton} onClick = {() => {
                    let div = document.getElementById('confirmDeleteDiv');
                    div.style.visibility = 'visible';
                    //interfaceUtil.mass_deletion();
                    //interfaceUtil.unretweet();
                }}>Purge Tweets</div>
            </div>
            <div id = 'confirmDeleteDiv' className = {styles.ConfirmDelete}>
                <div>Are you sure you want to delete recent tweets?</div>
                <div style = {{display: 'grid', gridTemplateColumns: '50% 50%', marginTop: '20px'}}>
                    <span style = {{border: 'solid white 1.5px', background: 'red', borderRadius: '20px', width: '50%', padding: '5px', margin:'auto'}}
                        onClick = {() => {
                            interfaceUtil.mass_deletion();
                            interfaceUtil.unretweet();
                            document.getElementById('confirmDeleteDiv').style.visibility = 'hidden';
                        }}
                    >Confirm</span>
                    <span style = {{border: 'solid white 1.5px', borderRadius: '20px', width: '50%', padding: '5px', margin:'auto'}}
                        onClick = {() => {
                            document.getElementById('confirmDeleteDiv').style.visibility = 'hidden';
                        }}
                    >Cancel</span>
                </div>
            </div>
        </div>
    )
}

export default Deleter;