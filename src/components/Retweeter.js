import * as React from 'react';
import styles from '../stylesheets/Retweeter.module.css';


function Retweeter(props){
    const twitterAccounts = props.twitterAccounts;
    const retweetList = props.retweetList;
    const setRetweetList = props.setRetweetList;
    const currentRetweetName = props.currentRetweetName;
    const setCurrentRetweetName = props.setCurrentRetweetName;
    const currentRetweet = (currentRetweetName !== '')? retweetList.find(retweet => retweet.name === currentRetweetName):
    {
        name: '',
        keywords: '',
        filter: '',
        accounts: []
    }

    return(
        <div className = {styles.RetweetPage}>
            <div className = {styles.AccountList} data-simplebar data-simplebar-auto-hide = "false">
                {//if there are accounts, show them
                    retweetList.length > 0 && <div>
                        {
                            retweetList.map((retweet) => {
                                if(retweet.name === currentRetweetName){
                                    return(
                                        <div style = {{backgroundColor:"#25303B"}} className = {styles.AccountListItem} onClick = {() => {setCurrentRetweetName(retweet.name)}}>
                                            {retweet.name}
                                        </div>)
                                }
                                else{
                                    return(
                                        <div className = {styles.AccountListItem} onClick = {() => {setCurrentRetweetName(retweet.name)}}>
                                            {retweet.name}
                                        </div>)
                                }
                            })
                        }
                        <div className = {styles.AccountListItem} onClick = {() => {setCurrentRetweetName('')}}>[+] Add a Scheduled Tweet</div>
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
                {//show retweet
                    currentRetweetName !== '' && <div className = {styles.AddingRetweet}>
                    <div style = {{margin: '10px 0px'}}>Retweeter Name</div>
                    <textarea id = 'NewRetweetName' className = {styles.ReweetNameInput} defaultValue = {currentRetweet.name} key = {currentRetweetName + 'Name'}/><br/>
                    <div style = {{margin: '10px 0px'}}>What terms would you like this account to retweet?<br/>(Separate each word, term, or phrase with a comma)</div>
                    <textarea id = 'NewRetweetKeywords' className = {styles.RetweetTextInput} defaultValue = {currentRetweet.keywords} key = {currentRetweetName + 'Keywords'}/><br />
                    <div style = {{margin: '10px 0px'}}>What terms would you like to exclude?<br/>(Separate each word, term, or phrase with a comma)</div>
                    <textarea id = 'NewRetweetFilter' className = {styles.RetweetTextInput} defaultValue = {currentRetweet.filter} key = {currentRetweetName + 'Filter'}/><br />
                    <div style = {{margin: '10px 0px'}}>Applicable Twitter Accounts</div>
                    <div className = {styles.TwitterAccountList}>
                        {
                            twitterAccounts.map((account) => {
                                return(
                                    <div id = {account.handle + 'ListItem'} className = {styles.TwitterAccountListItem} onClick = {() => {
                                        //adds the current account to list of accounts tied to the current schedule
                                        let index = currentRetweet.accounts.indexOf(account.handle);
                                        if(index === -1)
                                            currentRetweet.accounts.push(account.handle);
                                        else
                                            currentRetweet.accounts.splice(index, 1);
                                        //change the color, MUST COME AFTER THE PREVIOUS segment
                                        let element = document.getElementById(account.handle + 'ListItem');
                                        if(currentRetweet.accounts.find(accountHandle => accountHandle === account.handle)){
                                            element.style.backgroundColor = '#35404B';
                                            element.style.color = 'white';
                                        }
                                        else{
                                            element.style.backgroundColor = 'unset';
                                            element.style.color = 'lightgray';
                                        }
                                    }}>
                                        {account.handle}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style = {{marginTop:'20px'}}><span className = {styles.AddRetweetButton} key = {currentRetweetName + 'AddButton'}
                    onClick = {() => {
                        currentRetweet.name = document.getElementById('NewRetweetName').value;
                        currentRetweet.keywords = document.getElementById('NewRetweetKeywords').value;
                        currentRetweet.filter = document.getElementById('NewRetweetFilter').value;
                        
                        //check if empty inputs

                        if(retweetList.find(retweet => retweet.name === currentRetweet.name)) return;

                        let newList = retweetList;
                        newList.find(retweet => retweet.name === currentRetweetName);
                        setRetweetList(newList);
                        console.log(retweetList);
                    }}
                    >Apply</span></div>
                </div>
                }
                {//add retweet
                    currentRetweetName === '' && <div className = {styles.AddingRetweet}>
                        <div style = {{margin: '10px 0px'}}>Retweeter Name</div>
                        <textarea id = 'NewRetweetName' className = {styles.ReweetNameInput}/><br/>
                        <div style = {{margin: '10px 0px'}}>What terms would you like this account to retweet?<br/>(Separate each word, term, or phrase with a comma)</div>
                        <textarea id = 'NewRetweetKeywords' className = {styles.RetweetTextInput}/><br />
                        <div style = {{margin: '10px 0px'}}>What terms would you like to exclude?<br/>(Separate each word, term, or phrase with a comma)</div>
                        <textarea id = 'NewRetweetFilter' className = {styles.RetweetTextInput}/><br />
                        <div style = {{margin: '10px 0px'}}>Applicable Twitter Accounts</div>
                        <div className = {styles.TwitterAccountList}>
                            {
                                twitterAccounts.map((account) => {
                                    return(
                                        <div id = {account.handle + 'ListItem'} className = {styles.TwitterAccountListItem} onClick = {() => {
                                            //adds the current account to list of accounts tied to the current schedule
                                            let index = currentRetweet.accounts.indexOf(account.handle);
                                            if(index === -1)
                                                currentRetweet.accounts.push(account.handle);
                                            else
                                                currentRetweet.accounts.splice(index, 1);
                                            //change the color, MUST COME AFTER THE PREVIOUS segment
                                            let element = document.getElementById(account.handle + 'ListItem');
                                            if(currentRetweet.accounts.find(accountHandle => accountHandle === account.handle)){
                                                element.style.backgroundColor = '#35404B';
                                                element.style.color = 'white';
                                            }
                                            else{
                                                element.style.backgroundColor = 'unset';
                                                element.style.color = 'lightgray';
                                            }
                                        }}>
                                            {account.handle}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style = {{marginTop:'20px'}}><span className = {styles.AddRetweetButton} key = {currentRetweetName + 'AddButton'}
                        onClick = {() => {
                            currentRetweet.name = document.getElementById('NewRetweetName').value;
                            currentRetweet.keywords = document.getElementById('NewRetweetKeywords').value;
                            currentRetweet.filter = document.getElementById('NewRetweetFilter').value;
                            
                            //check if empty inputs

                            if(retweetList.find(retweet => retweet.name === currentRetweet.name)) return;

                            let newList = retweetList;
                            newList.push(currentRetweet);
                            setRetweetList(newList);
                            console.log(retweetList);
                        }}
                        >Add</span></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Retweeter;