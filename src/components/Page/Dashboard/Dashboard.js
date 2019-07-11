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
import Cover from "../../Structure/Cover/Cover";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import NetworkModel from "../../../model/NetworkModel";

class Dashboard extends Component{

    state = {
        networks : (()=>{
            let a =  [
                {
                    title : "Facebook",
                    icon : {
                      source :  require("../../../assets/images/networks/normal/icon_facebook.png"),
                    },
                    username : "razgraf"
                },
                {
                    title : "Twitter",
                    icon : {
                        source :  require("../../../assets/images/networks/normal/icon_twitter.png"),
                    },
                    username : "razgraf"
                },
                {
                    title : "Behance",
                    icon : {
                        source :  require("../../../assets/images/networks/normal/icon_behance.png"),
                    },
                    username : "razgraf"
                },
                {
                    title : "Pinterest",
                    icon : {
                        source :  require("../../../assets/images/networks/normal/icon_pinterest.png"),
                    },
                    username : "razgraf"
                },
                {
                    title : "GitHub",
                    icon : {
                        source :  require("../../../assets/images/networks/normal/icon_github.png"),
                    },
                    username : "razgraf"
                }
            ];
            let n = [];

            a.forEach(element => {n.push(new NetworkModel(element))});
            return n;
        })()


    };

    render() {
        return(
            <div className={cx(styles.Page, styles.Dashboard)}>
                <Overlay/>
                <Cover/>
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
                                    this.state.networks.map((element,index) => <Network key={index} network={element} />)
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