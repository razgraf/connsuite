/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './Network.module.scss';
import Icon from "../Icon/Icon";
import {Button, ButtonType} from "../Button/Button";
import {connect} from "react-redux";
import Config from "../../../config/Config";
import PropTypes from "prop-types";
import {Helper} from "../../../config/Util";
import NetworkModel from "../../../model/NetworkModel";




class Network extends Component{

    static propTypes = {
        network : NetworkModel.propTypes,
        viewonly : PropTypes.bool
    };
    static defaultProps = {
        network : NetworkModel.defaultProps,
    };





    render() {
        let viewonly = this.props.hasOwnProperty("viewonly");

        return(
            <div className={styles.Network} data-viewonly={viewonly}>
                <div className={styles.container}>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.indicator}>
                                <div/>
                            </div>
                        </div>
                        <div className={styles.main}>
                            <Icon className={styles.icon}
                                  image
                                  alt={this.props.network.title}
                                  source={this.props.network.icon.source}
                            />
                        </div>
                        <div className={styles.footer}>
                            <p>{!viewonly ? "Get Details" : "" }</p>
                        </div>
                    </div>
                    {!viewonly
                        ? <div className={styles.overlay}>
                            <div className={styles.content}>
                                <div className={styles.actions}>
                                    <div className={styles.link}>
                                        <Icon icon source={"link"} className={styles.icon}/>
                                        <p>Visit this network</p>
                                    </div>

                                    <Button
                                        custom={{
                                            style: styles,
                                            className: "view"
                                        }}
                                        title={"Get Details"}
                                        type={ButtonType.DEFAULT}
                                        onClick={(e) => {
                                            this.props.onViewNetworkClick(this.props.network)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>


                <div className={styles.info}>
                    <div className={styles.title}><p>{this.props.network.title}</p></div>
                    <div className={styles.description}><p>{this.props.network.username}</p></div>
                </div>
            </div>
        )
    }


}

export default connect(
    null,
    (dispatch) => {
        return{
            onViewNetworkClick : (network) => {return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE, payload : {network : network}})}
        }
    }

)(Network);