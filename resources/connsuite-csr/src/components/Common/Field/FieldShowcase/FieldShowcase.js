/**
 * Created by @VanSoftware on 2019-07-16.
 */

import React, {Component} from 'react';
import styles from './FieldShowcase.module.scss'
import FieldLabel from '../FieldLabel/FieldLabel';
import PropTypes from "prop-types";


class FieldShowcase extends Component{

    static GRAY_BACKGROUND = "gray_background";

    static propTypes = {
        columnSpan : PropTypes.number,
        value : PropTypes.string,
        label : PropTypes.shape({
            value  : PropTypes.string.isRequired,
            help :  PropTypes.string,
            warn : PropTypes.bool,
            linkedTo : PropTypes.string,
            styles : PropTypes.object,
            force : PropTypes.oneOf(["left", "right","top","bottom"]),
        }),
        design : PropTypes.oneOf([FieldShowcase.GRAY_BACKGROUND])
    };

    static defaultProps = {
        columnSpan : 1,
        label : {
            styles : styles,
            force : "bottom"
        }
    };

    render() {
        return (
            <div className={styles.FieldShowcase} data-design={this.props.design} style={{gridColumn : "span " + this.props.columnSpan}}>
                <div className={styles.container}>
                    <FieldLabel data={{...this.props.label, styles : styles}}  />
                    <div className={styles.content}>
                        <p>{this.props.value}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FieldShowcase;