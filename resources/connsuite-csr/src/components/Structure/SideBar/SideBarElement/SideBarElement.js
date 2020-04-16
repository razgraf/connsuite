/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBarElement.module.scss';
import {Link, withRouter} from "react-router-dom";
import Icon from "../../../Common/Icon/Icon";
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import cx from 'classnames';

class SideBarElement extends Component {

    static propTypes = {
        route : PropTypes.string,
        target : PropTypes.string
    };

    render() {

        let page = Config.getPageByRoute(this.props.route);
        if( Helper.isEmpty(page) || Helper.isEmpty(page.icon) ||  Helper.isEmpty(page.title)) return null;

        let className = styles.SideBarElement;
        let target = Helper.isEmpty(this.props.target) ? page.route : this.props.target;
        if(target === this.props.location.pathname) className = cx(className, styles.active);

        return(
            <Link
                className={className}
                to={target}
                onClick={(event)=> {
                    if(page.route === Config.ROUTE_PAGE_PROFILE) this.props.updateHistory([...this.props.reduxHistory, this.props.location.pathname]);
                }}
            >
                <div className={styles.inner}>
                    <div className={styles.container}>
                        <Icon icon round className={styles.icon} source={page.icon}/>
                    </div>
                    <div className={styles.tooltip}>
                        <div className={styles.container}>
                            <p>{page.title}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

}
export default compose( withRouter, connect(
    (reduxState) => {
        return {
            reduxHistory : reduxState.view.navigator.history,
        }
    },
    (dispatch) => {
        return {
            updateHistory : (history) => {return dispatch({type : Config.REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY, payload : {history : history}})},
        }
    }) )(SideBarElement);