/**
 * Created by @VanSoftware on 2019-07-04.
 */

import React from 'react';
import styles from './Dashboard.module.scss';
import cx from 'classnames';
import SideBar from "../../Structure/SideBar/SideBar";
import Cover from "../../Structure/Cover/Cover";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Config from "../../../config/Config";
import FooterMini from "../../Structure/Footer/FooterMini/FooterMini";
import BasePage from "../BasePage";



class Dashboard extends BasePage{

    state = {
        networks : Config.DUMMY_NETWORKS


    };

    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return(
                <div className={cx(styles.Page, styles.Dashboard)}>
                    <Overlay/>
                    <Cover/>
                    <div className={styles.container}>
                        <SideBar/>
                        <div className={styles.content}>


                        </div>
                    </div>
                    <FooterMini/>
                </div>
        )
    }


}

export default Dashboard;