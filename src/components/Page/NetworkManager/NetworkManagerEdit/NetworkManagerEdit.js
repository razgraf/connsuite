/**
 * Created by @VanSoftware on 2019-07-12.
 */

import React from 'react';
import styles from './../NetworkManager.module.scss'
import cx from "classnames";
import Icon from "../../../Common/Icon/Icon";
import Network from "../../../Common/Network/Network";
import NetworkModel from "../../../../model/NetworkModel";
import {Button, ButtonType} from "../../../Common/Button/Button";
import NetworkMini from "../../../Common/Network/NetworkMini/NetworkMini";
import Config from "../../../../config/Config";
import {Helper} from "../../../../config/Util";
import Form from "../../../Common/Field/Form/Form";
import BasePage from "../../BasePage";




class NetworkManagerEdit extends BasePage{

    static FIELD_CUSTOM_TITLE = "F_NetworkName";
    static FIELD_CUSTOM_IMAGE = "F_NetworkImage";
    static FIELD_CUSTOM_URL = "F_NetworkURL";
    static FIELD_CUSTOM_USERNAME = "F_NetworkUsernameCustom";
    static FIELD_DEFAULT_USERNAME="F_NetworkUsername";
    static FIELD_COMMON_DESCRIPTION = "F_NetworkDescription";


    constructor(props){
        super(props);

        let {AID} = this.props.match.params;
        ///if(!Helper.isEmpty(AID)) this.props.history.go(Config.ROUTE_PAGE_DASHBOARD);

        this.state = {
            AID : AID,
            network : new NetworkModel(null),
            steps : [
                {
                    id : 0,
                    title : "Edit Credentials and Go Live",
                    icon :   <Icon icon round className={styles.icon} source={"flash_on"} alt={"Go"} />,
                    completed : false,
                }
            ],
            activeStep : 0,
            activeSection : 0,


        };

        this.referenceToForm = React.createRef();

    }


    componentDidMount() {
        super.componentDidMount();
        this.pickSection(this.state.activeSection);
        let e = (document.scrollingElement || document.documentElement);
        if (!Helper.isEmpty(e)) e.scrollTop = 0;


        this.retrieve().then((network) => {
            if(network === null) alert("No network");
            else {
                this.setState({network : network});
                this.setState({activeSection : network.type === NetworkModel.TYPE_DEFAULT ? 0 : 1})
            }
        })
    }

    retrieve = () => {
        return new Promise(resolve => {
            let networks = Config.DUMMY_NETWORKS;

            for(let i = 0; i < networks.length; i++) if(networks[i].AID === this.state.AID) resolve(NetworkModel.clone(networks[i]));
            resolve(null);
        })

    };

