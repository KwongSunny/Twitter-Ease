import * as React from 'react';
import styles from '../stylesheets/App.module.css';
import loginBoxStyles from '../stylesheets/LoginBox.module.css'
import loginBoxUtils from '../utils/LoginBoxUtils';
import backendUtils from '../interface';

function LoginBox(props){
    const loggedIn = false;
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegistering, SetIsRegistering] = React.useState(false);
    const [isIncorrectCredentials, setIsIncorrectCredentials] = React.useState();
  
    let usernameInput;
    let passwordInput;
    let validCredentials = true;

    return(
        <div id = "login_all" className = {loginBoxStyles.LoginAll}>
            {!isLoggedIn && <div id = "opaque_screen" className = {loginBoxStyles.OpaqueScreen}/>}
            <div id = "login_box" className = {loginBoxStyles.LoginBox}>
                {
                    //Login page
                    !isRegistering && <form>
                    <div style = {{fontSize:"20px"}}>Log in</div><br />
                    Username / Email <br />
                    <input type = "text" id = "username_field"/><br /><br />
                    Password <br />
                    <input type = "password" id = "password_field"/><br /><br />
                    <div id = "incorrectCredMsg" style = {{display: "none"}}><span style = {{color: "red"}}>Incorrect username or password, please try again.</span><br /><br /></div>
                    <div id = "loginButton" className = {loginBoxStyles.LoginSubmit}
                        onClick = {
                            async () => {
                                usernameInput = document.getElementById("username_field").value;
                                passwordInput = document.getElementById("password_field").value;
                                //check credentials
                                validCredentials = await backendUtils.checkValidAccount({email:usernameInput, password:passwordInput});
                                console.log(validCredentials);
                                if(validCredentials){
                                    document.getElementById("login_all").style.display = 'none';
                                }
                                else{
                                    document.getElementById("incorrectCredMsg").style.display = "inline";
                                }
                            }
                        }
                        onMouseOver = {() => {
                            setTimeout(function incrementColor(){
                                if(document.getElementById('loginButton').style.backgroundColor !== '#1DA1F2'){
                                    //increment the hex value
                                    //incrementColor();
                                }
                            }, 10)
                        }}
                        // onMouseLeave = {() => {
                        //     console.log('bye');
                        // }}
                        >Log in</div><br /><br />
                        <div className = {loginBoxStyles.LoginOptions}>
                            <div><span style = {{color: "gray"}} onClick = {() => {SetIsRegistering(false)}}>Log In</span><span style = {{color:'darkgray'}}> | </span><span onClick = {() => {SetIsRegistering(true)}}>Register</span></div><br />
                            <div><span>Forgot Password?</span></div>
                        </div>
                    </form>
                }

                {
                    //Register page
                    isRegistering && <form>
                    <div style = {{fontSize:"20px"}}>Register</div><br />
                    Email <br />
                    <input type = "text" id = "username_field"/><br /><br />
                    Password <br />
                    <input type = "password" id = "password_field"/><br /><br />
                    Re-enter your password <br />
                    <input type = "password" id = "password_check_field"/><br /><br />
                    <div id = "incorrectCredMsg" style = {{display: "none"}}><span style = {{color: "red"}}>Your email is invalid, or your passwords do not match up.</span><br /><br /></div>
                    <div id = "loginButton" className = {loginBoxStyles.LoginSubmit}
                        onClick = {
                            async () => {
                                usernameInput = document.getElementById("username_field").value;
                                passwordInput = document.getElementById("password_field").value;
                                //check credentials
                                //validCredentials = await accountsUtil.checkValidAccount(usernameInput, passwordInput);
                                if(validCredentials){
                                    document.getElementById("login_box").style.display = "none";
                                    document.getElementById("opaque_screen").style.display = "none";
                                }
                                else{
                                    document.getElementById("incorrectCredMsg").style.display = "inline";
                                }
                            }
                        }
                        onMouseOver = {() => {
                            setTimeout(function incrementColor(){
                                if(document.getElementById('loginButton').style.backgroundColor !== '#1DA1F2'){
                                    //increment the hex value
                                    //incrementColor();
                                }
                            }, 10)
                        }}
                        onMouseLeave = {() => {
                            console.log('bye');
                        }}
                    >Register</div><br /><br />
                    <div className = {loginBoxStyles.LoginOptions}>
                        <div><span style = {{color: "gray"}} onClick = {() => {SetIsRegistering(false)}}>Log In</span><span style = {{color:'darkgray'}}> | </span><span onClick = {() => {SetIsRegistering(true)}}>Register</span></div><br />
                    </div>
                    </form>
                }
            </div>
        </div>
    );
}
export default LoginBox;