/**
 * Created by @VanSoftware on 2019-07-04.
 */

import React, {Component} from 'react';
import styles from './Dashboard.module.scss';
import cx from 'classnames';
import SideBar from "../../Structure/SideBar/SideBar";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";
import {ButtonType} from "../../Common/Button/Button";
import Network from "../../Common/Network/Network";

class Dashboard extends Component{

    state = {
        networks : [
            {
                title : "Facebook",
                icon : require("../../../assets/images/networks/normal/icon_facebook.png"),
                description : "@razgraf"
            },
            {
                title : "Twitter",
                icon : require("../../../assets/images/networks/normal/icon_twitter.png"),
                description : "@razgraf"
            },
            {
                title : "Behance",
                icon : require("../../../assets/images/networks/normal/icon_behance.png"),
                description : "@razgraf"
            },
            {
                title : "Pinterest",
                icon : require("../../../assets/images/networks/normal/icon_pinterest.png"),
                description : "@razgraf"
            },
            {
                title : "GitHub",
                icon : require("../../../assets/images/networks/normal/icon_github.png"),
                description : "@razgraf"
            }

        ]
    };

    render() {
        return(
            <div className={cx(styles.Page, styles.Dashboard)}>
                <div className={styles.container}>
                    <SideBar/>
                    <div className={styles.content}>
                        <section className={styles.networks}>

                            <SectionHeader title={"My Networks"} actions={[{
                                title : "Text",
                                type : ButtonType.OUTLINE,
                                icon : "home",
                                onClick : (e)=>{console.log("Clicked");}
                            }]}/>

                            <div className={styles.grid}>
                                {
                                    this.state.networks.map((element,index) => <Network key={index} {...element} />)
                                }
                            </div>


                        </section>





                    </div>
                </div>
            </div>
        )
    }


}

export default Dashboard;