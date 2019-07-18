/**
 * Created by @VanSoftware on 2019-07-17.
 */
import React, {Component} from 'react';
import cx from "classnames";
import styles from "./Profile.module.scss";
import Cover from "../../Structure/Cover/Cover";
import Config from "../../../config/Config";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {UserModel} from "../../../model/UserModel";
import Icon from "../../Common/Icon/Icon";
import Image from "../../Common/Image/Image";
import {Helper} from "../../../config/Util";
import Skill from "../../Common/Skill/Skill";



class Profile extends Component{


    constructor(props){
        super(props);

        this.state = {
            scrollY : 1,
            user : new UserModel(Config.USER.others[0]),
        };

        this.props.onUserBounded(this.state.user);

    }



    componentDidMount() {
        window.addEventListener("scroll",this.watchScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScroll);
    }


    watchScroll = (event) => {
            this.setState({scrollY : window.scrollY})
    };



    render() {
        return(
            <div className={cx(styles.Page, styles.Profile)}>
                <Cover/>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <div className={styles.content}>
                                    <div className={styles.shapes}>
                                        <div className={styles.shape}  style={{transform : `translate(${ - Math.round(Math.min(this.state.scrollY,800) / 4)}px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ - Math.round(Math.min(this.state.scrollY,800) / 8)}px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ - Math.round(Math.min(this.state.scrollY,800) / 6)}px)`}}><div /></div>

                                       </div>
                                    <Image source={this.state.user.image} className={styles.image} />
                                </div>
                            </div>

                            <div className={styles.right}>
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        <p>Designer & Developer</p>
                                    </div>
                                    <div className={styles.name}>
                                        <p>{this.state.user.name}</p>
                                    </div>
                                    <div className={styles.description}>
                                        <p>Hi 👋!<br/> Lorem ipsum dolor sit amet, <Skill label={"ReactJS"}/>  consectetur adipiscing elit. Nunc varius nulla ut tortor accumsan faucibus. Donec semper eget justo sit amet fermentum. Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. </p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
               <div className={styles.main}>
                   <div className={styles.container}>

                       <div className={styles.content}>


                       </div>
                   </div>
               </div>
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
        return {
            onUserBounded : (user) => {
                console.log("Cover closing");
                return dispatch({type : Config.REDUX_ACTION_MODEL_USER_SET_ACTIVE, payload: { active : user }  })
            }
        }
    }) )(Profile);
