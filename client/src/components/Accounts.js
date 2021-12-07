import * as React from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import twitterImagesButton from '../images/twitter_images_button.png';
import twitterLikeButton from '../images/twitter_like_button.png';
import twitterLikedButton from '../images/twitter_liked_button.png';
import twitterRetweetButton from '../images/twitter_retweet_button.png';
import twitterRetweetedButton from '../images/twitter_retweeted_button.png';
import styles from '../stylesheets/Accounts.module.css';

function Accounts(props){
    const twitterAccounts = props.twitterAccounts;
    const setTwitterAccounts = props.setTwitterAccounts;
    
    const [currentAccount, setCurrentAccount] = React.useState(twitterAccounts[0]? twitterAccounts[0].handle:'');
    const [addingAccount, setAddingAccount] = React.useState(twitterAccounts[0]? false:true);
    //currentAccount's recent tweets
    //const [recentTweets, setRecentTweets] = React.useState([{value: 'tweet1'},{value: 'tweet2'},{value: 'tweet3'}]);

    let foundAccount = twitterAccounts.find((account) => account.handle === currentAccount);
    if(!foundAccount) foundAccount = twitterAccounts[0];

    return(
        <div className = {styles.AccountPage}>
            <div className = {styles.AccountList} data-simplebar data-simplebar-auto-hide = "false">
                {//if there are accounts, show them
                    twitterAccounts.length > 0 && <div>
                        {
                            twitterAccounts.map((account) => {
                                if(account.handle === currentAccount && !addingAccount){
                                    return(
                                        <div style = {{backgroundColor:"#25303B"}} className = {styles.AccountListItem} onClick = {() => {setCurrentAccount(account.handle); setAddingAccount(false)}}>
                                            @{account.handle}
                                        </div>)
                                }
                                else{
                                    return(
                                        <div className = {styles.AccountListItem} onClick = {() => {setCurrentAccount(account.handle); setAddingAccount(false)}}>
                                            @{account.handle}
                                        </div>)
                                }
                            })
                        }
                        <div className = {styles.AccountListItem} onClick = {() => setAddingAccount(true)}>[+] Add an Account</div>
                    </div>
                }
                {//if there are no accounts
                    twitterAccounts.length === 0 && <div>
                        {
                            'Looks like you have no attached Twitter accounts.'
                        }
                    </div>
                }
            </div>
            <div>
                {//if the currentAccount exists, then show information about the current Twitter account
                    !addingAccount && <div className = {styles.AccountItem}>
                        <div className = {styles.AccountItemHandle}><p>@{foundAccount.handle}</p></div>
                        <div>
                            <div className = {styles.AccountInfo}>
                                <div className = {styles.AccountTweetBox}>
                                    <textarea id = 'tweet_text_area'/><br/>
                                </div>
                                <div className = {styles.AccountTweetButtons}>
                                    <div></div>
                                    <div className = {styles.AccountImageButton}><img styles = {{height:"100%"}}src = {twitterImagesButton}/></div>
                                    <div className = {styles.AccountTweetButton} onClick = {
                                        () => {
                                            let tweet = {id: null, text: document.getElementById('tweet_text_area').value, liked: false, retweeted: false};
                                            console.log('Tweeting...' + tweet.text);
                                            //interface.postTweet(tweet);
                                            twitterAccounts.find(acc => acc.handle === currentAccount).recentTweets.unshift(tweet);
                                            setTwitterAccounts(twitterAccounts);
                                        }
                                    }
                                    ><span>Tweet</span></div>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div style = {{padding: '30px 0px 0px 30px'}}>Recent Tweets</div>
                            <div className = {styles.RecentTweetsList} data-simplebar data-simplebar-auto-hide="false">
                                <div>
                                {
                                    twitterAccounts.find(account => account.handle === currentAccount)?.recentTweets.map((tweet, index) => {
                                        return(
                                            <div className = {styles.RecentTweet}>
                                                {tweet.text}
                                                <div style = {{height: '20px', margin: '8px 0px'}}>
                                                    <img id = {'retweet_' + tweet.id} style = {{height: '100%', cursor: 'pointer'}} src = {tweet.retweeted?twitterRetweetedButton:twitterRetweetButton}/>
                                                    {'  '}
                                                    <img id = {'like_' + tweet.id} style = {{height: '100%', cursor: 'pointer'}} src = {tweet.liked?twitterLikedButton:twitterLikeButton} onClick = {() => {
                                                        console.log(`Liked tweet: ${tweet.id + ' ' + tweet.text}`);
                                                        let img = document.getElementById('like_' + tweet.id);
                                                        console.log(img.src.toString().search('liked'));
                                                        img.src.toString().search('liked' === -1)? (img.src = twitterLikedButton) : (img.src = twitterLikeButton);
                                                        tweet.liked = !tweet.liked;
                                                        //interface.likeTweet(id)
                                                        setTwitterAccounts(twitterAccounts);
                                                    }}/>
                                                </div>
                                            </div>
                                        )                                                                              
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    </div>

                }
                {//if currentAccount does not exist, then show a UI to add an account
                    addingAccount && <div className = {styles.AddingAccount}>
                        <form>
                            Email:
                            <input id = "add_account_email" type = "text"/><br/><br/>
                            Password:
                            <input id = "add_account_password" type = "password"/><br/><br/>
                            <div className = {styles.AddAccount}
                                onClick = {() => {
                                    let twitterEmail = document.getElementById("add_account_email").value;
                                    let twitterPassword = document.getElementById("add_account_password").value;
                                    document.getElementById("add_account_email").value = '';
                                    document.getElementById("add_account_password").value = '';
                                    //addTwitterAccount returns JSON of the account if successfully added account, null otherwise
                                    //if(addTwitterAccount(twitterEmail, twitterPassword)){
                                        setTwitterAccounts(twitterAccounts.push({email: twitterEmail, password: twitterPassword, handle: twitterEmail}))
                                        //setAccounts(accounts);
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