/**
 * Created by @VanSoftware on 2019-07-04.
 */

import React, {Component} from 'react';
import styles from './Networks.module.scss';
import Network from "../../Common/Network/Network";

class Networks extends Component{

    render() {
        return(
            <div className={styles.Networks}>
                <header><h2>Networks</h2></header>
                {
                    [1,2,3,4,5].map((element, index) => {
                        return <Network {...element} key={index} />
                })
                }
            </div>
        )
    }


}

export default Networks;