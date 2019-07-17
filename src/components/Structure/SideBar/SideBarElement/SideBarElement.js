/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBarElement.module.scss';
import {NavLink, withRouter} from "react-router-dom";
import Icon from "../../../Common/Icon/Icon";
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import PropTypes from "prop-types";

class SideBarElement extends Component {

    static propTypes = {
        route : PropTypes.string,
        target : PropTypes.string
    };

    render() {

        let page = Config.getPageByRoute(this.props.route);
        if( Helper.isEmpty(page) || Helper.isEmpty(page.icon) ||  Helper.isEmpty(page.title)) return null;


        return(
            <NavLink className={styles.SideBarElement} activeClassName={styles.active} to={Helper.isEmpty(this.props.target) ? page.route : this.props.target}>
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
            </NavLink>
        )
    }

}
export default withRouter(SideBarElement);