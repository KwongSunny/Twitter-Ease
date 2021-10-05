import * as React from 'react';
import styles from './stylesheets/App.module.css';
import LoginBox from './components/LoginBox';
//import * as accountsUtil from '../back-end/... account functions

function App() {

  //if(!loggedIn){
    return (
      <div className={styles.App}>
        <LoginBox/>

        <div className={styles.SectionBar}>
          <div>
            Home
          </div>
          <div>
            Google
          </div>
          <div>
            Placeholder 2
          </div>
          <div>
            Manage Accounts
          </div>
          <div className={styles.LoginInfo}>
            Log in
          </div>
        </div>
        <div>
          
        </div>

      </div>
    );
  }
//}

export default App;
