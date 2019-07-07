/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React from 'react';
import {Helper} from "../../../config/Util";

const Icon = (props) => {

    const className =  Helper.isEmpty(props.className) ? "icon image" : props.className;

    if(props.hasOwnProperty("image")) return <div className={className}><img src={props.source}/></div>;
    if(props.hasOwnProperty("icon")) return <div className={className}><i className={"material-icons"}>{props.source}</i></div>;

    return <div className={className}><span>Icon-less</span></div>
};

export default Icon;