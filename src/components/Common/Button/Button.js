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

    static CUSTOM_MINI = 'custom_mini';
    static CUSTOM_MINI_DEFAULT = 'custom_mini_default';
    static CUSTOM_MINI_OUTLINE = 'custom_mini_outline';

    static WHITE_DEFAULT = 'white_default';
    static WHITE_OUTLINE = 'white_outline';
    static WHITE_GLOW = 'white_glow';
}

class Button extends Component{

    static propTypes ={
        title :  PropTypes.string.isRequired,
        type : PropTypes.string.isRequired,
        icon : PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onClick : PropTypes.func.isRequired,
        custom : PropTypes.shape({
            style : PropTypes.object,
            className : PropTypes.string,
        }),
        mini : PropTypes.bool,
        active : PropTypes.bool
    };

    static defaultProps = {
        mini : false,
        active: true,
    };


    render() {
        let buttonClass = styles.Button;
        let containerClass = styles.container;
        let iconClass = styles.icon;
        let labelClass = styles.label;

        if(!Helper.isEmpty(this.props.custom) && !Helper.isEmpty(this.props.custom.style)){
            buttonClass = Helper.dynamicClass(styles, this.props.custom.style, "Button", this.props.custom.className);
            containerClass =  Helper.dynamicClass(styles, this.props.custom.style, "container");
            iconClass = Helper.dynamicClass(styles, this.props.custom.style, "icon");
            labelClass = Helper.dynamicClass(styles, this.props.custom.style, "label");

        }


        return(
            <div
                onClick={(e)=>{this.props.onClick(e)}}
                className={buttonClass}
                data-mini={this.props.mini}
                data-active={this.props.active}
                data-style={!Helper.isEmpty(this.props.type) ? this.props.type : ButtonType.DEFAULT}

            >
                <div className={containerClass}>
                    {Helper.isEmpty(this.props.icon)
                        ? null
                        : ( typeof this.props.icon === 'string'
                            ? <Icon icon className={iconClass} source={this.props.icon}/>
                            : this.props.icon
                            )}
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