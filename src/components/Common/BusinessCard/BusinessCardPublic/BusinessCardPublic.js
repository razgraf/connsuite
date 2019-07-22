/**
 * Created by @VanSoftware on 2019-07-22.
 */

import React, {Component} from 'react';
import styles from './BusinessCardPublic.module.scss';
import Icon from "../../Icon/Icon";
import Image from "../../Image/Image";
import {UserModel} from "../../../../model/UserModel";
import NetworkMini from "../../Network/NetworkMini/NetworkMini";
import ImageModel from "../../../../model/ImageModel";


class BusinessCardPublic extends Component{

    static propTypes = {
        user : UserModel.propTypes
    };

    static defaultProps = {
        user : new UserModel({})
    }

    render() {
        return (
            <div className={styles.BusinessCardPublic}>
                <div className={styles.container}>
                    <div className={styles.left}>

                        <div className={styles.center}>
                            <Image
                                className={styles.image}
                                source={this.props.user.image}
                            />
                            <Image
                                className={styles.logo}
                                source={new ImageModel({source : require("../../../../assets/images/logo.png")})}
                            />
                        </div>

                    </div>
                    <div className={styles.right}>
                        <div className={styles.action}>
                            <Icon
                                icon
                                source={"more_vert"}
                                className={styles.icon}
                            />
                        </div>

                        <div className={styles.content}>
                            <div className={styles.name}><p>{this.props.user.name}</p></div>
                            <div className={styles.username}><p>@{this.props.user.username.main}</p></div>
                            <div className={styles.networks}>
                                <div className={styles.grid}>
                                    {
                                        this.props.user.networks.slice(0,11).map((element,index)=>{
                                            return (
                                                <NetworkMini
                                                    title={`See ${element.title}`}
                                                    key={index}
                                                    style={styles}
                                                    network={element}
                                                />)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default BusinessCardPublic;
