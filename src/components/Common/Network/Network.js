/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './Network.module.scss';
import {Helper} from "../../../config/Util";
import Icon from "../Icon/Icon";
import {Button, ButtonType} from "../Button/Button";
import {connect} from "react-redux";
import Config from "../../../config/Config";
import NetworkModel from "../../../model/NetworkModel";
import PropTypes from "prop-types";




class Network extends Component{

    static propTypes ={
        network: PropTypes.instanceOf(NetworkModel)
    };


    render() {
        return(
            <div className={styles.Network}>
                <div className={styles.container}>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.indicator}>
                                <div/>
                            </div>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.icon}>
                                <img alt={this.props.network.title} src={this.props.network.icon.source} />
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <p>Get Details</p>
                        </div>
                    </div>
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.actions}>
                                <div className={styles.link}>
                                    <Icon icon source={"link"} className={styles.icon}/>
                                    <p>Visit this network</p>
                                </div>

                                <Button
                                    custom={{
                                        style : styles,
                                        className : "view"
                                    }}
                                    title={"Get Details"}
                                    type={ButtonType.DEFAULT}
                                    onClick={(e)=>{ this.props.onViewNetworkClick(this.props.network)}}
                                />
                            </div>
                        </div>


                    </div>
                </div>



                <div className={styles.info}>
                    <div className={styles.title}><p>{this.props.network.title}</p></div>
                    {
                        !Helper.isEmpty(this.props.network.username) ?
                            <div className={styles.description}><p>{this.props.network.username}</p></div> : null
                    }
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