/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React, {Component} from 'react';
import styles from './NetworkMini.module.scss';
import PropTypes from "prop-types";
import Icon from "../../Icon/Icon";
import NetworkModel from "../../../../model/NetworkModel";
import {Helper} from "../../../../config/Util";


class NetworkMini extends Component{

    static propTypes ={
        network: PropTypes.shape(NetworkModel.propTypes),
        onClick : PropTypes.func,
        style : PropTypes.object,
        css : PropTypes.shape({
            size : PropTypes.string
        }),
        active : PropTypes.bool,
        title : PropTypes.string,
    };

    static defaultProps = {
        network : NetworkModel.defaultProps,
        onClick : ()=> {}
    };

    render() {
        let viewonly = this.props.hasOwnProperty("viewonly");
        let css = this.props.hasOwnProperty("css") ? this.props.css : {};
        return (
            <div title={Helper.isEmpty(this.props.title) ? this.props.network.title : this.props.title} style={css} className={Helper.dynamicClass(styles, this.props.style, "NetworkMini")} data-active={this.props.active} data-viewonly={viewonly} onClick={()=>{if(!viewonly) this.props.onClick()}}>
                <div className={Helper.dynamicClass(styles, this.props.style, "container")}>
                    <div className={Helper.dynamicClass(styles, this.props.style, "content")}>
                        <Icon className={Helper.dynamicClass(styles, this.props.style, "icon")}
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



export default NetworkMini;