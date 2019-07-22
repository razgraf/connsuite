/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBar.module.scss';
import SideBarElement from "./SideBarElement/SideBarElement";
import Config from "../../../config/Config";

class SideBar extends Component {

    render() {
        return(
            <div className={styles.SideBar}>
                <div className={styles.container}>
                    <SideBarElement route={Config.ROUTE_PAGE_DASHBOARD} />
                    <SideBarElement route={Config.ROUTE_PAGE_PORTFOLIO}  />
                    <SideBarElement route={Config.ROUTE_PAGE_BUSINESS_BOOK}  />
                    <SideBarElement route={Config.ROUTE_PAGE_STATISTICS} />
                    <div className={styles.divider}/>
                    <SideBarElement
                        route={Config.ROUTE_PAGE_PROFILE}
                        target={Config.ROUTE_PAGE_PROFILE_CLEAN + Config.DUMMY_USERS.self.username.main}
                    />
                </div>
            </div>
        )
    }

}
export default SideBar;