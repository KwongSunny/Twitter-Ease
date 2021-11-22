import * as React from 'react';
import interfaceUtil from '../interface';

function Deleter(props){

    return(
        <div>
            <div onClick = {() => {
                interfaceUtil.mass_deletion();
                interfaceUtil.unretweet();
            }}>
                <span>Delete</span>
            </div>
        </div>
    )
}

export default Deleter;