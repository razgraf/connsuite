/**
 * Created by @VanSoftware on 2019-07-14.
 */
import React, {Component} from 'react';
import styles from './FieldLabel.module.scss';
import PropTypes from "prop-types";
import {Helper} from "../../../../config/Util";

class FieldLabel extends Component{


    static propTypes = {
        data : PropTypes.shape({
            value  : PropTypes.string.isRequired,
            help :  PropTypes.string,
            warn : PropTypes.bool,
            linkedTo : PropTypes.string,
            styles : PropTypes.object,
            force : PropTypes.oneOf(["left", "right","top","bottom"]),
        }),
        reference : PropTypes.any
    };

    static defaultProps = {
        data : {
            warn : false
        }
    };


    render() {

        let {data, reference} = this.props;

        return (
            <div ref={reference} className={Helper.dynamicClass(styles, data.styles, "FieldLabel")} data-warn={data.warn} data-force={data.force}>
                <div className={Helper.dynamicClass(styles, data.styles, "label")}><label htmlFor={data.linkedTo}>{data.value}</label></div>
                {
                    !Helper.isEmpty(data.help)
                    ?  <div className={Helper.dynamicClass(styles, data.styles, "help")}>
                            <div className={Helper.dynamicClass(styles, data.styles, "indicator")}><p>?</p></div>
                            <div className={Helper.dynamicClass(styles, data.styles, "content")}><p>{data.help}</p></div>
                        </div>
                    : null
                }
            </div>
        );
    }

}


export default FieldLabel;