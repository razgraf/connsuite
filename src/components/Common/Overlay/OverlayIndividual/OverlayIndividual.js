/**
 * Created by @VanSoftware on 2019-07-09.
 */

import React, {Component} from 'react';
import styles from './OverlayIndividual.module.scss'
import PropTypes from "prop-types";
import {Helper} from "../../../../config/Util";

class OverlayIndividual extends Component{


    static propTypes ={
        zIndex : PropTypes.number, /** Usually, the zIndex will be defined in the parent component's CSS, using data-alias */
        visible : PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
        onClose : PropTypes.func
    };

    static defaultProps = {
        onClose : ()=>{}
    };


    render() {

        let style = !Helper.isEmpty(this.props.zIndex) ? {zIndex : this.props.zIndex} : {};

        return(
            <div style={style} className={styles.Overlay} data-alias={"Overlay"} data-visible={this.props.visible}>
                <div className={styles.container} onClick={this.props.onClose} />
            </div>
        )
    }

}



export default OverlayIndividual;