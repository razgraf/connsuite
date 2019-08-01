/**
 * Created by @VanSoftware on 2019-07-04.
 */

import React from 'react';
import styles from './Portfolio.module.scss';
import Network from "../../Common/Network/Network";
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import SideBar from "../../Structure/SideBar/SideBar";
import SectionHeader from "../../Common/SectionHeader/SectionHeader";
import {Button, ButtonType} from "../../Common/Button/Button";
import NetworkAdd from "../../Common/Network/NetworkAdd/NetworkAdd";
import Config from "../../../config/Config";
import Icon from "../../Common/Icon/Icon";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Article from "../../Common/Article/Article";
import ArticleAdd from "../../Common/Article/ArticleAdd/ArticleAdd";
import FooterMini from "../../Structure/Footer/FooterMini/FooterMini";
import BasePage from "../BasePage";

class Portfolio extends BasePage{

    constructor(props){
        super(props);

        this.state = {
            networks : Config.DUMMY_NETWORKS,
        };


    }

    componentDidMount() {
        super.componentDidMount();
    }



    render() {
        return(
            <div className={cx(styles.Page, styles.Portfolio)}>
                <Overlay/>
                <Cover/>
                <div className={styles.container}>
                    <SideBar />
                    <div className={styles.content}>
                        <section className={styles.networks}>
                            <SectionHeader title={"My Networks"} actions={[{
                                title : "Create Network",
                                type : ButtonType.MINI,
                                custom : {
                                    style : styles,
                                    className : "button"
                                },
                                icon : (<Icon icon round source={"add"} className={styles.icon}/>),
                                onClick : (e)=>{this.props.history.push(Config.ROUTE_PAGE_NETWORK_ADD);}
                            }]}/>

                            <div className={styles.grid}>
                                {
                                    this.props.self.networks.map((element,index) => <Network key={index} network={element} />)
                                }
                                <NetworkAdd/>
                            </div>


                        </section>


                        <section className={styles.articles}>
                            <SectionHeader title={"My Articles"} actions={[{
                                title : "Create Article",
                                type : ButtonType.MINI,
                                custom : {
                                    style : styles,
                                    className : "button"
                                },
                                icon : (<Icon icon round source={"add"} className={styles.icon}/>),
                                onClick : (e)=>{this.props.history.push(Config.ROUTE_PAGE_ARTICLE_ADD);}
                            }]}/>

                            <div className={styles.grid}>
                                {
                                    this.props.self.articles.map((element,index) => <Article manager={true} key={index} article={element} />)
                                }
                                <ArticleAdd/>
                            </div>


                        </section>



                        <section className={styles.actions}>
                            <SectionHeader title={"Actions"}/>

                            <div className={styles.list}>
                                <Button
                                    title={"Create Network"}
                                    type={ButtonType.OUTLINE}
                                    custom={{
                                        style: styles,
                                        className: "buttonNetworks"
                                    }}
                                    icon={(<Icon icon round source={"add"} className={styles.icon}/>)}
                                    onClick={(e) => {
                                        this.props.history.push(Config.ROUTE_PAGE_NETWORK_ADD);
                                    }}
                                />

                                <Button
                                    title={"Create Article"}
                                    type={ButtonType.OUTLINE}
                                    custom={{
                                        style: styles,
                                        className: "buttonArticles"
                                    }}
                                    icon={(<Icon icon round source={"add"} className={styles.icon}/>)}
                                    onClick={(e) => {
                                        this.props.history.push(Config.ROUTE_PAGE_ARTICLE_ADD);
                                    }}
                                />
                            </div>


                        </section>

                    </div>
                </div>
                <FooterMini/>
            </div>
        )
    }



}


export default compose( withRouter, connect(
    (reduxState) => {
        return {
            self : reduxState.model.user.self,
        }
    },
    (dispatch) => {
        return {}
    }) )(Portfolio);