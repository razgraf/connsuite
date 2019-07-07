/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './NavUser.module.scss';

class NavUser extends Component{

    render(){
        return(
            <nav className={styles.NavUser}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img alt={"Logo"} src={require("../../../assets/images/logo.png")}/>
                    </div>

                    <div className={styles.content}/>

                    <div className={styles.account}>
                        <div className={styles.container}>
                            <div className={styles.image}>
                                <img alt={"User"} src={require("../../../assets/images/logo.png")}/>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.label}>
                                    <p>ConnSuite</p>
                                </div>
                                <div className={styles.name}>
                                    <p>Razvan Gabriel Apostu</p>
                                </div>
                            </div>
                            <div className={styles.action}>
                                <div className={styles.toggleIcon}>
                                    <i className={"material-icons"}>keyboard_arrow_down</i>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        )
    }
}

export default NavUser;