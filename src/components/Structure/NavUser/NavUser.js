/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './NavUser.module.scss';
import {Link, withRouter} from 'react-router-dom';
import Config from "../../../config/Config";
import {Helper} from "../../../config/Util";
import Icon from "../../Common/Icon/Icon";


class NavUser extends Component{

    render(){



       let page = Config.getPageByPath(this.props.location.pathname);
       let withName = !Helper.isEmpty(page) && !Helper.isEmpty(page.depth) && page.depth  > 1;
       let routeBack = !Helper.isEmpty(page)  && !Helper.isEmpty(page.routeBack) ? page.routeBack : Config.ROUTE_PAGE_DASHBOARD;


        console.log(this.props);
        console.log(page);

        return(
            <nav className={styles.NavUser}>
                <div className={styles.container}>
                    <Link to={routeBack} className={styles.logo} data-back={withName}>
                        <Icon image className={styles.default} source={require("../../../assets/images/logo.png")} alt={"Logo"} />
                        {
                            withName
                                ? <Icon icon className={styles.back} source={"arrow_back"} alt={"Back"} />
                                : null
                        }
                    </Link>

                    <div className={styles.content}>
                        {
                            withName
                                ? <div className={styles.title}>
                                    <Icon icon round className={styles.icon} source={"keyboard_arrow_right"} />
                                    <p>{page.title}</p>
                                </div>
                                : null
                        }
                    </div>

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

export default withRouter(NavUser);

// export default compose( withRouter, connect(
//     (reduxState) => {
//         return {
//             routeBack : reduxState.view.navigator.routeBack,
//         }
//     },
//     (dispatch) => {
//         return {
//             onClose : (callback)=>{ console.log("Cover closing"); return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) }
//         }
//     }) )(NavUser);
