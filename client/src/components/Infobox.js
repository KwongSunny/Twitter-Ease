import * as React from 'react';
import styles from '../stylesheets/Infobox.module.css';

function Infobox(props){
    const id = props.id;
    const title = props.title;
    const desc = props.desc;

    return(
        <div id = {id} className = {styles.InfoBox}>
            <div style = {{fontWeight: 'bold', marginBottom: '10px'}}>{title}</div>
            <div>{desc}</div>
        </div>
    )
}

export default Infobox;