import * as React from 'react'
import sectionbarStyles from '../stylesheets/Sectionbar.module.css'

function Sectionbar(props){
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;
    const sections = props.sections;

    return(
        <div className = {sectionbarStyles.Sectionbar}>
            {
                sections.map((section) => {
                    if(currentPage === section){
                        return(
                            <div style = {{textDecoration: "underline", textUnderlineOffset: "5px"}} onClick = {() => {setCurrentPage(section)}}>
                                {section}
                            </div>
                        );
                    }
                    else{
                        return(
                            <div onClick = {() => {setCurrentPage(section)}}>
                                {section}
                            </div>
                        );
                    }
                })
            }
        </div>
    );

}
export default Sectionbar;