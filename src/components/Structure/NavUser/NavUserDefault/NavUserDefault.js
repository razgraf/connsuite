/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component, } from 'react';
import styles from './../NavUser.module.scss';
import {withRouter} from 'react-router-dom';
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import Icon from "../../../Common/Icon/Icon";
import {compose} from "redux";
import {connect} from "react-redux";
import cx from 'classnames'


class NavUserDefault extends Component{

    render(){


       let page = Config.getPageByPath(this.props.location.pathname);
       let withReturn = !Helper.isEmpty(page) && !Helper.isEmpty(page.depth) && page.depth  > 1;
       let routeBack = !Helper.isEmpty(page)  && !Helper.isEmpty(page.routeBack) ? page.routeBack : Config.ROUTE_PAGE_DASHBOARD;


        let onBackClick = ()=>{ this.props.history.push(routeBack)};

        if(this.props.reduxHistory.length > 0 && withReturn){
            let h = [...this.props.reduxHistory];
            while(h.length > 0 && h[h.length - 1 ] === this.props.location.pathname) h.pop();

            if(h.length > 0){
                onBackClick = ()=>{
                    this.props.history.push(h[h.length - 1]);
                    h.pop();
                    this.props.updateHistory(h);
                }
            }

        }


        return(
            <nav className={cx(styles.NavUser, styles.NavUserDefault)}>
                <div className={styles.container}>
                    <div onClick={onBackClick}  className={styles.logo} data-back={withReturn}>
                        <Icon image className={styles.default} source={require("../../../../assets/images/logo.png")} alt={""} />
                        {
                            withReturn
                                ? <Icon icon className={styles.back} source={"arrow_back"} alt={"Back"} />
                                : null
                        }
                    </div>

                    <div className={styles.content}>
                        {
                            withReturn
                                ? <div className={styles.title}>
                                    <Icon icon round className={styles.icon} source={"keyboard_arrow_right"} />
                                    <p>{page.title}</p>
                                </div>
                                : null
                        }
                    </div>

                    <div className={styles.account}>
                        <div className={styles.container}>
                            <div className={styles.image}>
                                <img alt={""} src={this.props.self.image.source}/>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.label}>
                                    <p>ConnSuite</p>
                                </div>
                                <div className={styles.name}>
                                    <p>{this.props.self.name}</p>
                                </div>
                            </div>
                            <div className={styles.action}>
                                <div className={styles.toggleIcon}>
                                    <i className={"material-icons"}>keyboard_arrow_down</i>
                                </div>
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
            reduxHistory : reduxState.view.navigator.history
        }
    },
    (dispatch) => {
        return {
            onClose : ()=>{ console.log("Cover closing"); return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) },
            updateHistory : (history) => {return dispatch({type : Config.REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY, payload : {history : history}})},

        }
    }) )(NavUserDefault);
