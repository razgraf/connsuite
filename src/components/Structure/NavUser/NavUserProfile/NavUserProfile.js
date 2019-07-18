/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './../NavUser.module.scss';
import {Link, withRouter} from 'react-router-dom';
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import Icon from "../../../Common/Icon/Icon";
import {compose} from "redux";
import {connect} from "react-redux";
import cx from 'classnames'
import NetworkMini from "../../../Common/Network/NetworkMini/NetworkMini";


class NavUserProfile extends Component{


    constructor(props) {
        super(props);
        this.state = {scrollY : window.scrollY};
    }


    componentDidMount() {
        window.addEventListener("scroll",this.watchScrollNav)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScrollNav);
    }

    watchScrollNav = (event) => { this.setState({scrollY : window.scrollY})};


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            JSON.stringify(this.props.self) !== JSON.stringify(nextProps.self) ||
            JSON.stringify(this.props.active) !== JSON.stringify(nextProps.active) ||
            (this.state.scrollY === 0 && nextState.scrollY !== 0) ||
            (this.state.scrollY !== 0 && nextState.scrollY === 0)
        )

    }

    render(){


       let page = Config.getPageByPath(this.props.location.pathname);
       let withName = !Helper.isEmpty(page) && !Helper.isEmpty(page.depth) && page.depth  > 1;
       let routeBack = !Helper.isEmpty(page)  && !Helper.isEmpty(page.routeBack) ? page.routeBack : Config.ROUTE_PAGE_DASHBOARD;

       console.log("render");

        return(
            <nav className={cx(styles.NavUser, styles.NavUserProfile)} data-top={this.state.scrollY === 0}>
                <div className={styles.container}>
                    <Link to={routeBack} className={styles.logo} data-back={withName}>
                        <Icon image className={styles.default} source={require("../../../../assets/images/logo.png")} alt={""} />
                        {
                            withName
                                ? <Icon icon className={styles.back} source={"arrow_back"} alt={"Back"} />
                                : null
                        }
                    </Link>

                    <div className={styles.content}>
                        <div className={styles.steps}></div>
                        <div className={styles.networks}>
                            <div className={styles.list}>
                                {this.props.active.networks.map((element,index)=>
                                    <NetworkMini
                                        key={index}
                                        style={styles}
                                        network={element}
                                        onClick={()=>{this.props.onViewNetworkClick(element)}}
                                    />)}
                            </div>
                        </div>
                    </div>


                </div>
            </nav>
        )
    }
}

export default compose( withRouter, connect(
    (reduxState) => {
        return {
            self : reduxState.model.user.self,
            active : reduxState.model.user.active,
        }
    },
    (dispatch) => {
        return {
            onViewNetworkClick : (network) => {return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE, payload : {network : network}})},
            onClose : (callback)=>{ console.log("Cover closing"); return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) }
        }
    }) )(NavUserProfile);
