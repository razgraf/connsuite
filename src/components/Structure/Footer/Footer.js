/**
 * Created by @VanSoftware on 2019-07-23.
 */


import React, {PureComponent} from 'react';
import styles from './Footer.module.scss'
import Image from "../../Common/Image/Image";
import ImageModel from "../../../model/ImageModel";
import {Button, ButtonType} from "../../Common/Button/Button";
import Icon from "../../Common/Icon/Icon";

class Footer extends PureComponent{


    render() {
        return (
            <div className={styles.Footer}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <Image
                                className={styles.logo}
                                source={new ImageModel({
                                    source : require("../../../assets/images/logo_horiz_white.png")
                                })}
                                />
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.map}>
                                <div className={styles.column}>
                                    <div className={styles.item}><div className={styles.content}><p>Profile</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>Discover</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>About</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>FAQ</p></div></div>
                                </div>


                                <div className={styles.column}>
                                    <div className={styles.item}><div className={styles.content}><p>ConnSuite Pro</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>Badge</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>Business Card</p></div></div>
                                </div>

                                <div className={styles.column}>
                                    <div className={styles.item}><div className={styles.content}><p>View on Product Hunt</p></div></div>
                                    <div className={styles.item}><div className={styles.content}><p>View on Twitter</p></div></div>
                                </div>
                            </div>


                            <div className={styles.plug}>
                                <div className={styles.container}>
                                    <div className={styles.title}>
                                        <p>Want to build something together? Let's have a chat!</p>
                                    </div>
                                    <div className={styles.action}>
                                        <Button
                                            custom={{style:styles, className: "buttonPlug"}}
                                            type={ButtonType.DEFAULT}
                                            onClick={()=>{alert("Chat with Van")}}
                                           // icon={<Icon image className={styles.icon} source={require("../../../assets/images/van_simple.png")} />}
                                            title={"@vansoftware"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;