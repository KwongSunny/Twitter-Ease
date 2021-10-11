import * as React from 'react'
import sectionbarStyles from '../stylesheets/Sectionbar.module.css'

function Sectionbar(props){
    const setCurrentPage = props.setCurrentPage;

    const sections = ['Home', 'Tweet Schedules','Manage Accounts'];
    return(
        <div className = {sectionbarStyles.Sectionbar}>
            {
                sections.map((section) => {
                    return(
                        <div>
                            {section}
                        </div>
                    );
                })
            }
        </div>
    );

}
export default Sectionbar;