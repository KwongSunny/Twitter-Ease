import * as React from 'react';
import styles from './stylesheets/App.module.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  if(!loggedIn){
    return (
      <div className={styles.App}>
        <div className={styles.SectionBar}>
          <div>
            Home
          </div>
          <div>
            Placeholder
          </div>
          <div>
            Placeholder 2
          </div>
          <div>
            Accounts
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
}

export default App;
