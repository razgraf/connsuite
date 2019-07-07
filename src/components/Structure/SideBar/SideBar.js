/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBar.module.scss';
import SideBarElement from "./SideBarElement/SideBarElement";

class SideBar extends Component {

    render() {
        return(
            <div className={styles.SideBar}>
                <div className={styles.container}>
                    <SideBarElement icon={"home"} />
                    <SideBarElement icon={"whatshot"} />
                </div>
            </div>
        )
    }

}
export default SideBar;