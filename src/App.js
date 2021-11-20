import * as React from 'react';
import styles from './stylesheets/App.module.css';
import bg from './images/background.png';
import interfaceUtils from './interface.js';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Scheduler from './components/Scheduler';
import Retweeter from './components/Retweeter';

function App() {
    const twitterHandle = Cookies.get('twitter_screen_name');
    console.log('cookie:' + twitterHandle);
    const [loggedIn, setLoggedIn] = React.useState(twitterHandle);
    const [currentPage, setCurrentPage] = React.useState('home'); //pages: Home, Scheduler, Retweeter, Mass Delete
    const page = {currentPage, setCurrentPage};
    const [tweetSchedules, setTweetSchedules] = React.useState(
        [
            {
                id: '001',
                name: 'Weekend',
                text: 'Have a great weekend Twitter!',
                day: '0000111',
                time: '07:00',
                active: true
            },
            {
                id: '002',
                name: 'Thursday Contest',
                text: 'Remember to enter our raffle! httpz://raffl.co/12309/',
                day: '0001000',
                time: '12:30',
                active: false
            }
        ]
    );

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
                        currentPage === 'scheduler' && <Scheduler schedules = {schedules}/>
                    }
                    {
                        currentPage === 'deleter' && <div>
                            Deleter
                        </div>
                    }
                </div>
            }
            
            <img className = {styles.Background} src = {bg} alt = ''/>
        </div>
    );
}

export default App;
