import * as React from 'react';
import styles from '../stylesheets/Retweeter.module.css';
import Infobox  from './Infobox';
import interfaceUtils from '../interface';


function Retweeter(){

    return(
        <div className = {styles.RetweeterPage}>
            <div className = {styles.Header}><span>Retweeter</span>
                <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('retweeterInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('retweeterInfobox').style.visibility = 'hidden'}}>
                    i<Infobox id = {'retweeterInfobox'} title = {'Retweeter'} desc = {'Automatically retweet Tweets with specific keywords and phrases! You can also filter out specific terms if needed. This retweets a set amount of tweets based on recent activity.'}/>
                </div>  
            </div>
            <hr style = {{marginTop: '28px'}}/>
            <div style = {{margin:'20px 0px 10px', fontSize: '20px'}}>Keywords</div>
            <div id = 'RTKeywordsDiv' className = {styles.RetweetKeywordsDiv}><textarea id = 'RTKeywords' className = {styles.RetweetKeywordsInput}/></div>
            <div style = {{margin:'20px 0px 10px', fontSize: '20px'}}>Filters</div>
            <div id = 'RTFiltersDiv' className = {styles.RetweetFilterDiv}><textarea id = 'RTFilters' className = {styles.RetweetFilterInput}/></div>
            <div>
                <input id = 'likeRetweets' type = 'checkbox'/>
                Like retweets?
            </div>
            <div className = {styles.RetweetButtonDiv}><span className = {styles.RetweetButton} 
                let query = document.getElementById('RTKeywords').value + ' ';
                let filter = document.getElementById('RTFilters').value;

                filter.split(' ').forEach((word) => {
                    query += '-' + word;
                })

                onClick = {() => {
                    if(document.getElementById('likeRetweets').checked){
                        interfaceUtils.like_n_retweet_all(document.getElementById('RTKeywords').value);
                    }
                    else{
                        interfaceUtils.retweet(document.getElementById('RTKeywords').value);
                    }
                }}
            >Retweet</span></div>
            <hr style = {{marginTop: '28px'}}/>
        </div>
    )
}

export default Retweeter;
