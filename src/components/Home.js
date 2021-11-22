import * as React from 'react';
import axios from 'axios';
import interfaceUtil from '../interface';
import styles from '../stylesheets/Home.module.css';
import Infobox from './Infobox';
import rt_img from '../images/twitter_retweet_button.png';
import rted_img from '../images/twitter_retweeted_button.png';
import like_img from '../images/twitter_like_button.png';
import liked_img from '../images/twitter_liked_button.png';

function Home(props){
    const twitterHandle = props.twitterHandle;
    console.log(twitterHandle);
    const tweetDefaultValue = 'Say hi to Twitter..';
    const [timeline, setTimeline] = React.useState();
    React.useEffect(() => {
        //timeline = interfaceUtil.homePage();
        axios({
            url:'http://localhost:5000/twitter/home',
            method:'GET',
        })
        .then((response) =>{
            console.log(response)
            setTimeline(response.data);
        })
        .catch((error)=> {
            console.log(error);
        })
    }, []);
    console.log(timeline);

    if(timeline && timeline.length > 1){
        return(
            <div className = {styles.HomePage}>
                <div className = {styles.Header}><span>Welcome Back {twitterHandle}!</span>
                    <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('homeInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('homeInfobox').style.visibility = 'hidden'}}>
                        i<Infobox id = {'homeInfobox'} title = {'Home Page'} desc = {'This is your home page, it lets you tweet and see recent Twitter Activity and allows you to like a retweet them.'}/>
                    </div>
                </div>
                <hr style = {{marginTop: '28px'}}/>
                <div className = {styles.TweetInputDiv}>
                    <textarea 
                        className = {styles.TweetInput} 
                        id = "Home_Tweet_Input" 
                        defaultValue = {'Say hi to Twitter...'} 
                        readOnly = {false} 
                        onClick = {() => {document.getElementById('Home_Tweet_Input').value = ''}}/>
                </div>
                <div className = {styles.TweetButtonDiv}><span className = {styles.TweetButton} onClick = {() => {interfaceUtil.tweeting(document.getElementById('Home_Tweet_Input').value)}}>Tweet</span></div>
                <hr style = {{marginTop: '28px'}}/>
                <div className = {styles.Timeline}>
                    {
                        timeline.map((tweet) => {
                            return(
                                <div className = {styles.TimelineItem}>
                                    <div className = {styles.TimelineItemText}>{tweet.text}</div>
                                    <div style = {{margin: '10px 0px'}}>
                                        <span style = {{width:'30%', display:'inline-block'}}><img src = {rt_img}/></span>
                                        <span style = {{width:'30%', display:'inline-block'}}><img src = {like_img}/></span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <hr style = {{marginTop: '28px'}}/>
            </div>
        )
    }
    else{
        let message = '...Loading Timeline...';
        if(timeline && timeline.errors) message = 'Twitter Rate Limit Exceeded';
        return(
            <div className = {styles.HomePage}>
                <div className = {styles.Header}><span>Welcome Back {twitterHandle}!</span><div className = {styles.InfoButton}>i<Infobox /></div></div>
                <hr style = {{marginTop: '28px'}}/>
                <div className = {styles.TweetInputDiv}>
                    <textarea 
                        className = {styles.TweetInput} 
                        id = "Home_Tweet_Input" 
                        defaultValue = {'Say hi to Twitter...'} 
                        readOnly = {false} 
                        onClick = {() => {document.getElementById('Home_Tweet_Input').value = ''}}/>
                </div>
                <div className = {styles.TweetButtonDiv}><span className = {styles.TweetButton} onClick = {() => {interfaceUtil.tweeting(document.getElementById('Home_Tweet_Input').value)}}>Tweet</span></div>
                <hr style = {{marginTop: '28px'}}/>
                <div className = {styles.Timeline}>{message}</div>
                <hr style = {{marginTop: '28px'}}/>
            </div>
        )
    }
}

export default Home;