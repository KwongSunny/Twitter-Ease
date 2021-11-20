import * as React from 'react';
import styles from '../stylesheets/Retweeter.module.css';
import Infobox  from './Infobox';
import interfaceUtils from '../interface';


function Retweeter(){

    return(
        <div className = {styles.RetweeterPage}>
            <div className = {styles.Header}><span>Retweeter</span>
                <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('retweeterInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('retweeterInfobox').style.visibility = 'hidden'}}>
                    i<Infobox id = {'retweeterInfobox'} title = {'Retweeter'} desc = {'Automatically retweet Tweets with specific keywords and phrases! You can also filter out specific terms if needed.'}/>
                </div>
            </div>
            <hr style = {{marginTop: '28px'}}/>
            <div style = {{margin:'20px 0px 10px', fontSize: '20px'}}>Keywords</div>
            <div id = 'RTKeywords' className = {styles.RetweetKeywordsDiv}><textarea className = {styles.RetweetKeywordsInput}/></div>
            <div style = {{margin:'20px 0px 10px', fontSize: '20px'}}>Filters</div>
            <div id = 'RTFilters' className = {styles.RetweetFilterDiv}><textarea className = {styles.RetweetFilterInput}/></div>
            <div className = {styles.RetweetButtonDiv}><span className = {styles.RetweetButton} 
                onClick = {() => {
                    interfaceUtils.retweet(document.getElementById('RTKeywords'));
                }}
            >Retweet</span></div>
            <hr style = {{marginTop: '28px'}}/>
        </div>
    )
}

export default Retweeter;