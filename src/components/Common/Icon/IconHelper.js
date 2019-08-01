/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React from 'react';
import {Helper} from "../../../config/Util";
import PropTypes from "prop-types";
import Emoji from "../Emoji/Emoji";
import styles from "./IconHelper.module.scss";
import cx from 'classnames';

const IconHelper = (props) => {

    const className = cx( styles.IconHelper, (Helper.isEmpty(props.className) ? ( Helper.isEmpty(props.styles) ?  "icon" : (props.styles["icon"]) ) : props.className));
    const source = !Helper.isEmpty(props.source) ? props.source : props.placeholder;

    let element = null;

    if(props.hasOwnProperty("image")) element = (<img  nopin="nopin" alt={props.alt} src={source}/>);
    if(props.hasOwnProperty("icon")) element = (<i className={props.round ? "material-icons-round" : props.outline ? "material-icons-outlined" :  "material-icons"}>{props.source}</i>);
    if(props.hasOwnProperty("emoji")) element = (<Emoji symbol={source} label={props.alt} />);

    return (
        <div title={props.title} className={className} data-force={props.force}>
            {element}
            {
                !Helper.isEmpty(props.help)
                    ? <div className={Helper.dynamicClass(styles, props.styles, "help")}><p>{props.help}</p></div>
                    : null
            }
        </div>
    )
};

IconHelper.propTypes = {
    icon : PropTypes.any,
    image : PropTypes.any,
    source : PropTypes.any,
    className : PropTypes.string,
    styles: PropTypes.object,
    alt : PropTypes.string,
    round : PropTypes.any,
    outline : PropTypes.any,
    placeholder : PropTypes.string,
    title : PropTypes.string,

    help :  PropTypes.string,
    force : PropTypes.oneOf(["left", "right","top","bottom"]),
};

IconHelper.defaultProps = {
    alt : "",
    placeholder : require("../../../assets/images/networks/normal/icon_default.png")
};

export default IconHelper;