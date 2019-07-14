/**
 * Created by @VanSoftware on 2019-07-12.
 */
import React from 'react';

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

export default Emoji;