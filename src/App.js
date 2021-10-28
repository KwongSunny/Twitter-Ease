import * as React from 'react';
import styles from './stylesheets/App.module.css';
import LoginBox from './components/LoginBox';
import Accounts from './components/Accounts';
import Sectionbar from './components/Sectionbar';
import Scheduler from './components/Scheduler';
//import * as accountsUtil from '../back-end/... account functions

function App() {
  const [easeAccount, setEaseAccount] = React.useState();
  const [twitterAccounts, setTwitterAccounts] = React.useState([{email: 'testuser1@test.com', password: 'password1', handle: 'testuser1'}, {email: 'johndoe1@gmail.com', password: '123abc', handle: 'johndoe1'}]);
  const [scheduledTweets, setScheduledTweeets] = React.useState([{name: 'daily count', tweet: "Today's number is 3", days: '0010011', time: '3:00, 5:30, 16:00'}]);
  const [darkMode, setDarkMode] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('Accounts');
  const sections = ['Home', 'Accounts', 'Scheduler'];

  //if(!loggedIn){
    return (
      <div className={styles.App}>
        {!easeAccount && <LoginBox easeAccount = {easeAccount} setEaseAccount = {setEaseAccount}/>}
        <Sectionbar sections = {sections} currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
        <div className = {styles.Page}>
          {currentPage === 'Accounts' && <Accounts twitterAccounts = {twitterAccounts} setTwitterAccounts = {setTwitterAccounts}/>}
          {currentPage === 'Scheduler' && <Scheduler twitterAccounts = {twitterAccounts} scheduledTweets = {scheduledTweets} setScheduledTweeets = {setScheduledTweeets}/>}
        </div>
        <div className = {styles.Bottombar} onClick = {() => {setDarkMode(!darkMode)}}>
          Dark Mode
        </div>
      </div>
    );
  }
//}

export default App;
