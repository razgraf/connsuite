/**
 * Created by @VanSoftware on 2019-07-12.
 */

import React, {Component} from 'react';
import styles from './NetworkManager.module.scss'
import cx from "classnames";
import Icon from "../../Common/Icon/Icon";
import Network from "../../Common/Network/Network";
import NetworkModel from "../../../model/NetworkModel";
import {Button, ButtonType} from "../../Common/Button/Button";
import NetworkMini from "../../Common/Network/NetworkMini/NetworkMini";
import Config from "../../../config/Config";
import {Helper} from "../../../config/Util";
import {TextField, URLField, FileField} from '../../Common/Field'


class NetworkManager extends Component{


    state = {
        networks : Config.DUMMY_NETWORKS,
        networkCustom :  new NetworkModel({username : "@James"}),
        networkDefault : new NetworkModel(null),
        steps : [
            {
                id : 0,
                title : "1. Choose Network",
                icon :   <Icon icon round className={styles.icon} source={"explore"} alt={"Step 1"} />,
                completed : false,
            },
            {
                id : 1,
                title : "2. Fill in credentials",
                icon :   <Icon icon round className={styles.icon} source={"how_to_reg"} alt={"Step 2"} />,
                completed : true,
            },
            {
                id : 2,
                title : "3. Go Live",
                icon :   <Icon icon round className={styles.icon} source={"flash_on"} alt={"Step 2"} />,
                completed : false,
            }
        ],
        activeStep : 0,
        activeSection : 0,


        fieldsCustomStep0 : [
            {
                ID : "F_NetworkName",
                placeholder : "e.g. My personal website",
                length : [3, 40],
                label : {
                    label : "Title",
                    help : "Just like 'Facebook' or 'Twitter' you can give a name to your website/new network.",
                    force : 'right',
                },
                warnText : "Make sure the title is between 3 and 40 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.title = scope.isValid(true) ? scope.value() : null;
                        this.setState({ networkCustom: n});
                    }
                }
            },
            {
                ID : "F_NetworkImage",
                label : {
                    label : "Network Icon",
                    help : "Provide a logo or an icon to make this stand out",
                    force : 'right',
                },
                warnText : "Make sure the link is valid",
                callback :{
                    onChange : (scope) => {

                        let n = NetworkModel.clone(this.state.networkCustom);

                        let value = scope.value();
                        if(value === null){
                            n.icon.source = null;
                            this.setState({ networkCustom: n});
                        }
                        else {
                            scope.bindImageValue().then((source) => {

                                n.icon.source = source;
                                this.setState({ networkCustom: n});

                            }).catch(()=>{
                                n.icon.source = null;
                                this.setState({ networkCustom: n});
                            })
                        }


                        // let n = NetworkModel.clone(this.state.networkCustom);
                        // n.URL = scope.isValid(true) ? scope.value() : null;
                        // this.setState({ networkCustom: n});

                        console.log(scope);
                        console.log(scope.value());
                    }
                },
                fileType : "image",

            },
        ],

        fieldsDefaultStep1 : [
            {
                ID : "F_NetworkUsername",
                placeholder : "e.g. @James",
                optional : true,
                length : [2, 30],
                label : {
                    label : "Username (optional)",
                },
                warnText : "Make sure the value is between 2 and 30 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.username = scope.isValid(true) ? scope.value() : null;
                        this.setState({ networkCustom: n});
                    }
                }
            },
        ],
        fieldsCustomStep1 : [
            {
                ID : "F_NetworkURL",
                placeholder : "e.g. www.website.com/link/james",
                length : [3, 40],
                label : {
                    label : "Full link/URL",
                    help : "We need a link for the website so we know where to send people that click on the card.",
                    force : 'right',
                },
                warnText : "Make sure the link is valid",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.URL = scope.isValid(true) ? scope.value() : null;
                        this.setState({ networkCustom: n});
                    }
                }

            },
            {
                ID : "F_NetworkUsernameCustom",
                placeholder : "e.g. @James",
                optional : true,
                length : [2, 30],
                label : {
                    label : "Username (optional)",
                    help : "You know how every social network asks for a username? What would yours be for this new custom network?",
                    force : 'right',
                },
                warnText : "Make sure the value is between 2 and 30 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.username = scope.isValid(true) ? scope.value() : null;
                        this.setState({ networkCustom: n});
                    }
                }
            },
        ]

    };

    componentDidMount() {
        this.pickSection(0);
    }

    render() {
        return (
            <div className={cx(styles.Page, styles.NetworkManager)} data-nav-fixed={true}>
                <div className={styles.container}>
                    <div className={styles.content}>

                        <div className={styles.header}>
                            <div className={styles.steps}>
                                {
                                    this.state.steps.map(step => this.buildStep(step))
                                }
                            </div>
                        </div>

                        <div className={styles.main}>

                            <div className={styles.left}>
                                <div className={styles.content}>
                                    <div className={styles.step} data-step={0} data-active={this.state.activeStep === 0}>
                                        <section className={styles.default} data-active={this.state.activeSection === 0} onClick={() => {this.pickSection(0)}}>
                                            <div className={styles.title}><p><span>a.</span> Choose the network you want to add</p></div>
                                            <div className={styles.content}>
                                                <div className={styles.networks}>
                                                        {
                                                            this.state.networks.map((element,index) => {
                                                                element.username = null;
                                                                return (
                                                                <NetworkMini
                                                                    key={index}
                                                                    active={this.state.activeSection === 0 && element.AID === this.state.networkDefault.AID}
                                                                    style={{width : "50px", height :'50px'}}
                                                                    network={element}
                                                                    onClick={() => this.pickNetwork(element)}

                                                                />
                                                                )})
                                                        }
                                                </div>
                                            </div>
                                        </section>
                                        <section className={styles.custom} data-active={this.state.activeSection === 1} onClick={() => {this.pickSection(1)}}>
                                            <div className={styles.title}><p><span>b.</span> Or create a custom network</p></div>
                                            <div className={styles.content}>
                                                <TextField {...this.state.fieldsCustomStep0[0]} />
                                                <FileField {...this.state.fieldsCustomStep0[1]}/>
                                            </div>
                                        </section>
                                    </div>

                                    <div className={styles.step} data-step={1} data-active={this.state.activeStep === 1}>
                                        {
                                            this.state.activeSection === 0
                                                ? <section className={styles.default}>
                                                    <div className={styles.title}><p>What if your username on '{(this.getActiveNetwork().title)}' be?</p></div>
                                                    <div className={styles.subtitle}><p>You know how every social network asks for a username? What would yours be for this network?</p></div>
                                                    <div className={styles.content}>
                                                        <TextField {...this.state.fieldsDefaultStep1[0]} />
                                                    </div>
                                                </section>
                                                : <section className={styles.custom}>
                                                    <div className={styles.title}><p>Tell us more about this network/website. How can we reach it?</p></div>
                                                    <div className={styles.subtitle}><p>Aside from the url, you can optionally add a custom username. If empty, it will default to your First Name.</p></div>
                                                    <div className={styles.content}>
                                                        <TextField {...this.state.fieldsCustomStep1[0]} />
                                                        <FileField {...this.state.fieldsCustomStep1[1]}/>
                                                    </div>
                                                </section>
                                            }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.header}>
                                    <div className={styles.shapes}>
                                        <div/>
                                        <div/>
                                        <div/>
                                    </div>
                                    <div  className={styles.label}><p>{!Helper.isEmpty(this.getActiveNetwork()) && !Helper.isEmpty((this.getActiveNetwork()).URL) ? (this.getActiveNetwork()).URL : "http://preview"}</p></div>
                                </div>
                                <div className={styles.container}>
                                     <div className={styles.content}>
                                    <div className={styles.default}>
                                        <Network viewonly network={this.getActiveNetwork()}/>
                                    </div>
                                    <div className={styles.group}>
                                        <div className={styles.item}><NetworkMini style={{width : "60px", height :'60px'}} viewonly network={this.getActiveNetwork()}/></div>
                                        <div className={styles.item}><NetworkMini style={{width : "60px", height :'60px'}} viewonly network={this.getActiveNetwork()}/></div>
                                        <div className={styles.item}><NetworkMini style={{width : "50px", height :'50px'}} viewonly network={this.getActiveNetwork()}/></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            {this.state.activeStep > 0
                                ?
                                <Button custom={{style: styles, className: "buttonLeft"}}
                                        title={"Previous Step"}
                                        type={ButtonType.CUSTOM_DEFAULT}
                                        onClick={this.goOneStepBackward}
                                />
                                : null}
                            <div/>
                            {
                                this.state.activeStep < 2
                                    ?
                                    <Button custom={{ style: styles, className: "buttonRight"}}
                                            title={this.state.activeStep === this.state.steps[this.state.steps.length - 1].id ? "Go Live"  : "Next Step"}
                                            icon={ this.state.activeStep === this.state.steps[this.state.steps.length - 1].id ? <Icon icon round className={styles.icon} source={"flash_on"} alt={"Step 2"} /> : null}
                                            type={ButtonType.DEFAULT}
                                            onClick={this.goOneStepForward}
                                    />
                                : null}

                            />

                        </div>
                    </div>

                </div>
            </div>
        )
    }




    getActiveNetwork(){
        return this.state.activeSection === 0 ? this.state.networkDefault : this.state.networkCustom
    }


    buildStep(step){
        return (
            <div key={step.id} className={styles.step} data-active={this.state.activeStep === step.id} data-completed={step.completed}>
                {step.icon}
                <div className={styles.title}>
                    <p>{step.title}</p>
                    <Icon icon round className={styles.complete} source={"check"} />
                </div>
                <div className={styles.divider}/>
            </div>
        )
    };

    pickSection(sectionID){
        if(sectionID === this.state.activeSection) return;
        this.setState({
                activeSection : sectionID,

            });
    };


    pickNetwork(network){
        this.setState((prevState) => {
            return {
                networkDefault : ((prevState.networkDefault.AID !== network.AID) ?  network : new NetworkModel(null)),
            }
        });
    };


    goOneStepForward(){

        if(this.validateStep())
            this.setState(prevState => ({
                activeStep : (prevState.activeStep === 2) ? 2 : (prevState.activeStep + 1),
            }));

    }

    goOneStepBackward(){

    }


    validateStep(){
        switch (this.state.activeStep) {
            case 0 : break;
            case 1 : break;
            case 2 : break;
            default : return false;
        }

        return true;
    }


}


export default NetworkManager;