import * as React from 'react';
import axios from 'axios';
import styles from './stylesheets/App.module.css';
import bg from './images/background.png';
import interfaceUtils from './interface.js';
import Utils from './utils/Utils.js';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Scheduler from './components/Scheduler';
import Retweeter from './components/Retweeter';
import Deleter from './components/Deleter';

function App() {
    const twitterHandle = Cookies.get('twitter_screen_name');
    const [loggedIn, setLoggedIn] = React.useState(twitterHandle);
    const [currentPage, setCurrentPage] = React.useState('home'); //pages: Home, Scheduler, Retweeter, Mass Delete
    const page = {currentPage, setCurrentPage};

    const [tweetSchedules, setTweetSchedules] = React.useState();

    React.useEffect(() => {
      axios({
          url:"/twitter/schedule_database",
          method:"GET"          
      })
      .then((response)=> {
        console.log(response)
        let arr = response.data;
        setTweetSchedules(Utils.filterTwitterHandles(Utils.convertDBtoFE(arr), twitterHandle));
      })
      .catch((error) => {
          console.log(error);
      })
    }, []);
    

    const schedules = {tweetSchedules, setTweetSchedules, scheduleIndex: 0};

    return (
        <div className={styles.App}>
            {//if not logged in, show the login prompt
                !loggedIn && <div className = {styles.LoginBox}>
                    <div style = {{marginBottom: '20px', fontSize: '26px', textDecoration: 'underline', textUnderlineOffset: '10px'}}>Twitter Ease</div>
                    <div style = {{marginBottom: '30px'}}>Click below to authorize your Twitter Account</div>
                    <div style = {{marginTop:'20px'}}><span className = {styles.AuthorizeButton} onClick = {() => {interfaceUtils.login()}}>Authorize</span></div>
                </div>
            }   
            {
                loggedIn && <div className = {styles.Page}>
                    <Sidebar page = {page} setLoggedIn = {setLoggedIn}/>
                    {
                        currentPage === 'home' && <div>
                            <Home twitterHandle = {twitterHandle}/>
                        </div>
                    }
                                        {
                        currentPage === 'retweeter' && <div>
                            <Retweeter />
                        </div>
                    }
                    {
                        currentPage === 'scheduler' && <div>
                            <Scheduler schedules = {schedules} twitterHandle = {twitterHandle}/>
                        </div>
                    }
                    {
                        currentPage === 'deleter' && <div>
                            <Deleter />
                        </div>
                    }
                </div>
            }
            
            <img className = {styles.Background} src = {bg} alt = ''/>
        </div>
    );
}

export default App;
