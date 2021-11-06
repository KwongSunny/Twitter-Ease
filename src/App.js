import * as React from 'react';
import styles from './stylesheets/App.module.css';
import bg from './images/background.png';
import interfaceUtil from './interface.js';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar';
import Scheduler from './components/Scheduler';

function App() {
    const cookie = Cookies.get('twitter_screen_name');
    console.log('cookie:' + cookie);
    const [loggedIn, setLoggedIn] = React.useState(cookie);
    const [currentPage, setCurrentPage] = React.useState('home'); //pages: Home, Scheduler, Retweeter, Mass Delete
    const page = {currentPage, setCurrentPage};
    const [tweetSchedules, setTweetSchedules] = React.useState(
        [
            {
              name: 'Weekend',
              text: 'Have a great weekend Twitter!',
              day: '0000111',
              time: '7:00'
            },
            {
              name: 'Thursday Contest',
              text: 'Remember to enter our raffle! httpz://raffl.co/12309/',
              day: '0001000',
              time: '12:30'
            }
        ]
    );
    const schedules = {tweetSchedules, setTweetSchedules};

    return (
        <div className={styles.App}>
            {//if not logged in, show the login prompt
                !loggedIn && <div className = {styles.LoginBox}>
                    <div style = {{marginBottom: '20px', fontSize: '26px', textDecoration: 'underline', textUnderlineOffset: '10px'}}>Twitter Ease</div>
                    <div style = {{marginBottom: '30px'}}>Click below to authorize your Twitter Account</div>
                    <div style = {{marginTop:'20px'}}><span className = {styles.AuthorizeButton} onClick = {() => {interfaceUtil.login()}}>Authorize</span></div>
                </div>
            }   
            {
                loggedIn && <div className = {styles.Page}>
                    <Sidebar page = {page} setLoggedIn = {setLoggedIn}/>
                    {
                        currentPage === 'home' && <div>
                            <textarea style = {{color:'black'}} id = 'textarea'/>
                            <button style = {{color:'black'}}onClick = {()=>{interfaceUtil.tweeting(document.getElementById('textarea').value)}}>Tweet</button>
                        </div>
                    }
                                        {
                        currentPage === 'retweeter' && <div>
                            Retweeter
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
            
            <img className = {styles.Background} src = {bg}/>
        </div>
    );
}

export default App;
