import * as React from 'react';
import styles from './stylesheets/App.module.css';
import LoginBox from './components/LoginBox';
//import * as accountsUtil from '../back-end/... account functions

function App() {

  const [currentPage, setCurrentPage] = React.useState('home');

  //if(!loggedIn){
    return (
      <div className={styles.App}>
        <LoginBox/>

        <div className={styles.SectionBar}>
          <div onClick ={()=>{setCurrentPage('home')}}>
            Home
          </div>
          <div onClick ={()=>{setCurrentPage('')}}>
            Placeholder
          </div>
          <div onClick ={()=>{setCurrentPage('')}}>
            Placeholder 2
          </div>
          <div onClick ={()=>{setCurrentPage('accounts')}}>
            Manage Accounts
          </div>
          <div onClick ={()=>{setCurrentPage('')}}>
            Switch Accounts
          </div>
        </div>
        <div>
          
        </div>

      </div>
    );
  }
//}

export default App;
