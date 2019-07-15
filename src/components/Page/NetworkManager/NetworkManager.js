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
import Emoji from "../../Common/Emoji/Emoji";


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


        shouldWarnDefaultStep0 : false,

        fieldsCustomStep0 : [
            {
                ID : "F_NetworkName",
                placeholder : "e.g. My personal website",
                length : [3, 20],
                label : {
                    label : "Title",
                    help : "Just like 'Facebook' or 'Twitter' you can give a name to your website/new network.",
                    force : 'right',
                },
                warnOnBlur : true,
                warnToggle :(ID, warn) => {this.doFieldToggleWarn(ID, warn)},
                warnText : "Make sure the title is between 3 and 40 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.title = scope.isValid() ? scope.value() : null;
                        this.setState({ networkCustom: n});
                    }
                }
            },
            {
                ID : "F_NetworkImage",
                higherScope : this,
                label : {
                    label : "Network Icon",
                    help : "Provide a logo or an icon to make this stand out",
                    force : 'right',
                },
                warnOnBlur : true,
                warnToggle :(ID, warn) => {this.doFieldToggleWarn(ID, warn)},
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);

                        if(!scope.isValid(true)){
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
                length : [3, 40],
                label : {
                    label : "Username (optional)",
                },
                warnOnBlur : true,
                warnToggle : (ID, warn) => {this.doFieldToggleWarn(ID, warn)},
                warnText : "Make sure the value is between 3 and 30 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkDefault);
                        console.log(scope.element);
                        n.username = scope.isValid() ? scope.value() : null;
                        this.setState({ networkDefault: n});
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
                warnOnBlur : true,
                warnToggle :(ID, warn) => {this.doFieldToggleWarn(ID, warn)},
                warnText : "Make sure the link is valid",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        console.log(scope.element);
                        n.URL = scope.isValid() ? scope.value() : null;
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
                warnOnBlur : true,
                warnToggle :(ID, warn) => {this.doFieldToggleWarn(ID, warn)},
                warnText : "Make sure the value is between 2 and 30 characters",
                callback :{
                    onChange : (scope) => {
                        let n = NetworkModel.clone(this.state.networkCustom);
                        n.username = scope.isValid(false) ? scope.value() : null;
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
                                            <div data-active={this.state.shouldWarnDefaultStep0} className={styles.warn}><div className={styles.content}><p>You must choose a network in order to move to the next step</p></div></div>
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
                                                    <div className={styles.title}><p>What is your username on '{(this.getActiveNetwork().title)}'?</p></div>
                                                    <div className={styles.subtitle}><p>You know how every social network had to ask you for a username <Emoji symbol={'🤔'}/> ?</p></div>
                                                    <div className={styles.content}>
                                                        <TextField {...this.state.fieldsDefaultStep1[0]} />
                                                    </div>
                                                </section>
                                                : <section className={styles.custom}>
                                                    <div className={styles.title}><p>Tell us more about this network/website. How can we reach it?</p></div>
                                                    <div className={styles.subtitle}><p>Aside from the url, you can optionally add a custom username. If empty, it will default to your First Name.</p></div>
                                                    <div className={styles.content}>
                                                        <TextField {...this.state.fieldsCustomStep1[0]} />
                                                        <URLField {...this.state.fieldsCustomStep1[1]}/>
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
                                    <div  className={styles.label} data-highlight={this.state.activeStep > 0}>
                                        <p>
                                            { (() => {
                                                return "URL"; //TODO bring back

                                                let active = this.getActiveNetwork();
                                                return (!Helper.isEmpty(active) && !Helper.isEmpty(active.URL)
                                                    ? (
                                                        active.URL +
                                                        ( this.state.activeSection === 0 && !Helper.isEmpty(active.username)
                                                            ? active.username
                                                            : "" )
                                                    )
                                                    : "http://preview")

                                            })()
                                            }
                                        </p>
                                    </div>
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
                                        onClick={()=>{this.goOneStepBackward()}}
                                />
                                : null}
                            <div className={styles.divider}/>
                            {
                                this.state.activeStep < 2
                                    ?
                                    <Button custom={{ style: styles, className: "buttonRight"}}
                                            title={this.state.activeStep === this.state.steps[this.state.steps.length - 1].id ? "Go Live"  : "Next Step"}
                                            icon={ this.state.activeStep === this.state.steps[this.state.steps.length - 1].id ? <Icon icon round className={styles.icon} source={"flash_on"} alt={"Step 2"} /> : null}
                                            type={ButtonType.DEFAULT}
                                            onClick={()=>{this.goOneStepForward()}}
                                            />
                                : null
                            }

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

    pickSection = (sectionID) =>{
        if(sectionID === this.state.activeSection) return;


        this.setState((prevState) => ({ activeSection : sectionID }));


        if(this.state.activeStep === 0 && sectionID === 0){
            let fields = [...this.state.fieldsCustomStep0];
            fields[0].warn = false;
            fields[1].warn = false;
            this.setState({
                fieldsCustomStep0 : fields
            })
        }
    };




    pickNetwork = (network) => {
        this.setState((prevState) => ({
            networkDefault : (prevState.networkDefault.AID !== network.AID) ? network : new NetworkModel(null),
            shouldWarnDefaultStep0 : (prevState.networkDefault.AID === network.AID)

        }));

    };


    goOneStepForward = () => {

        if(this.validateStep())
            this.setState(prevState => ({
                activeStep : (prevState.activeStep === 2) ? 2 : (prevState.activeStep + 1),
            }));

    };

    goOneStepBackward= () => {
            this.setState(prevState => ({
                activeStep : (prevState.activeStep === 0) ? 0 : (prevState.activeStep - 1),
            }));
    };


    validateStep = () => {
        return true; //TODO bring back


        let flag = true;

        switch (this.state.activeStep) {
            case 0 :
                if(this.state.activeSection === 0) {
                    if (Helper.isEmpty(this.state.networkDefault) || Helper.isEmpty(this.state.networkDefault.AID)){
                        flag = false;
                    }
                    this.setState({shouldWarnDefaultStep0 : !flag})
                }
                else if(this.state.activeSection === 1) {
                    if (Helper.isEmpty(this.state.networkCustom)){ flag = false;}

                    let fields = [...this.state.fieldsCustomStep0];
                    if (Helper.isEmpty(this.state.networkCustom.title)){
                        fields[0].warn = true;
                        flag = false;
                    }

                    if (Helper.isEmpty(this.state.networkCustom.icon) || Helper.isEmpty(this.state.networkCustom.icon.source)){
                        fields[1].warn = true;
                        flag = false;
                    }
                    this.setState({
                        fieldsCustomStep0 : fields
                    })

                }

                break;
            case 1 :
                if(this.state.activeSection === 0) {
                    let fields = [...this.state.fieldsDefaultStep1];
                    if (Helper.isEmpty(this.state.networkDefault.username)){
                        fields[0].warn = true;
                        flag = false;
                    }
                }
                else if(this.state.activeSection === 1) {
                    let fields = [...this.state.fieldsCustomStep1];
                    if (Helper.isEmpty(this.state.networkCustom.URL)){
                        fields[0].warn = true;
                        flag = false;
                    }

                }


                break;
            case 2 : break;
            default : flag = false;
        }


        return flag;
    };







    doFieldToggleWarn = (fieldID, warn) => {
        return; //TODO bring back


        let found = false;


        let fields0 = [...this.state.fieldsCustomStep0];
        for(let i = 0; i < fields0.length; i++){
            if(fields0[i].ID === fieldID){
                fields0[i].warn = warn;
                found = true;
            }
        }

        if(found) { this.setState({ fieldsCustomStep0 : fields0}); return;}


        let fields1C = [...this.state.fieldsCustomStep1];

        for(let i = 0; i < fields1C.length; i++){
            if(fields1C[i].ID === fieldID){
                fields1C[i].warn = warn;
                found = true;
            }
        }

        if(found) {this.setState({ fieldsCustomStep1 : fields1C}); return;}



        let fields1D = [...this.state.fieldsDefaultStep1];
        for(let i = 0; i < fields1D.length; i++){
            if(fields1D[i].ID === fieldID){
                fields1D[i].warn = warn;
                found = true;
            }
        }

        if(found) {this.setState({ fieldsDefaultStep1 : fields1C});return;}

    };



}


export default NetworkManager;