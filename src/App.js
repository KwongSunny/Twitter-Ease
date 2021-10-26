import * as React from 'react';
import styles from './stylesheets/App.module.css';
import LoginBox from './components/LoginBox';
import Accounts from './components/Accounts';
import Sectionbar from './components/Sectionbar';
//import * as accountsUtil from '../back-end/... account functions

function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState('accounts');

  //if(!loggedIn){
    return (
      <div className={styles.App}>
        <LoginBox />
        <Sectionbar setCurrentPage = {setCurrentPage}/>
        <div className = {styles.Page}>
          {currentPage === 'accounts' && <Accounts />}
        </div>
        <div className = {styles.Bottombar} onClick = {() => {setDarkMode(!darkMode)}}>
          Dark Mode
        </div>
      </div>
    );
  }
//}

export default App;
