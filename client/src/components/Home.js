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
    const tweetDefaultValue = 'Say hi to Twitter..';
    const [timeline, setTimeline] = React.useState();
    React.useEffect(() => {
        //timeline = interfaceUtil.homePage();
        axios({
            url:'/twitter/home',
            method:'GET',
        })
        .then((response) =>{
            setTimeline(response.data);
        })
        .catch((error)=> {
            console.log(error);
        })
    }, []);
    console.log('timeline: ', timeline);

    if(timeline && timeline.length > 0){
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
                        timeline.map((tweet, index) => {
                            let rt_src = (tweet.retweeted)?rted_img:rt_img;
                            let like_src = (tweet.favorited)?liked_img:like_img;

                            let tweet_text = tweet.text;
                            let tweet_hyperlink = '';
                            if(tweet.retweeted_status){
                                tweet_text = 'You retweeted: ' + tweet_text.substring(2);
                                tweet_hyperlink = tweet.retweeted_status.text.substring(tweet.retweeted_status.text.indexOf('https'));
                            }

                            return(
                                <div className = {styles.TimelineItem} key = {index}>
                                    <div className = {styles.TimelineItemText}>{tweet_text}<br /><a href = {tweet_hyperlink}>{tweet_hyperlink}</a></div>
                                    <div style = {{margin: '10px 0px'}}>
                                        <span style = {{width:'30%', display:'inline-block'}}><img src = {rt_src} id = {'rt_' + tweet.id_str} onClick = {() => {
                                            //DOESNT WORK, ASK BACKEND TEAM
                                            console.log(tweet.id_str);
                                            if(tweet.retweeted){
                                                interfaceUtil.singleUnretweet(tweet.id_str);
                                                document.getElementById('rt_' + tweet.id_str).src = rt_img;

                                            }
                                            else {
                                                interfaceUtil.singleRetweet(tweet.id_str);
                                                document.getElementById('rt_' + tweet.id_str).src = rted_img;
                                            }
                                            tweet.retweeted = !tweet.retweeted;
                                        }}/></span>
                                        <span style = {{width:'30%', display:'inline-block'}}><img src = {like_src} id = {'like_' + tweet.id_str} onClick = {() => {
                                            //DOESNT WORK, ASK BACKEND TEAM
                                            if(tweet.favorited){
                                                interfaceUtil.singleUnlike(tweet.id_str);
                                                document.getElementById('like_' + tweet.id_str).src = like_img;
                                            }
                                            else {
                                                interfaceUtil.singleLike(tweet.id_str);
                                                document.getElementById('like_' + tweet.id_str).src = liked_img;
                                            }
                                            tweet.favorited = !tweet.favorited;
                                        }}/></span>
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
                <div className = {styles.Header}><span>Welcome Back {twitterHandle}!</span>
                    <div className = {styles.InfoButton} onMouseOver = {() => {document.getElementById('homeInfobox').style.visibility = 'visible'}} onMouseLeave = {() => {document.getElementById('homeInfobox').style.visibility = 'hidden'}}>
                        i<Infobox id = {'homeInfobox'} title = {'Home Page'} desc = {'This is your home page, it lets you tweet and see recent Twitter Activity and allows you to like and retweet them.'}/>
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
                <div className = {styles.Timeline}>{message}</div>
                <hr style = {{marginTop: '28px'}}/>
            </div>
        )
    }
}

export default Home;