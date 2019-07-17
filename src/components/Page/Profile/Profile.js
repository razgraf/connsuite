/**
 * Created by @VanSoftware on 2019-07-17.
 */
import React, {Component} from 'react';
import cx from "classnames";
import styles from "./Profile.module.scss";
import Cover from "../../Structure/Cover/Cover";



class Profile extends Component{

    render() {
        return(
            <div className={cx(styles.Page, styles.Profile)}>
                <Cover/>
                <div className={styles.container}>

                    <div className={styles.content}>


                    </div>
                </div>
            </div>
        )
    }
}


export default Profile;