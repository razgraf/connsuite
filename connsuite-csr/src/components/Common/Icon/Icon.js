/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React from 'react';
import {Helper} from "../../../config/Util";
import PropTypes from "prop-types";
import Emoji from "../Emoji/Emoji";

const Icon = (props) => {

    const className =  Helper.isEmpty(props.className) ? "icon image" : props.className;
    const source = !Helper.isEmpty(props.source) ? props.source : props.placeholder;

    let element = <span>Icon-less</span>;

    if(props.hasOwnProperty("image")) element = <img  nopin="nopin" alt={props.alt} src={source}/>;
    else if(props.hasOwnProperty("icon")) element =  <i className={props.round ? "material-icons-round" : props.outline ? "material-icons-outlined" :  "material-icons"}>{props.source}</i>;
    else if(props.hasOwnProperty("emoji")) element =  <Emoji symbol={source} label={props.alt} />;

    return(
        <div title={props.title} className={className} onClick={props.onClick}>
            {element}
        </div>
    )
};

Icon.propTypes = {
    icon : PropTypes.any,
    image : PropTypes.any,
    source : PropTypes.any,
    className : PropTypes.string,
    alt : PropTypes.string,
    round : PropTypes.any,
    outline : PropTypes.any,
    placeholder : PropTypes.string,
    title : PropTypes.string,


    onClick : PropTypes.func
};

Icon.defaultProps = {
    alt : "",
    placeholder : require("../../../assets/images/networks/normal/icon_default.png"),
    onClick : ()=>{}
};

export default Icon;