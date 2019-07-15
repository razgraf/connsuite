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
import Form from "../../Common/Field/Form/Form";


class NetworkManager extends Component{

    constructor(props){
        super(props);

        this.state = {
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
            activeStep : -1,
            activeSection : 0,
            shouldWarnDefaultStep0 : false,





        };

    }




    componentDidMount() {
        this.pickSection(0);
        this.setState({activeStep : 0});
    }

    render() {

        let active = this.getActiveNetwork();

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
                                    <div className={styles.step} data-step={-1} data-active={this.state.activeStep === -1}>
                                        <div className={styles.container}></div>
                                    </div>
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
                                                                    onClick={() => this.pickNetwork(element.AID)}

                                                                />
                                                                )})
                                                        }
                                                </div>
                                            </div>
                                        </section>
                                        <section className={styles.custom} data-active={this.state.activeSection === 1} onClick={() => {this.pickSection(1)}}>
                                            <div className={styles.title}><p><span>b.</span> Or create a custom network</p></div>
                                            <div className={styles.content}>
                                                <Form
                                                      fields={[
                                                        {
                                                            ID : "F_NetworkName",
                                                            type : 'Text',
                                                            placeholder : "e.g. My personal website",
                                                            length : [3, 20],
                                                            label : {
                                                                value : "Title",
                                                                help : "Just like 'Facebook' or 'Twitter' you can give a name to your website/new network.",
                                                                force : 'right',
                                                            },
                                                            warn:  {
                                                                onBlur : true,
                                                                text :  "Make sure the title is between 3 and 40 characters",
                                                            }
                                                        },
                                                        {
                                                            ID : "F_NetworkImage",
                                                            type : 'File',
                                                            fileType : "image",
                                                            label : {
                                                                value : "Network Icon",
                                                                help : "Provide a logo or an icon to make this stand out",
                                                                force : 'right',
                                                            },
                                                            warn : {
                                                                onBlur : true,
                                                            },
                                                            callback :{
                                                                onChange : (element, formScope) => {
                                                                    console.log("onChangeImage", element.data.scope.isValid(true));
                                                                    let n = NetworkModel.clone(this.state.networkCustom);
                                                                    if(element.data.scope.isValid(true)) {
                                                                        element.data.scope.bindImageValue().then((source)=>{
                                                                            n.icon.source = source;
                                                                            this.setState({ networkCustom: n});
                                                                        }).catch(()=>{
                                                                            n.icon.source = null;
                                                                            this.setState({ networkCustom: n});
                                                                        })
                                                                    }else{
                                                                        n.icon.source = null;
                                                                        this.setState({ networkCustom: n});
                                                                    }
                                                                }
                                                            },
                                                        }
                                                        ]}
                                                      onUpdate={(formState)=>{
                                                          let n = NetworkModel.clone(this.state.networkCustom);
                                                          let icon = formState.findFieldByID("F_NetworkImage");
                                                          n.icon.file = !Helper.isEmpty(icon) && !Helper.isEmpty(icon.data.value) ? icon.data.value : null;

                                                          let title = formState.findFieldByID("F_NetworkName");
                                                          n.title = !Helper.isEmpty(title) && !Helper.isEmpty(title.data.value) ? title.data.value : null;


                                                          this.setState({ networkCustom: n});
                                                      }}
                                                />

                                            </div>
                                        </section>
                                    </div>

                                    <div className={styles.step} data-step={1} data-active={this.state.activeStep === 1}>
                                        {
                                            this.state.activeSection === 0
                                                ? <section className={styles.default}>
                                                    <div className={styles.title}><p>{`What is your username on ${active.title}?`}</p></div>
                                                    <div className={styles.subtitle}><p>You know how every social network had to ask you for a username <Emoji symbol={'🤔'}/> ?</p></div>
                                                    <div className={styles.content}>


                                                        <Form
                                                              fields={[
                                                                  {
                                                                      ID : "F_NetworkUsername",
                                                                      type : 'Text',
                                                                      value : this.state.networkDefault.username,
                                                                      placeholder : "e.g. @James",
                                                                      length : [3, 30],
                                                                      label : {
                                                                          value : "Username (optional)",
                                                                      },
                                                                      warn:  {
                                                                          onBlur : true,
                                                                          text :  "Make sure the username is between 3 and 30 characters",
                                                                      }
                                                                  },
                                                              ]}
                                                              onUpdate={(formState)=>{
                                                                  let n = NetworkModel.clone(this.state.networkDefault);
                                                                  let username = formState.findFieldByID("F_NetworkUsername");
                                                                  n.username = !Helper.isEmpty(username) && !Helper.isEmpty(username.data.value) ? username.data.value : null;
                                                                  this.setState({ networkDefault: n});
                                                              }}
                                                              columns={1}
                                                        />


                                                    </div>
                                                </section>
                                                : <section className={styles.custom}>
                                                    <div className={styles.title}><p>Tell us more about this network/website. How can we reach it?</p></div>
                                                    <div className={styles.subtitle}><p>Aside from the url, you can optionally add a custom username. If empty, it will default to your First Name.</p></div>
                                                    <div className={styles.content}>



                                                        <Form
                                                              fields={[
                                                                  {
                                                                      ID : "F_NetworkURL",
                                                                      type : 'URL',
                                                                      value : this.state.networkCustom.URL,
                                                                      placeholder : "e.g. www.website.com/link/james",
                                                                      length : [3, 100],
                                                                      label : {
                                                                          value : "Full link/URL",
                                                                          help : "We need a link for the website so we know where to send people that click on the card.",
                                                                          force : 'right',
                                                                      },
                                                                      warn:  {
                                                                          onBlur : true,
                                                                          text :  "Make sure the link is valid",
                                                                      }
                                                                  },
                                                                  {
                                                                      ID : "F_NetworkUsernameCustom",
                                                                      type : 'Text',
                                                                      placeholder : "e.g. @James",
                                                                      value : this.state.networkCustom.username,
                                                                      length : [2, 30],
                                                                      label : {
                                                                          value : "Username (optional)",
                                                                          help : "You know how every social network asks for a username? What would yours be for this new custom network?",
                                                                          force : 'right',
                                                                      },
                                                                      warn:  {
                                                                          onBlur : true,
                                                                          text :  "Make sure the value is between 2 and 30 characters",
                                                                      }
                                                                  },
                                                              ]}
                                                              onUpdate={(formState)=>{
                                                                  let n = NetworkModel.clone(this.state.networkCustom);

                                                                  let URL = formState.findFieldByID("F_NetworkURL");
                                                                  n.URL = !Helper.isEmpty(URL) && !Helper.isEmpty(URL.data.value) ? URL.data.value : null;

                                                                  let username = formState.findFieldByID("F_NetworkUsernameCustom");
                                                                  n.username = !Helper.isEmpty(username) && !Helper.isEmpty(username.data.value) ? username.data.value : null;

                                                                  this.setState({ networkCustom: n});
                                                              }}

                                                        />

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
                                            { (!Helper.isEmpty(active) && !Helper.isEmpty(active.URL)
                                                    ? (
                                                        active.URL +
                                                        ( this.state.activeSection === 0 && !Helper.isEmpty(active.username)
                                                            ? active.username
                                                            : "" )
                                                    )
                                                    : "http://preview")
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.container}>
                                     <div className={styles.content}>
                                    <div className={styles.default}>
                                        <Network viewonly network={active}/>
                                    </div>
                                    <div className={styles.group}>
                                        <div className={styles.item}><NetworkMini style={{width : "60px", height :'60px'}} viewonly network={active}/></div>
                                        <div className={styles.item}><NetworkMini style={{width : "60px", height :'60px'}} viewonly network={active}/></div>
                                        <div className={styles.item}><NetworkMini style={{width : "50px", height :'50px'}} viewonly network={active}/></div>
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




    pickNetwork = (networkAID) => {
        this.setState((prevState) => ({
            networkDefault : (prevState.networkDefault.AID !== networkAID) ? (()=>{

                for(let i = 0; i < Config.DUMMY_NETWORKS.length; i++){
                    if(Config.DUMMY_NETWORKS[i].AID === networkAID){
                        let n = Config.DUMMY_NETWORKS[i].clone();
                        n.username = prevState.networkDefault.username;
                        return n;
                    }
                }
                return new NetworkModel(null);

            })() : new NetworkModel(null),
            shouldWarnDefaultStep0 : (prevState.networkDefault.AID === networkAID)
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
                    if (Helper.isEmpty(this.state.networkCustom.title)) flag = false;
                    if (Helper.isEmpty(this.state.networkCustom.icon) || Helper.isEmpty(this.state.networkCustom.icon.source)) flag = false;

                }

                break;
            case 1 :
                if(this.state.activeSection === 0) {
                    if (Helper.isEmpty(this.state.networkDefault.username)) flag = false;
                }
                else if(this.state.activeSection === 1) {
                    if (Helper.isEmpty(this.state.networkCustom.URL)){flag = false;}

                }
                break;
            case 2 : break;
            default : flag = false;
        }


        return flag;
    };










}


export default NetworkManager;