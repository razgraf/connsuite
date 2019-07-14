/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React, {Component} from 'react';
import styles from './BusinessBook.module.scss';
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import SideBar from "../../Structure/SideBar/SideBar";

class BusinessBook extends Component{
    render() {
        return (
            <div className={cx(styles.Page, styles.BusinessBook)}>
                <Overlay/>
                <Cover/>
                <div className={styles.container}>
                    <SideBar/>
                </div>
            </div>
        );
    }
}

export default BusinessBook;