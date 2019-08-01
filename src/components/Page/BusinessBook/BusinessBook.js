/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React from 'react';
import styles from './BusinessBook.module.scss';
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import SideBar from "../../Structure/SideBar/SideBar";
import Footer from "../../Structure/Footer/Footer";
import BasePage from "../BasePage";


class BusinessBook extends BasePage{
    componentDidMount() {
        super.componentDidMount();
    }

    render() {
        return (
            <div className={cx(styles.Page, styles.BusinessBook)}>
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

export default BusinessBook;