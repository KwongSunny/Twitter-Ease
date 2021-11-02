import * as React from 'react';
import styles from './stylesheets/App.module.css';
import bg from './images/background.png';
import interfaceUtil from './interface.js';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState('Home'); //pages: Home, Scheduler, Retweeter, Mass Delete
    const accountInfo = {};

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
                    <div className = {styles.HeaderBar}><span>{`Welcome User!`}</span></div>

                </div>
            }
            <img className = {styles.Background} src = {bg}/>
        </div>
    );
}

export default App;
