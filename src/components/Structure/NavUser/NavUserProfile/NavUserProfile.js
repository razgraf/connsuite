/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './../NavUser.module.scss';
import {Link, withRouter} from 'react-router-dom';
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import Icon from "../../../Common/Icon/Icon";
import {compose} from "redux";
import {connect} from "react-redux";
import cx from 'classnames'
import NetworkMini from "../../../Common/Network/NetworkMini/NetworkMini";
import NetworkMiniMore from "../../../Common/Network/NetworkMini/NetworkMiniMore/NetworkMiniMore";
import {HashLink} from 'react-router-hash-link';

class NavUserProfile extends Component{

    static Y_TRIGGER = 40;

    constructor(props) {
        super(props);
        this.state = {
            scrollY : window.scrollY,
            isFlowBoxVisible : false,
            steps : [
                {
                    title : "Story",
                    anchor : "#story"
                },
                {
                    title : "Networks",
                    anchor : "#networks"
                },
                {
                    title : "Portfolio",
                    anchor : "#portfolio"
                },
                {
                    title : "Business Card",
                    anchor : "#business"
                }
            ]
        };

        this.flowBox = React.createRef();
        this.flowBoxCaller = React.createRef();
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleFlowBox);
        window.addEventListener("scroll",this.watchScrollNav)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScrollNav);
        document.removeEventListener('mousedown', this.handleFlowBox);
    }

    watchScrollNav = (event) => { this.setState({scrollY : window.scrollY})};
    handleFlowBox = (event) => {
        try {
            if (this.flowBox === null || this.flowBoxCaller === null) return;

            if(this.flowBoxCaller.current.contains(event.target)){
                console.log("here");
                return;
            }

            let outside = !this.flowBoxCaller.current.contains(event.target);
            if (outside && this.state.isFlowBoxVisible) this.setState({isFlowBoxVisible: false});
        }catch (e) {
            console.error(e);
        }
    };


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            JSON.stringify(this.props.self) !== JSON.stringify(nextProps.self) ||
            JSON.stringify(this.props.active) !== JSON.stringify(nextProps.active) ||

            this.props.activeStep !== nextProps.activeStep ||
            this.state.isFlowBoxVisible !== nextState.isFlowBoxVisible ||


            (this.state.scrollY <= NavUserProfile.Y_TRIGGER && nextState.scrollY > NavUserProfile.Y_TRIGGER) ||
            (this.state.scrollY > NavUserProfile.Y_TRIGGER && nextState.scrollY <= NavUserProfile.Y_TRIGGER)
        )

    }

    render(){

        console.log(this.props.history);

       let page = Config.getPageByPath(this.props.location.pathname);
       let withReturn = !Helper.isEmpty(page) && !Helper.isEmpty(page.depth) && page.depth  > 1;
       let routeBack = !Helper.isEmpty(page)  && !Helper.isEmpty(page.routeBack) ? page.routeBack : Config.ROUTE_PAGE_DASHBOARD;

       let onBackClick = ()=>{ this.props.history.push(routeBack)};

       if(this.props.reduxHistory.length > 0){
           let h = [...this.props.reduxHistory];
           while(h.length > 0 && h[h.length - 1 ] === this.props.location.pathname) h.pop();

           if(h.length > 0){
               withReturn = true;
               onBackClick = ()=>{
                   this.props.history.push(h[h.length - 1]);
                   h.pop();
                   this.props.updateHistory(h);
               }
           }

       }



        return(
            <nav className={cx(styles.NavUser, styles.NavUserProfile)} data-top={this.state.scrollY <= NavUserProfile.Y_TRIGGER}>
                <div className={styles.container}>
                    <div onClick={()=>{onBackClick()}}  className={styles.logo} data-back={withReturn}>
                        <Icon image className={styles.default} source={require("../../../../assets/images/logo.png")} alt={""} />
                        {
                            withReturn
                                ? <Icon icon className={styles.back} source={"arrow_back"} alt={"Back"} />
                                : null
                        }
                    </div>

                    <div className={styles.content}>
                        <div className={styles.steps}>
                            <div className={styles.title}><p>{this.props.active.name + "'s"}</p></div>
                            <div
                                className={styles.chosen}
                                ref={this.flowBoxCaller}
                                data-flow-visible={this.state.isFlowBoxVisible}
                                onClick={()=>{this.setState({isFlowBoxVisible : ! this.state.isFlowBoxVisible }); }}
                            >
                                <p>{this.state.steps[this.props.activeStep].title}</p>
                                <Icon
                                    icon
                                    className={styles.icon}
                                    source={"keyboard_arrow_down"}
                                />

                                <div className={styles.flowBox} ref={this.flowBox} data-visible={this.state.isFlowBoxVisible}>
                                    {
                                        this.state.steps.map((element,index)=>
                                            (
                                                <HashLink
                                                    to={element.anchor}
                                                    smooth
                                                    key={index}
                                                    onClick={()=>{this.setState({isFlowBoxVisible : false}) }}
                                                    className={styles.step}
                                                    data-active={this.props.activeStep === index}>
                                                    <p>{element.title}</p>
                                                </HashLink>
                                            )
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                        <div className={styles.networks} data-visible={this.state.scrollY > NavUserProfile.Y_TRIGGER}>
                            <div className={styles.list}>
                                {this.props.active.networks.slice(0,4).map((element,index)=>
                                    <NetworkMini
                                        title={`See ${element.title}`}
                                        key={index}
                                        style={styles}
                                        network={element}
                                        onClick={()=>{this.props.onViewNetworkClick(element)}}
                                    />)
                                }
                                {
                                    this.props.active.networks.length > 4
                                        ?  <NetworkMiniMore
                                            title={"See more networks"}
                                            scrollTo={this.props.location.pathname + "#networks"}
                                            style={styles} />
                                        : null
                                }
                            </div>
                        </div>
                    </div>


                    <div className={styles.account} data-visible={this.state.scrollY <= NavUserProfile.Y_TRIGGER}>
                        <div className={styles.container}>
                            <div className={styles.image}>
                                <img alt={""} src={this.props.self.image.source}/>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.label}>
                                    <p>ConnSuite</p>
                                </div>
                                <div className={styles.name}>
                                    <p>{this.props.self.name}</p>
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

export default compose( withRouter, connect(
    (reduxState) => {
        return {
            self : reduxState.model.user.self,
            active : reduxState.model.user.active,
            activeStep : reduxState.view.profile.activeStep,
            reduxHistory : reduxState.view.navigator.history,
        }
    },
    (dispatch) => {
        return {
            onViewNetworkClick : (network) => {return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_NETWORK_CHOOSE, payload : {network : network}})},
            onClose : ()=>{ return dispatch({type : Config.REDUX_ACTION_CONTROLLER_COVER_CLOSE, payload: { visible : false }  }) },
            changeActiveStep : (activeStep) => {
                return dispatch({type : Config.REDUX_ACTION_VIEW_PROFILE_SET_STEP, payload: { activeStep : activeStep }  })
            },
            updateHistory : (history) => {return dispatch({type : Config.REDUX_ACTION_VIEW_NAVIGATOR_SET_HISTORY, payload : {history : history}})},
        }
    }) )(NavUserProfile);
