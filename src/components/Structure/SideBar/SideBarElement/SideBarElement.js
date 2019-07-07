/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBarElement.module.scss';

class SideBarElement extends Component {

    render() {
        return(
            <div className={styles.SideBarElement}>
                <div className={styles.container}>
                    <div className={styles.icon}>
                        <i className={"material-icons"}>{this.props.icon}</i>
                    </div>
                </div>
            </div>
        )
    }

}
export default SideBarElement;