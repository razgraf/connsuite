/**
 * Created by @VanSoftware on 2019-07-04.
 */

import React, {Component} from 'react';
import styles from './Portfolio.module.scss';
import Network from "../../Common/Network/Network";
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import SideBar from "../../Structure/SideBar/SideBar";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";
import {ButtonType} from "../../Common/Button/Button";
import NetworkAdd from "../../Common/Network/NetworkAdd/NetworkAdd";
import Config from "../../../config/Config";

class Portfolio extends Component{

    state = {
        networks : Config.DUMMY_NETWORKS
    };

    render() {
        return(
            <div className={cx(styles.Page, styles.Portfolio)}>
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
                                <NetworkAdd/>
                            </div>


                        </section>





                    </div>
                </div>
            </div>
        )
    }



}

export default Portfolio;