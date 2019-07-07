/**
 * Created by @VanSoftware on 2019-07-05.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss'
import Icon from "../Icon/Icon";
import {Helper} from "../../../config/Util";
import cx from 'classnames';

class ButtonType{
    static DEFAULT = 'default';
    static OUTLINE = 'outline';
    static MINI_DEFAULT = 'mini_default';
    static MINI_OUTLINE = 'mini_outline';
    static GLOW = 'glow';

    static CUSTOM_DEFAULT = 'custom_default';
    static CUSTOM_OUTLINE = 'custom_outline';


    static WHITE_DEFAULT = 'white_default';
    static WHITE_OUTLINE = 'white_outline';
    static WHITE_GLOW = 'white_glow';
}

class Button extends Component{

    static propTypes ={
        title :  PropTypes.string.isRequired,
        type : PropTypes.string.isRequired,
        icon : PropTypes.string,
        onClick : PropTypes.func.isRequired,
        custom : PropTypes.shape({
            style : PropTypes.object,
            className : PropTypes.string,
        })
    };


    render() {
        let buttonClass = styles.Button;
        let containerClass = styles.container;
        let iconClass = styles.icon;
        let labelClass = styles.label;

        if(!Helper.isEmpty(this.props.custom) && !Helper.isEmpty(this.props.custom.style)){
            buttonClass = cx(buttonClass, this.props.custom.style[this.props.custom.className]);
            containerClass = cx(containerClass, this.props.custom.style["container"]);
            if(!Helper.isEmpty(this.props.icon)) iconClass = cx(iconClass, this.props.custom.style["icon"]);
            labelClass = cx(labelClass, this.props.custom.style["label"]);
        }

        return(
            <div onClick={(e)=>{this.props.onClick(e)}} className={buttonClass} data-style={!Helper.isEmpty(this.props.type) ? this.props.type : ButtonType.DEFAULT}>
                <div className={containerClass}>
                    {!Helper.isEmpty(this.props.icon) ? <Icon icon className={iconClass} source={this.props.icon}/> : null}
                    <div className={labelClass}>
                        <p>{this.props.title}</p>
                    </div>
                </div>
            </div>
        )
    }

}

export {
    Button,
    ButtonType
}