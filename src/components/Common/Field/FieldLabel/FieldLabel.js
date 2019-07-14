/**
 * Created by @VanSoftware on 2019-07-14.
 */
import React, {Component} from 'react';
import styles from './FieldLabel.module.scss';
import PropTypes from "prop-types";
import {Helper} from "../../../../config/Util";

class FieldLabel extends Component{


    static propTypes = {
        label  : PropTypes.string.isRequired,
        help :  PropTypes.string,
        warn : PropTypes.bool,
        linkedTo : PropTypes.string,
        styles : PropTypes.object,
        force : PropTypes.oneOf(["left", "right","top","bottom"]),

        reference : PropTypes.any
    };

    static defaultProps = {
        warn : false
    };


    render() {


        return (
            <div ref={this.props.reference} className={Helper.dynamicClass(styles, this.props.styles, "FieldLabel")} data-warn={this.props.warn} data-force={this.props.force}>
                <div className={Helper.dynamicClass(styles, this.props.styles, "label")}><label htmlFor={this.props.linkedTo}>{this.props.label}</label></div>
                {
                    !Helper.isEmpty(this.props.help)
                    ?  <div className={Helper.dynamicClass(styles, this.props.styles, "help")}>
                            <div className={Helper.dynamicClass(styles, this.props.styles, "indicator")}><p>?</p></div>
                            <div className={Helper.dynamicClass(styles, this.props.styles, "content")}><p>{this.props.help}</p></div>
                        </div>
                    : null
                }
            </div>
        );
    }

}


export default FieldLabel;