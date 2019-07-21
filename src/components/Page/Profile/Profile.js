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
import Image from "../../Common/Image/Image";
import Skill from "../../Common/Skill/Skill";
import Network from "../../Common/Network/Network";
import InView from 'react-intersection-observer'

class Profile extends Component{


    constructor(props){
        super(props);

        this.state = {
            scrollY : 1,
            user : new UserModel(Config.USER.others[0]),
        };

        this.props.onUserBounded(this.state.user);

        this.steps = [
             React.createRef(),
             React.createRef(),
             React.createRef(),
        ];

    }


    componentDidMount() {
        window.addEventListener("scroll",this.watchScroll);
        this.watchScroll();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScroll);
    }


    watchScroll = (event) => {
        let step = null;

        for (let i = this.steps.length - 1; i >= 0; i--) {
            let b = this.steps[i].current.getBoundingClientRect().bottom;
            let t = this.steps[i].current.getBoundingClientRect().top;
            if (b >= (window.innerHeight / 2) && t <= (window.innerHeight / 2)) {
                step = i;
            }

            if( window.scrollY <= 50) step = 0;


        }

        this.setState({scrollY: window.scrollY});
        if(this.props.activeStep !== step) this.props.changeActiveStep(step);


    };



    render() {
        return(
            <div className={cx(styles.Page, styles.Profile)}>
                <Cover/>
                <div id={"story"} className={styles.header} ref={this.steps[0]}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <div className={styles.content}>
                                    <div className={styles.shapes}>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.computeTranslate(5) }px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.computeTranslate(3) }px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.computeTranslate(4) }px)`}}><div /></div>

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
                                    <section>
                                        <div className={styles.divider}/>


                                        <div className={styles.description}>
                                            <p>Hi 👋!<br/> Lorem ipsum dolor sit amet <Skill label={"ReactJS"}/> consectetur adipiscing elit. Nunc varius nulla ut tortor accumsan faucibus. Donec semper eget justo sit amet fermentum. Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. </p>
                                        </div>
                                    </section>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className={styles.main} ref={this.steps[1]}>
                   <div className={styles.positioner} id={"networks"}/>
                   <div className={styles.container}>
                       <section className={cx(styles.content, styles.networks)}>
                           <InView>
                               {({ inView, ref, entry }) => (
                                   <div ref={ref} className={styles.title} data-in-view={inView}>
                                       <p>Networks</p>
                                   </div>

                               )}
                           </InView>
                           <div className={styles.grid}>
                               {
                                   this.state.user.networks.map((element,index) => <Network key={index} network={element} />)
                               }
                           </div>

                       </section>
                   </div>
               </div>



                <div className={styles.main} ref={this.steps[2]}>
                    <div className={styles.positioner} id={"portfolio"}/>
                    <div className={styles.container}>
                        <section className={cx(styles.content, styles.networks)}>
                            <InView>
                                {({ inView, ref, entry }) => (
                                    <div ref={ref}  className={styles.title} data-in-view={inView}>
                                        <p>Portfolio</p>
                                    </div>

                                )}
                            </InView>

                            <div className={styles.grid}>
                                <p>Items</p>
                            </div>

                        </section>
                    </div>
                </div>


            </div>
        )
    }



    computeTranslate = (a = 5) => {

        let position = Math.min(this.state.scrollY,500);
        return - ( Math.floor(position / 40) * 4 * a );

    }

}



export default compose( withRouter, connect(
    (reduxState) => {
        return {
            self : reduxState.model.user.self,
            activeStep : reduxState.view.profile.activeStep
        }
    },
    (dispatch) => {
        return {
            onUserBounded : (user) => {
                console.log("Cover closing");
                return dispatch({type : Config.REDUX_ACTION_MODEL_USER_SET_ACTIVE, payload: { active : user }  })
            },
            changeActiveStep : (activeStep) => {
                return dispatch({type : Config.REDUX_ACTION_VIEW_PROFILE_SET_STEP, payload: { activeStep : activeStep }  })
            },
        }
    }) )(Profile);
