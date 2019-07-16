/**
 * Created by @VanSoftware on 2019-07-12.
 */
import React from 'react';
import PropTypes from "prop-types";

const Emoji = (props) => {
    return (
        <span
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
        {props.symbol}
    </span>);
};

Emoji.propTypes = {
    label : PropTypes.string,
    symbol : PropTypes.string.isRequired
};

export default Emoji;