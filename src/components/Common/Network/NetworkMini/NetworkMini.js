/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React, {Component} from 'react';
import styles from './NetworkMini.module.scss';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Icon from "../../Icon/Icon";
import NetworkModel from "../../../../model/NetworkModel";


class NetworkMini extends Component{

    static propTypes ={
        network: NetworkModel.propTypes,
        onClick : PropTypes.func,
        style : PropTypes.shape({
            size : PropTypes.string
        }),
        active : PropTypes.bool
    };

    static defaultProps = {
        network : NetworkModel.defaultProps,
        onClick : ()=> {}
    };

    render() {
        let viewonly = this.props.hasOwnProperty("viewonly");
        let style = this.props.hasOwnProperty("style") ? this.props.style : {};
        return (
            <div style={style} className={styles.NetworkMini} data-active={this.props.active} data-viewonly={viewonly} onClick={()=>{if(!viewonly) this.props.onClick()}}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Icon className={styles.icon}
                              image
                              alt={this.props.network.title}
                              source={this.props.network.icon.source}
                        />
                    </div>
                </div>
            </div>
        )
    }
}



export default connect(
    null,
    (dispatch) => {
        return{}
    }

)(NetworkMini);