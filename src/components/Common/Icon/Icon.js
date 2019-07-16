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

    if(props.hasOwnProperty("image")) return <div title={props.title} className={className}><img  nopin="nopin" alt={props.alt} src={source}/></div>;
    if(props.hasOwnProperty("icon")) return <div title={props.title} className={className}><i className={props.round ? "material-icons-round" : props.outline ? "material-icons-outlined" :  "material-icons"}>{props.source}</i></div>;
    if(props.hasOwnProperty("icon")) return <div title={props.title} className={className}><Emoji symbol={source} label={props.alt} /></div>;

    return <div className={className}><span>Icon-less</span></div>
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
};

Icon.defaultProps = {
    alt : "",
    placeholder : require("../../../assets/images/networks/normal/icon_default.png")
};

export default Icon;