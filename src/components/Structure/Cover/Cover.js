/**
 * Created by @VanSoftware on 2019-07-09.
 */

import React, {PureComponent} from 'react';
import styles from './Cover.module.scss'
import cx from 'classnames';
import {connect} from "react-redux";
import Config from "../../../config/Config";
import OverlayIndividual from "../../Common/Overlay/OverlayIndividual/OverlayIndividual";
import Icon from "../../Common/Icon/Icon";
import Emoji from "../../Common/Emoji/Emoji";
import NetworkModel from "../../../model/NetworkModel";
import {Link, withRouter} from "react-router-dom";
import {compose} from "redux";

class Cover extends PureComponent{


    static defaultProps = {
        network : new NetworkModel(null),
    };

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
                                        <p>Network Details</p>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.container}>
                                        <Icon image source={this.props.network.icon.source} className={styles.icon} />
                                        <div className={styles.main}>
                                            <div className={styles.title}><p>{this.props.network.title}</p></div>
                                            <div className={styles.description}><Icon  icon outline  className={styles.icon} source={"account_circle"} /><p>{this.props.network.username}</p></div>
                                        </div>
                                        <div className={styles.actions}>
                                            <div className={cx(styles.action, styles.statistic)}>
                                                <Icon title={"Network statistics"} icon round source={"multiline_chart"} className={"icon"}/>
                                            </div>
                                            <div className={cx(styles.action, styles.view)}>
                                                <Icon title={"Visit network"} icon round source={"arrow_forward"} className={"icon"}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        <p>Description</p>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.description}>
                                        <p>Hi <Emoji symbol={"👋"}/>! You can also find me on {this.props.network.title}.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className={styles.header}>
                                    <div className={styles.title}>
                                        <p>Actions</p>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.actions}>
                                        <div className={styles.action}>
                                            <Icon icon round className={styles.icon} source={"share"} />
                                            <div className={styles.title}><p>Share:  <span className={styles.share}>connsuite.com/razgraf/{this.props.network.identifier}</span></p></div>
                                        </div>
                                        <div onClick={()=> {
                                            this.props.onLeave();
                                            this.props.updateHistory([...this.props.reduxHistory, this.props.location.pathname]);
                                            this.props.history.push( Config.ROUTE_PAGE_NETWORK_EDIT_CLEAN + this.props.network.AID);

                                        }} className={styles.action}>
                                            <Icon icon round className={styles.icon} source={"edit"} />
                                            <div className={styles.title}><p>Edit network</p></div>
                                        </div>
                                        <div className={styles.action}>
                                            <Icon icon round className={styles.icon} source={"remove_circle_outline"} />
                                            <div className={styles.title}><p>Remove network</p></div>
                                        </div>
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


export default compose(withRouter, connect(
    (reduxState) => {
        return {
            network : reduxState.model.cover.network,
            visible: reduxState.view.cover.visible,
            reduxHistory : reduxState.view.navigator.history,
        }
    },
    (dispatch) => {
        return {
            onLeave : ()=>{ return dispatch({type : Config.REDUX_ACTION_VIEW_COVER_TOGGLE, payload: { visible : "fixed" }  }) },
            onClose : ()=>{  return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) },
            updateHistory : (history) => {return dispatch({type : Config.REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY, payload : {history : history}})},
        }
    }))(Cover);