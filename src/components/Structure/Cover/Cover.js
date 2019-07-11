/**
 * Created by @VanSoftware on 2019-07-09.
 */

import React, {Component} from 'react';
import styles from './Cover.module.scss'
import {connect} from "react-redux";
import Config from "../../../config/Config";
import OverlayIndividual from "../../Common/Overlay/OverlayIndividual/OverlayIndividual";
import Icon from "../../Common/Icon/Icon";
import Network from "../../Common/Network/Network";
import NetworkModel from "../../../model/NetworkModel";

class Cover extends Component{


    static defaultProps = {
        network : new NetworkModel(null),
    }


    render() {
        return(
            <div className={styles.Cover} data-visible={this.props.visible}>
                <OverlayIndividual visible={this.props.visible} onClose={this.props.onClose} />
                <div className={styles.inner}>
                    <div className={styles.container}>
                        <div className={styles.inner}>
                            <section>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        <p>Network</p>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.container}>
                                        <Icon image source={this.props.network.icon.source} className={styles.icon} />
                                        <div className={styles.main}>
                                            <div className={styles.title}><p>{this.props.network.title}</p></div>
                                            <div className={styles.description}><p>@{this.props.network.username}</p></div>
                                        </div>
                                        <div className={styles.actions}></div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


export default connect(
    (reduxState) => {
        return {
            network : reduxState.model.cover.network,
            visible: reduxState.view.cover.visible
        }
    },
    (dispatch) => {
        return {
            onClose : (callback)=>{ console.log("Cover closing"); return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) }
        }
    })(Cover);