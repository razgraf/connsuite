/**
 * Created by @VanSoftware on 2019-07-05.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss'
import Icon from "../Icon/Icon";
import {Helper} from "../../../config/Util";


class ButtonType{
    static DEFAULT = 'default';
    static OUTLINE = 'outline';
    static SIMPLE = 'simple';
    static GLOW = 'glow';
    static MINI = 'mini';

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
        active : PropTypes.bool,
        forbidden : PropTypes.bool,

        htmlTitle : PropTypes.string,
        reference : PropTypes.object
    };

    static defaultProps = {
        mini : false,
        active: true,
        forbidden: false,
        htmlTitle: ""
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
                ref={this.props.reference}
                onClick={(e)=>{this.props.onClick(e)}}
                className={buttonClass}
                data-mini={this.props.mini}
                data-active={this.props.active}
                data-forbidden={this.props.forbidden}
                data-style={!Helper.isEmpty(this.props.type) ? this.props.type : ButtonType.DEFAULT}
                title={this.props.htmlTitle}

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