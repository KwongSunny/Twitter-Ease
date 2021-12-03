import * as React from 'react';
import interfaceUtil from '../interface';
import styles from '../stylesheets/Deleter.module.css';

function Deleter(props){

    return(
        <div className = {styles.DeleterPage}>
            <div className = {styles.DeleteButtonDiv}>
                <div className = {styles.DeleteButton} onClick = {() => {
                    interfaceUtil.mass_deletion();
                    interfaceUtil.unretweet();
                }}>Purge Tweets</div>
            </div>
        </div>
    )
}

export default Deleter;