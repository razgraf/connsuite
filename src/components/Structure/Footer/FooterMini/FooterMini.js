/**
 * Created by @VanSoftware on 2019-07-23.
 */


import React from 'react';
import styles from './FooterMini.module.scss'
import Image from "../../../Common/Image/Image";
import ImageModel from "../../../../model/ImageModel";
import {Button, ButtonType} from "../../../Common/Button/Button";


const FooterMini  = (props) => {


        return (
            <div className={styles.Footer}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Image
                            className={styles.logo}
                            source={new ImageModel({
                                source : require("../../../../assets/images/logo_horiz_white.png")
                            })}
                        />
                            <div className={styles.plug}>
                                <div className={styles.container}>
                                    <div className={styles.action}>
                                        <Button
                                            custom={{style:styles, className: "buttonPlug"}}
                                            type={ButtonType.MINI}
                                            onClick={()=>{alert("Chat with Van")}}
                                            title={"@vansoftware"}
                                        />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
}

export default FooterMini;