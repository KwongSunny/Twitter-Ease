import * as React from 'react';
import twitterImagesButton from '../images/twitter_images_button.png';
import accountStyles from '../stylesheets/Accounts.module.css';

function Accounts(props){
    //const accounts = utils.RetrieveAccounts(email, password); //backend
    const [accounts, setAccounts] = React.useState([{email: 'testuser1@test.com', password: 'password1', handle: 'testuser1'}, {email: 'johndoe1@gmail.com', password: '123abc', handle: 'johndoe1'}]);
    const [currentAccount, setCurrentAccount] = React.useState('');
    const [addingAccount, setAddingAccount] = React.useState(false);
    //currentAccount's recent tweets
    const [recentTweets, setRecentTweets] = React.useState([{value: 'tweet1'},{value: 'tweet2'},{value: 'tweet3'}]);

    let foundAccount = accounts.find((account) => account.handle === currentAccount);
    if(!foundAccount) foundAccount = accounts[0];

    return(
        <div className = {accountStyles.AccountPage}>
            <div className = {accountStyles.AccountList}>
                {//if there are accounts, show them
                    accounts.length > 0 && <div>
                        {
                            accounts.map((account) => {
                                return(
                                    <div className = {accountStyles.AccountListItem} onClick = {() => {setCurrentAccount(account.handle); setAddingAccount(false)}}>
                                        @{account.handle}
                                    </div>)
                            })
                        }
                        <div className = {accountStyles.AccountListItem} onClick = {() => setAddingAccount(true)}>[+] Add an Account</div>
                    </div>
                }
                {//if there are no accounts
                    accounts.length === 0 && <div>
                        {
                            'Looks like you have no attached Twitter accounts.'
                        }
                    </div>
                }
            </div>
            <div>
                {//if the currentAccount exists, then show information about the current Twitter account
                    !addingAccount && <div className = {accountStyles.AccountItem}>
                        <div className = {accountStyles.AccountItemHandle}><p>@{foundAccount.handle}</p></div>
                        <div>
                            <div className = {accountStyles.AccountInfo}>
                                <div className = {accountStyles.AccountTweetBox}>
                                    <textarea/><br/>
                                </div>
                                <div className = {accountStyles.AccountTweetButtons}>
                                    <div className = {accountStyles.AccountImageButton}><img styles = {{height:"100%"}}src = {twitterImagesButton}/></div>
                                    <div className = {accountStyles.AccountTweetButton}>Tweet</div>
                                </div>
                            </div>
                            <div>
                                <div className = {accountStyles.AccountButton}>Scheduled Tweets</div>
                            </div>
                            <div className = {accountStyles.RecentTweetsList}>
                                {
                                    recentTweets.map((tweet)=>{
                                        return(<div>
                                            {tweet.value}
                                        </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>

                }
                {//if currentAccount does not exist, then show a UI to add an account
                    addingAccount && <div className = {accountStyles.AddingAccount}>
                        <form>
                            Email:
                            <input id = "add_account_email" type = "text"/><br/><br/>
                            Password:
                            <input id = "add_account_password" type = "password"/><br/><br/>
                            <div className = {accountStyles.AddAccount}
                                onClick = {() => {
                                    let twitterEmail = document.getElementById("add_account_email").value;
                                    let twitterPassword = document.getElementById("add_account_password").value;
                                    document.getElementById("add_account_email").value = '';
                                    document.getElementById("add_account_password").value = '';
                                    //addTwitterAccount returns JSON of the account if successfully added account, null otherwise
                                    //if(addTwitterAccount(twitterEmail, twitterPassword)){
                                        accounts.push({email: twitterEmail, password: twitterPassword, handle: twitterEmail})
                                        setAccounts(accounts);
                                        setAddingAccount(false);
                                    //}
                                    //else{


                                    //}
                                }}
                            >
                                Add Account
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default Accounts;