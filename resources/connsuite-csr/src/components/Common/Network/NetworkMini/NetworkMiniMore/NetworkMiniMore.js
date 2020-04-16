/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React from 'react';
import styles from './NetworkMiniMore.module.scss';
import Icon from "../../../Icon/Icon";
import {Helper} from "../../../../../config/Util";
import PropTypes from "prop-types";
import {HashLink} from 'react-router-hash-link';

const NetworkMiniMore = (props) => {


    let css = props.hasOwnProperty("css") ? props.css : {};

    return (
        <HashLink
            to={props.scrollTo}
            smooth
            style={css}
            title={props.title}
            className={Helper.dynamicClass(styles, props.style, "NetworkMiniMore")}
            onClick={props.onClick}>
            <div className={Helper.dynamicClass(styles, props.style, "container")}>
                <div className={Helper.dynamicClass(styles, props.style, "content")}>
                    <Icon className={Helper.dynamicClass(styles, props.style, "icon")}
                          icon
                          source={"more_horiz"}
                    />
                </div>
            </div>
        </HashLink>
    )
};

NetworkMiniMore.propTypes = {
    onClick : PropTypes.func,
    scrollTo : PropTypes.string,
    css : PropTypes.shape({
        size : PropTypes.string
    }),
    title : PropTypes.string
};
NetworkMiniMore.defaultProps = {
    onClick : ()=>{}
};



export default NetworkMiniMore;