import * as React from 'react';
import styles from './stylesheets/App.module.css';
import LoginBox from './components/LoginBox';
import Accounts from './components/Accounts';
import Sectionbar from './components/Sectionbar';
import Scheduler from './components/Scheduler';
//import * as accountsUtil from '../back-end/... account functions

function App() {
  const [easeAccount, setEaseAccount] = React.useState();
  const [twitterAccounts, setTwitterAccounts] = React.useState(
      [
        {
          mail: 'testuser1@test.com', 
          password: 'password1', 
          handle: 'testuser1', 
          recentTweets: [
            {id: '0123', text: 'Today is such a nice day #living', liked: false, retweeted: false}, 
            {id: '4231', text: '@TwitterEase is the best! #twitterease', liked: false, retweeted: true}, 
            {id: '3421', text: 'Remember to like and subscribe!', liked: false, retweeted: false},
            {id: '2891', text: 'You just lost the game', liked: false, retweeted: false}]
        }, 
        {
          email: 'johndoe1@gmail.com', 
          password: '123abc', 
          handle: 'theoriginaljohndoe', 
          recentTweets: [
            {id: '9876', text: 'How to use Google', liked: false, retweeted: false},
            {id: '8765', text: 'Google for furniture', liked: false, retweeted: false},
            {id: '3892', text: 'How to internet', liked: true, retweeted: true}]
        },
        {
          email: 'twittereaseofficial@gmail.com', 
          password: 'nvi13o1l', 
          handle: 'twittereaseofficial', 
          recentTweets: [
            {id: '4259', text: 'Remember to like and subscribe', liked: true, retweeted: true},
            {id: '1352', text: 'Use our app!', liked: false, retweeted: false},
            {id: '3029', text: '#twitterease is easy', liked: false, retweeted: false}]
        }
      ]);
  const [scheduledTweets, setScheduledTweets] = React.useState(
    [
      {
        name: 'Weekend',
        text: 'Have a great weekend Twitter!',
        day: '0000111',
        time: '7:00',
        accounts: ['twittereaseofficial'],
      },
      {
        name: 'Thursday Contest',
        text: 'Remember to enter our raffle! httpz://raffl.co/12309/',
        day: '0001000',
        time: '12:30',
        accounts: ['twittereaseofficial', 'theoriginaljohndoe'],
      }
    ]);
  const [darkMode, setDarkMode] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('Accounts');
  const sections = ['Accounts', 'Scheduler'];

  //if(!loggedIn){
    return (
        <div className={styles.App}>
          {!easeAccount && <LoginBox easeAccount = {easeAccount} setEaseAccount = {setEaseAccount}/>}
          <Sectionbar sections = {sections} currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
          <div className = {styles.Page}>
            {currentPage === 'Accounts' && <Accounts twitterAccounts = {twitterAccounts} setTwitterAccounts = {setTwitterAccounts}/>}
            {currentPage === 'Scheduler' && <Scheduler twitterAccounts = {twitterAccounts} scheduledTweets = {scheduledTweets} setScheduledTweets = {setScheduledTweets}/>}
          </div>
          <div className = {styles.Bottombar} onClick = {() => {setDarkMode(!darkMode)}}>

          </div>
        </div>
    );
  }
//}

export default App;
