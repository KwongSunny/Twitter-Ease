import * as React from 'react';
import styles from '../stylesheets/Sidebar.module.css';
import interfaceUtils from '../interface';

import homeImg from '../images/home_button.png';
import retweeterImg from '../images/retweeter_button.png';
import schedulerImg from '../images/scheduler_button.png';
import deleterImg from '../images/deleter_button.png';
import logoutImg from '../images/logout_button.png';

function Sidebar(props){

    const currentPage = props.page.currentPage.toLowerCase();
    const setCurrentPage = props.page.setCurrentPage;
    const setLoggedIn = props.setLoggedIn;
    console.log(currentPage);

    return(
        <div className = {styles.Sidebar}>
            <div style = {(currentPage === 'home')?{background: 'rgba(255, 255, 255, 0.3)'}:{background: ''}} className = {styles.SidebarSection} onClick = {() => {setCurrentPage('home')}}>
                <img src = {homeImg}/>
            </div>
            <div style = {(currentPage === 'retweeter')?{background: 'rgba(255, 255, 255, 0.3)'}:{background: ''}} className = {styles.SidebarSection} onClick = {() => {setCurrentPage('retweeter')}}>
                <img src = {retweeterImg}/>
            </div>
            <div style = {(currentPage === 'scheduler')?{background: 'rgba(255, 255, 255, 0.3)'}:{background: ''}} className = {styles.SidebarSection} onClick = {() => {setCurrentPage('scheduler')}}>
                <img src = {schedulerImg}/>
            </div>
            <div style = {(currentPage === 'deleter')?{background: 'rgba(255, 255, 255, 0.3)'}:{background: ''}} className = {styles.SidebarSection} onClick = {() => {setCurrentPage('deleter')}}>
                <img src = {deleterImg}/>
            </div>
            <div className = {styles.LogoutButton}>
                <img src = {logoutImg} onClick = {() => {interfaceUtils.logout(); setLoggedIn(false)}}/>
            </div>
        </div>
    )

}

export default Sidebar;