/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React, {Component} from 'react';
import styles from './Statistics.module.scss';
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import SideBar from "../../Structure/SideBar/SideBar";
import Footer from "../../Structure/Footer/Footer";


class Statistics extends Component{
    render() {
        return (

                <div className={cx(styles.Page, styles.Statistics)}>
                    <Overlay/>
                    <Cover/>
                    <div className={styles.container}>
                        <SideBar/>
                    </div>
                    <Footer/>
                </div>


        );
    }
}

export default Statistics;