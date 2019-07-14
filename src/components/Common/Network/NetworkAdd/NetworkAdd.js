/**
 * Created by @VanSoftware on 2019-07-12.
 */

import React from 'react';
import styles from './NetworkAdd.module.scss'
import {Link} from "react-router-dom";


const NetworkAdd = (props) => {

    return (
        <Link to={{pathname : '/network'}}>
            <div className={styles.NetworkAdd}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.shape}>
                            <div className={styles.vert}/>
                            <div className={styles.horiz}/>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.title}><p>Add Network</p></div>
                </div>
            </div>
        </Link>
    )
};

export default NetworkAdd;