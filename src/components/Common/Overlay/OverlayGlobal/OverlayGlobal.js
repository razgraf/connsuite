/**
 * Created by @VanSoftware on 2019-07-09.
 */


import React, {Component} from 'react';
import styles from './OverlayGlobal.module.scss'
import {connect} from 'react-redux'
import Config from "../../../../config/Config";

class OverlayGlobal extends Component{

    render() {
        return(
            <div className={styles.Overlay} data-visible={this.props.visible}>
                <div className={styles.container} onClick={this.props.onClose} />
            </div>
        )
    }

}



export default connect(
    (reduxState) => {
        return {
            visible: reduxState.view.overlay.visible
        }
    },
    (dispatch) => {
            return {
                onClose : ()=>{return dispatch({type : Config.REDUX_ACTION_VIEW_OVERLAY_CLOSE, payload: { visible : false }  }) }
            }
    })(OverlayGlobal);