    render() {

        let active = this.state.network;

        return (
                <div className={cx(styles.Page, styles.NetworkManager, styles.Edit)} data-nav-fixed={true}>
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
                                        <div className={styles.step} data-step={0}
                                             data-active={this.state.activeStep === 0}>
                                            {
                                                this.state.activeSection === 0
                                                    ? <section className={styles.default}>
                                                        <div className={styles.title}><p>Edit network</p></div>
                                                        <div className={styles.subtitle}><p>If you want to edit the info
                                                            regarding your network here's the place to do it. Make sure that
                                                            the modifications you have in mind are necessary as changes will
                                                            directly affect your profile.</p></div>
                                                        <div className={styles.content}>
                                                            <Form
                                                                ref={this.referenceToForm}
                                                                columns={1}
                                                                defaultValid={true}
                                                                fields={[
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_DEFAULT_USERNAME,
                                                                        type: 'Text',
                                                                        value: active.username,
                                                                        placeholder: "e.g. @James",
                                                                        length: [2, 30],
                                                                        label: {
                                                                            value: "Username",
                                                                        },
                                                                        warn: {
                                                                            onBlur: true,
                                                                            text: "Make sure the username is between 2 and 30 characters",
                                                                        }
                                                                    },
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_COMMON_DESCRIPTION,
                                                                        type: 'Area',
                                                                        value: active.description,
                                                                        placeholder: "e.g. Contact me here for business inquiries only.",
                                                                        length: [0, 500],
                                                                        label: {
                                                                            value: "Description (optional)",
                                                                            help: "This description will be shown when someone is interested in accessing your network. You can use this to separate business from personal accounts."
                                                                        },
                                                                        warn: {
                                                                            onBlur: false,
                                                                            text: "Make sure the description is smaller than 500 characters",
                                                                        }
                                                                    },
                                                                ]}
                                                                onUpdate={(formState) => {
                                                                    let n = NetworkModel.clone(this.state.network);

                                                                    let username = formState.findFieldByID(NetworkManagerEdit.FIELD_DEFAULT_USERNAME);
                                                                    n.username = !Helper.isEmpty(username) && !Helper.isEmpty(username.data.value) ? username.data.value : null;

                                                                    let description = formState.findFieldByID(NetworkManagerEdit.FIELD_COMMON_DESCRIPTION);
                                                                    n.description = !Helper.isEmpty(description) && !Helper.isEmpty(description.data.value) ? description.data.value : null;


                                                                    this.setState({network: n});
                                                                }}

                                                            />
                                                        </div>
                                                    </section>
                                                    : null
                                            }
                                            {
                                                this.state.activeSection === 1
                                                    ? <section className={styles.custom}>
                                                        <div className={styles.title}><p>Edit network information</p></div>
                                                        <div className={styles.subtitle}><p>If you want to edit the info
                                                            regarding your network here's the place to do it. Make sure that
                                                            the modifications you have in mind are necessary as changes will
                                                            directly affect your profile.</p></div>
                                                        <div className={styles.content}>
                                                            <Form
                                                                defaultValid={true}
                                                                ref={this.referenceToForm}
                                                                columns={2}
                                                                fields={[
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_CUSTOM_TITLE,
                                                                        type: 'Text',
                                                                        value: active.title,
                                                                        placeholder: "e.g. My personal website",
                                                                        length: [3, 20],
                                                                        label: {
                                                                            value: "Title",
                                                                            help: "Just like 'Facebook' or 'Twitter' you can give a name to your website/new network.",
                                                                            force: 'right',
                                                                        },
                                                                        warn: {
                                                                            onBlur: true,
                                                                            text: "Make sure the title is between 3 and 40 characters",
                                                                        }
                                                                    },
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_CUSTOM_IMAGE,
                                                                        type: 'File',
                                                                        fileType: "image",
                                                                        fileName: active.icon.name,
                                                                        label: {
                                                                            value: "Network Icon",
                                                                            help: "Provide a logo or an icon to make this stand out",
                                                                            force: 'right',
                                                                        },
                                                                        warn: {
                                                                            onBlur: true,
                                                                        },
                                                                        callback: {
                                                                            onChange: (element, formScope) => {
                                                                                let n = NetworkModel.clone(this.state.network);
                                                                                if (element.data.scope.isValid(true)) {
                                                                                    element.data.scope.bindImageValue().then((source) => {
                                                                                        n.icon.source = source;
                                                                                        this.setState({network: n});
                                                                                    }).catch(() => {
                                                                                        n.icon.source = null;
                                                                                        this.setState({network: n});
                                                                                    })
                                                                                } else {
                                                                                    n.icon.source = null;
                                                                                    this.setState({network: n});
                                                                                }
                                                                            }
                                                                        },
                                                                    },
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_CUSTOM_URL,
                                                                        type: 'URL',
                                                                        placeholder: "e.g. www.website.com/link/james",
                                                                        value: active.URL,
                                                                        length: [2, 100],
                                                                        label: {
                                                                            value: "Full link/URL",
                                                                            help: "We need a link for the website so we know where to send people that click on the card.",
                                                                            force: 'right',
                                                                        },
                                                                        warn: {
                                                                            onBlur: true,
                                                                            text: "Add the link shown in the address bar for that network (https://...)",
                                                                        }
                                                                    },
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_CUSTOM_USERNAME,
                                                                        type: 'Text',
                                                                        placeholder: "e.g. @james",
                                                                        value: active.username,
                                                                        length: [2, 30],
                                                                        label: {
                                                                            value: "Username (optional)",
                                                                            help: "You know how every social network asks for a username? What would yours be for this new custom network?",
                                                                            force: 'right',
                                                                        },
                                                                        warn: {
                                                                            onBlur: false,
                                                                            text: "Make sure the value is between 2 and 30 characters",
                                                                        }
                                                                    },
                                                                    {
                                                                        ID: NetworkManagerEdit.FIELD_COMMON_DESCRIPTION,
                                                                        type: 'Area',
                                                                        value: active.description,
                                                                        placeholder: "e.g. Contact me here for business inquiries only.",
                                                                        length: [0, 500],
                                                                        label: {
                                                                            value: "Description (optional)",
                                                                            help: "This description will be shown when someone is interested in accessing your network. You can use this to separate business from personal accounts."
                                                                        },
                                                                        warn: {
                                                                            onBlur: false,
                                                                            text: "Make sure the description is smaller than 500 characters",
                                                                        },
                                                                        columnSpan: 2,
                                                                    },
                                                                ]}
                                                                onUpdate={(formState) => {
                                                                    let n = NetworkModel.clone(this.state.network);

                                                                    let icon = formState.findFieldByID(NetworkManagerEdit.FIELD_CUSTOM_IMAGE);
                                                                    n.icon.file = !Helper.isEmpty(icon) && !Helper.isEmpty(icon.data.value) ? icon.data.value : null;

                                                                    let title = formState.findFieldByID(NetworkManagerEdit.FIELD_CUSTOM_TITLE);
                                                                    n.title = !Helper.isEmpty(title) && !Helper.isEmpty(title.data.value) ? title.data.value : null;

                                                                    let URL = formState.findFieldByID(NetworkManagerEdit.FIELD_CUSTOM_URL);
                                                                    n.URL = !Helper.isEmpty(URL) && !Helper.isEmpty(URL.data.value) ? URL.data.value : null;

                                                                    let username = formState.findFieldByID(NetworkManagerEdit.FIELD_CUSTOM_USERNAME);
                                                                    n.username = !Helper.isEmpty(username) && !Helper.isEmpty(username.data.value) ? username.data.value : null;

                                                                    let description = formState.findFieldByID(NetworkManagerEdit.FIELD_COMMON_DESCRIPTION);
                                                                    n.description = !Helper.isEmpty(description) && !Helper.isEmpty(description.data.value) ? description.data.value : null;


                                                                    this.setState({network: n});
                                                                }}

                                                            />

                                                        </div>
                                                    </section>
                                                    : null
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
                                        <div className={styles.label} data-highlight={true}>
                                            <p>
                                                {(!Helper.isEmpty(active) && !Helper.isEmpty(active.URL)
                                                    ? (
                                                        active.URL +
                                                        (this.state.activeSection === 0 && !Helper.isEmpty(active.username)
                                                            ? active.username
                                                            : "")
                                                    )
                                                    : "http://preview")
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.container}>
                                        <div className={styles.content}>
                                            <div className={styles.default}>
                                                <Network viewonly design={"big_icon"} network={active}/>
                                            </div>
                                            <div className={styles.group}>
                                                <div className={styles.item}><NetworkMini
                                                    css={{width: "60px", height: '60px'}} viewonly network={active}/>
                                                </div>
                                                <div className={styles.item}><NetworkMini
                                                    css={{width: "60px", height: '60px'}} viewonly network={active}/>
                                                </div>
                                                <div className={styles.item}><NetworkMini
                                                    css={{width: "50px", height: '50px'}} viewonly network={active}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.footer}>

                                <Button custom={{style: styles, className: "buttonCancel"}}
                                        title={"Cancel"}
                                        icon={<Icon icon round source={"arrow_back"} className={styles.icon}/>}
                                        type={ButtonType.DEFAULT}
                                        onClick={() => {
                                            this.props.history.push(Config.ROUTE_PAGE_PORTFOLIO)
                                        }}
                                />

                                <div className={styles.divider}/>

                                <Button custom={{style: styles, className: "buttonRight"}}
                                        title={"Edit and Go Live"}
                                        icon={<Icon icon round className={styles.icon} source={"flash_on"} alt={"Go"}/>}
                                        type={ButtonType.DEFAULT}
                                        active={this.validateStep(false)}
                                        onClick={() => {
                                            this.goOneStepForward()
                                        }}
                                />


                            </div>
                        </div>

                    </div>
                </div>

        )
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

    };






    goOneStepForward = () => {

        if(this.validateStep())
            this.goLive();

    };

    goLive = () => {

    };

    validateStep = ( handleWarn = true ) => {


        let flag = true;

        if (Helper.isEmpty(this.state.network)){ flag = false;}

        if(this.state.activeSection === 0) {
            if (Helper.isEmpty(this.state.network.username)) flag = false;
            if(handleWarn && flag === false && this.referenceToForm !== null && this.referenceToForm.current !== null){
                try{
                    this.referenceToForm.current.doUpdateFieldWarnValue(NetworkManagerEdit.FIELD_DEFAULT_USERNAME, true);

                }catch(e){console.error(e)}
            }
        }
        else if(this.state.activeSection === 1) {
            if (Helper.isEmpty(this.state.network.title)) flag = false;
            if (Helper.isEmpty(this.state.network.username)) flag = false;
            if (Helper.isEmpty(this.state.network.URL)) flag = false;
            if (Helper.isEmpty(this.state.network.icon) || Helper.isEmpty(this.state.network.icon.source)) flag = false;
            if(!this.referenceToForm.current.state.valid) flag = false;

            if(handleWarn && flag === false){
                try{
                    this.referenceToForm.current.doUpdateFieldWarnValue(NetworkManagerEdit.FIELD_CUSTOM_IMAGE, true);
                    this.referenceToForm.current.doUpdateFieldWarnValue(NetworkManagerEdit.FIELD_CUSTOM_USERNAME, true);
                    this.referenceToForm.current.doUpdateFieldWarnValue(NetworkManagerEdit.FIELD_CUSTOM_URL, true);
                    this.referenceToForm.current.doUpdateFieldWarnValue(NetworkManagerEdit.FIELD_CUSTOM_TITLE, true);

                }catch(e){console.error(e)}
            }
        }





        return flag;
    };










}


export default NetworkManagerEdit;