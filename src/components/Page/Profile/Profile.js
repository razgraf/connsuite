/**
 * Created by @VanSoftware on 2019-07-17.
 */
import React from 'react';
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
import PortfolioSection from "../../Structure/Portfolio/PortfolioSection/PortfolioSection";
import Emoji from "../../Common/Emoji/Emoji";
import BusinessCardPublic from "../../Common/BusinessCard/BusinessCardPublic/BusinessCardPublic";
import {Button, ButtonType} from "../../Common/Button/Button";
import {Helper} from "../../../config/Util";
import Icon from "../../Common/Icon/Icon";
import Footer from "../../Structure/Footer/Footer";
import BasePage from "../BasePage";

class Profile extends BasePage{


    constructor(props){
        super(props);

        this.state = {
            scrollY : 1,
            blobTransitionX : 0,
            user : new UserModel(Config.DUMMY_USERS.others[0]),
        };

        this.props.onUserBounded(this.state.user);

        this.steps = [
             React.createRef(),
             React.createRef(),
             React.createRef(),
             React.createRef(),
        ];


        this.refToPortfolioSection = React.createRef();


    }


    componentDidMount() {
        super.componentDidMount();
        window.addEventListener("scroll",this.watchScroll);
        this.watchScroll();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScroll);
    }




    watchScroll = (event) => {
        let step = 0;


        for (let i = this.steps.length - 1; i >= 0; i--) {
            let b = this.steps[i].current.getBoundingClientRect().bottom;
            let t = this.steps[i].current.getBoundingClientRect().top;
            if (b >= (window.innerHeight / 2) && t <= (window.innerHeight / 2)) {
                step = i;
            }
        }

        if( window.scrollY <= 50) step = 0;
        if(this.steps[this.steps.length - 1].current.getBoundingClientRect().bottom < 0) step = this.steps.length-1;

        this.setState({scrollY: window.scrollY});
        if(this.props.activeStep !== step) this.props.changeActiveStep(step);

        let blob = this.computeTranslate(5);
        if(this.state.blobTransitionX !== blob) this.setState({blobTransitionX : blob});

    };




    render() {

        return(
            <div className={cx(styles.Page, styles.Profile)}>
                <Cover/>
                <section id={"story"} className={styles.header} ref={this.steps[0]}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <div className={styles.content}>
                                    <div className={styles.shapes}>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.state.blobTransitionX * 1  }px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.state.blobTransitionX * 1.2  }px)`}}><div /></div>
                                        <div className={styles.shape}  style={{transform : `translate(${ this.state.blobTransitionX * 0.5  }px)`}}><div /></div>

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
                                        <p>{this.state.user.name}<span>{"@" + this.state.user.username.main}</span></p>
                                    </div>
                                    <section>
                                        <div className={styles.divider}/>


                                        <div className={styles.description}>
                                            <p>Hi <Emoji symbol={'👋'}/>!<br/> Lorem ipsum dolor sit amet <Skill actions={[{label : "Show work", to:"#portfolio", onClick :() => {this.onSkillClick("ReactJS")}}]} label={"ReactJS"}/> consectetur adipiscing elit. Nunc varius nulla ut tortor accumsan faucibus. Donec semper eget justo sit amet fermentum. Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.  Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.  Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. <br/> Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.  Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. </p>
                                        </div>

                                        <div className={styles.actions}>
                                            <div className={styles.container}>

                                                <Button
                                                    custom={{style:styles, className: "buttonContact"}}
                                                    type={ButtonType.OUTLINE}
                                                    onClick={()=>{alert("Contact me (+book meeting through ConnSuite)")}}
                                                    title={"Get in touch"}
                                                    icon={<Icon icon round source={"whatshot"} className={styles.icon} />}
                                                />


                                                <div className={styles.more}>

                                                    <Button
                                                        custom={{style:styles, className: "buttonRequest"}}
                                                        type={ButtonType.DEFAULT}
                                                        onClick={()=>{alert("Contact me (+book meeting through ConnSuite)")}}
                                                        title={"Request Business Card"}
                                                    />
                                                </div>






                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>


                        </div>
                    </div>
                </section>

                <section className={styles.section} ref={this.steps[1]}>
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
               </section>

                <section className={styles.section} ref={this.steps[2]}>
                    <div className={styles.positioner} id={"portfolio"}/>
                    <div className={styles.container}>
                        <div className={cx(styles.content, styles.portfolio)}>
                            <InView>
                                {({ inView, ref, entry }) => (
                                    <div ref={ref}  className={styles.title} data-in-view={inView}>
                                        <p>Articles</p>
                                    </div>

                                )}
                            </InView>


                            <PortfolioSection
                                ref = {this.refToPortfolioSection}
                                categories = {Config.DUMMY_CATEGORIES}
                                skills = {Config.DUMMY_SKILLS}
                                articles = {this.state.user.articles}
                            />

                        </div>
                    </div>
                </section>

                <section className={styles.section} ref={this.steps[3]}>
                    <div className={styles.positioner} id={"business"}/>
                    <div className={cx(styles.container, styles.fullWidth)}>
                        <div className={cx(styles.content, styles.business)}>
                            <InView>
                                {({ inView, ref, entry }) => (
                                    <div ref={ref}  className={styles.title} data-in-view={inView}>
                                        <p>Business</p>
                                    </div>

                                )}
                            </InView>


                           <div className={styles.inner}>
                               <div className={styles.left}>
                                   <BusinessCardPublic user={this.state.user} />
                               </div>
                               <div className={styles.right}>
                                   <div className={styles.content}>
                                       <div className={styles.cards}>
                                           <div className={cx(styles.card, styles.stats)}>
                                              <div className={styles.inner}>
                                                  <div className={styles.content}>
                                                      <div className={styles.cell}>
                                                          <div className={styles.number}>
                                                              <p>12</p>
                                                          </div>
                                                          <div className={styles.title}>
                                                              <p>Networks</p>
                                                          </div>
                                                      </div>


                                                      <div className={styles.cell}>
                                                          <div className={styles.number}>
                                                              <p>2</p>
                                                          </div>
                                                          <div className={styles.title}>
                                                              <p>Articles</p>
                                                          </div>
                                                      </div>

                                                      <div className={styles.cell}>
                                                          <div className={styles.number}>
                                                              <p>12</p>
                                                          </div>
                                                          <div className={styles.title}>
                                                              <p>Showcased Skills</p>
                                                          </div>
                                                      </div>

                                                  </div>
                                                  <div className={styles.overlay}>
                                                      <div className={styles.vert}/>
                                                      <div className={styles.horiz}/>
                                                  </div>
                                              </div>
                                           </div>
                                           <div className={cx(styles.card, styles.actions)}>
                                               <div className={styles.inner}>
                                                   <div className={styles.content}>
                                                       <div className={styles.title}>
                                                           <p>Actions</p>
                                                       </div>
                                                       <div className={styles.list}>
                                                           <Button
                                                               custom={{style:styles, className: "buttonContact"}}
                                                               type={ButtonType.OUTLINE}
                                                               onClick={()=>{alert("Contact me (+book meeting through ConnSuite)")}}
                                                               title={"Get in touch"}
                                                               icon={<Icon icon round source={"whatshot"} className={styles.icon} />}
                                                           />
                                                           <Button
                                                               custom={{style:styles, className: "buttonHiFive"}}
                                                               type={ButtonType.DEFAULT}
                                                               onClick={()=>{alert("Contact me (+book meeting through ConnSuite)")}}
                                                               title={"Give Kudos (3)"}
                                                           />
                                                           <Button
                                                               custom={{style:styles, className: "buttonRequest"}}
                                                               type={ButtonType.DEFAULT}
                                                               onClick={()=>{alert("Contact me (+book meeting through ConnSuite)")}}
                                                               title={"Request Business Card"}
                                                           />

                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className={styles.background}/>
                    </div>
                </section>

                <Footer design={"full"}/>

            </div>
        )
    }



    computeTranslate = (a = 5) => {

        let position = Math.min(this.state.scrollY,500);
        return - ( Math.floor(position / 40) * 4 * a );

    };


    onSkillClick = (title) => {
        let skill = null;
        for(let i = 0; i < Config.DUMMY_SKILLS.length; i++)
            if(Config.DUMMY_SKILLS[i].title === title)
                skill = Config.DUMMY_SKILLS[i];

        console.log(skill);
        if(skill !== null) {

            this.refToPortfolioSection.current.setActiveSkill(skill);
        }
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
                return dispatch({type : Config.REDUX_ACTION_MODEL_USER_SET_ACTIVE, payload: { active : user }  })
            },
            changeActiveStep : (activeStep) => {
                return dispatch({type : Config.REDUX_ACTION_VIEW_PROFILE_SET_STEP, payload: { activeStep : activeStep }  })
            },
        }
    }) )(Profile);
