/**
 * Created by @VanSoftware on 2019-07-26.
 */

import React from 'react';
import styles from './ArticleManager.module.scss'
import cx from "classnames";
import {Helper} from "../../../config/Util";
import Config from "../../../config/Config";
import Icon from "../../Common/Icon/Icon";
import IconHelper from "../../Common/Icon/IconHelper";
import Form from "../../Common/Field/Form/Form";
import {ArticleCategoryModel, ArticleModel} from "../../../model/ArticleModel";
import SkillModel from "../../../model/SkillModel";
import Image from "../../Common/Image/Image";
import ImageModel from "../../../model/ImageModel";
import Modal from "../../Common/Modal/Modal";
import OverlayIndividual from "../../Common/Overlay/OverlayIndividual/OverlayIndividual";
import {Button, ButtonType} from "../../Common/Button/Button";
import BasePage from "../BasePage";
import {connect} from "react-redux";


class ArticleManager extends BasePage{

    static TYPE_ADD = "add";
    static TYPE_EDIT = "edit";


    static FIELD_COVER = "cover";
    static FIELD_TITLE = "title";
    static FIELD_SKILL = "skill";
    static FIELD_CATEGORY = "category";
    static FIELD_CONTENT = "content";
    static FIELD_SOURCE = "source";

    constructor(props){
        super(props);

        let page = Config.getPageByPath(this.props.location.pathname);
        let type = page.route === Config.ROUTE_PAGE_ARTICLE_ADD ? ArticleManager.TYPE_ADD : (page.route === Config.ROUTE_PAGE_ARTICLE_EDIT ? ArticleManager.TYPE_EDIT : null);
        if(type === null) this.deployErrorHandler();

        let {AID} = this.props.match.params;
        if(AID === null) this.deployErrorHandler();

        this.state = {
            type : type,
            AID : AID,
            article : new ArticleModel({}),

            chosenTab : null,
            contentContainerHeight : 0,
        };


        this.refToTopForm = React.createRef();
        this.refToContentForm = React.createRef();
        this.refToSourceForm = React.createRef();
        this.refToContentContainer = React.createRef();


    }


    componentDidMount() {
        super.componentDidMount();

        this.props.toggleScroll(false);
    }


    render() {
        return (
            <div className={cx(styles.Page, styles.ArticleManager, (this.state.type === ArticleManager.TYPE_EDIT ? styles.Edit : styles.Add) )} data-nav-fixed={true}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.content}>
                                <div className={styles.previewBackground}>
                                    <div className={styles.actions}>
                                        <div className={styles.container}>
                                            <div className={cx(styles.button, styles.help)}>
                                                <IconHelper
                                                    title={"Info"}
                                                    icon
                                                    round
                                                    source={"help"}
                                                    help={"The *single* uploaded image will be used for both a preview and a cover image of the article. The boxes are here to offer a glimpse of how the image will look resized."}
                                                    force={"top"}
                                                    className={styles.icon}
                                                />
                                            </div>
                                            <div className={styles.button} onClick={()=>{
                                                this.refToTopForm.current.findFieldByID(ArticleManager.FIELD_COVER).data.scope.element.button.current.click();
                                            }}>
                                                <Icon
                                                    title={"Replace"}
                                                    icon
                                                    round
                                                    source={"insert_photo"}
                                                    className={styles.icon}
                                                />
                                            </div>
                                            <div className={cx(styles.button, styles.delete)}
                                                onClick={()=>{
                                                    let a = this.state.article.clone();
                                                    a.image = new ImageModel({});
                                                    this.setState({article : a});
                                                }}
                                            >
                                                <Icon
                                                    title={"Delete"}
                                                    icon
                                                    round
                                                    source={"delete_outline"}
                                                    className={styles.icon}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.empty} data-visible={!(!Helper.isEmpty(this.state.article.image) && !Helper.isEmpty(this.state.article.image.source)) }>
                                        <div className={styles.content}>
                                            <div className={styles.upload} onClick={() => {
                                                this.refToTopForm.current.findFieldByID(ArticleManager.FIELD_COVER).data.scope.element.button.current.click();
                                            }}>
                                                <Icon
                                                    title={"Upload the cover image"}
                                                    icon
                                                    round
                                                    source={"add_photo_alternate"}
                                                    className={styles.icon}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.image} data-visible={!Helper.isEmpty(this.state.article.image) && !Helper.isEmpty(this.state.article.image.source) }>
                                        <div className={styles.content}>
                                            <Image className={styles.image} source={this.state.article.image} />
                                        </div>
                                    </div>

                                </div>
                                <div className={styles.previewCover}>

                                    <div className={styles.empty} data-visible={!(!Helper.isEmpty(this.state.article.image) && !Helper.isEmpty(this.state.article.image.source)) }>
                                        <div className={styles.content}>
                                            <div className={styles.upload}>
                                                <Icon
                                                    title={"Upload the cover image"}
                                                    icon
                                                    round
                                                    source={"add_photo_alternate"}
                                                    className={styles.icon}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.image} data-visible={!Helper.isEmpty(this.state.article.image) && !Helper.isEmpty(this.state.article.image.source) }>
                                        <div className={styles.content}>
                                            <Image className={styles.image} source={this.state.article.image} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.content}>
                                <Form
                                    columns={2}
                                    ref={this.refToTopForm}
                                    fields={[
                                        {
                                            ID: ArticleManager.FIELD_COVER,
                                            visible : false,
                                            type: 'File',
                                            fileType: "image",
                                            label: {value: "Cover",},
                                            warn: {onBlur: false,},
                                            callback: {
                                                onChange: (element, formScope) => {
                                                    let a = ArticleModel.clone(this.state.article);
                                                    if (element.data.scope.isValid(true)) {
                                                        element.data.scope.bindImageValue().then((source) => {
                                                            a.image.source = source;
                                                            this.setState({article: a});
                                                        }).catch(() => {
                                                            a.image.source = null;
                                                            this.setState({article: a});
                                                        })
                                                    } else {
                                                        a.image.source = null;
                                                        this.setState({article: a});
                                                    }
                                                }
                                            },
                                        },
                                        {
                                            ID: ArticleManager.FIELD_TITLE,
                                            type: 'Text',
                                            value : Helper.sanitize(this.state.article.title, ""),
                                            placeholder: "e.g. My awesome article",
                                            length: [2, 80],
                                            label: {
                                                value: "Title",
                                                help: "Give your article/portfolio piece a title.",
                                                force: 'right',
                                            },
                                            warn: {
                                                onBlur: false,
                                                text: "Make sure the title is between 2 and 80 characters",
                                            },
                                            columnSpan : 2,
                                        },
                                        {
                                            ID: ArticleManager.FIELD_SKILL,
                                            type: 'Tag',
                                            placeholder: "e.g. Used: ReactJS, NodeJS, Sketch, Notion, ...",
                                            value : (()=>{
                                                if(this.state.article.skills.length === 0 ) return [];
                                                else {
                                                    return this.state.article.skills.map(element => ({
                                                        AID: element.AID,
                                                        title: element.title
                                                    }));
                                                }
                                            })(),
                                            source : (()=>{
                                                if(Config.DUMMY_SKILLS.length === 0 ) return [];
                                                else {
                                                    return Config.DUMMY_SKILLS.map(element => ({
                                                        AID: element.AID,
                                                        title: element.title
                                                    }));
                                                }
                                            })(),
                                            length : [1,200],
                                            label: {
                                                value: "Skills",
                                                help: "In order to advertise your work better, you could add some skills, products or techniques that you used or helped with this article/project.",
                                                force: 'right',
                                            },
                                            warn: {
                                                onBlur: false,
                                                text: "Please add between at least one skill to your article.",
                                            },
                                        },
                                        {
                                            ID: ArticleManager.FIELD_CATEGORY,
                                            type: 'Tag',
                                            placeholder: "e.g. Design, Development, Economy",
                                            value : (()=>{
                                                if(this.state.article.categories.length === 0 ) return [];
                                                else {
                                                    return this.state.article.categories.map(element => ({
                                                        AID: element.AID,
                                                        title: element.title
                                                    }));
                                                }
                                            })(),
                                            source : (()=>{
                                                if(Config.DUMMY_CATEGORIES.length === 0 ) return [];
                                                else {
                                                    return Config.DUMMY_CATEGORIES.map(element => ({
                                                        AID: element.AID,
                                                        title: element.title
                                                    }));
                                                }
                                            })(),
                                            length : [1,5],
                                            label: {
                                                value: "Categories",
                                                help: "To make your portfolio of articles more organized, it is advised that you assign a category or more to this element. It makes things clearer and easier for your visitors.",
                                                force: 'right',
                                            },
                                            warn: {
                                                onBlur: false,
                                                text: "Please add between at least one category to your article (max 5).",
                                            },
                                            accentColor : "blue",
                                        },
                                ]}

                                    onUpdate={(formState) => {
                                        let a = ArticleModel.clone(this.state.article);


                                        let image = formState.findFieldByID(ArticleManager.FIELD_COVER);
                                        a.image.file = !Helper.isEmpty(image) && !Helper.isEmpty(image.data.value) ? image.data.value : null;


                                        let title = formState.findFieldByID(ArticleManager.FIELD_TITLE);
                                        a.title = !Helper.isEmpty(title) && !Helper.isEmpty(title.data.value) ? title.data.value : null;


                                        let skills = formState.findFieldByID(ArticleManager.FIELD_SKILL);
                                        a.skills = !Helper.isEmpty(skills) && !Helper.isEmpty(skills.data.value) ? (() => {
                                            let f = [];
                                            skills.data.value.forEach((element) => {
                                                f.push(new SkillModel(element))
                                            });
                                            return f;
                                        })() : null;

                                        let categories = formState.findFieldByID(ArticleManager.FIELD_CATEGORY);
                                        a.categories = !Helper.isEmpty(categories) && !Helper.isEmpty(categories.data.value) ? (() => {
                                            let f = [];
                                            categories.data.value.forEach((element) => {
                                                f.push(new ArticleCategoryModel(element))
                                            });
                                            return f;
                                        })() : null;


                                        this.setState({article: a});
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx(styles.container, styles.main)}>
                    <div className={styles.content}>
                        <div className={styles.tabs}>
                            <div className={styles.tab}>
                                {
                                    this.state.chosenTab === 0
                                        ? <div className={styles.content}>
                                            <Icon className={styles.icon} icon round source={"description"}/>
                                            <p>Write from scratch</p>
                                        </div>
                                        : null
                                }
                                {
                                    this.state.chosenTab === 1
                                        ? <div className={styles.content}>
                                            <Icon className={styles.icon} icon round source={""}/>
                                            <p>Connect to link</p>
                                        </div>
                                        : null
                                }
                                <div className={styles.indicator}/>
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.content} ref={this.refToContentContainer} style={{minHeight: this.state.contentContainerHeight}}>

                                {
                                    this.state.chosenTab === 0
                                        ? <div className={styles.tab} data-tab={0}
                                               data-active={this.state.chosenTab === 0}>
                                            <Form
                                                columns={1}
                                                ref={this.refToContentForm}
                                                fields={[
                                                    {
                                                        ID: ArticleManager.FIELD_CONTENT,
                                                        type: 'EditorJSField',
                                                        value: this.state.article.content,
                                                        placeholder: "Start writing here. Add images, quotes, tables and more...",
                                                        label: {
                                                            value: "Content",
                                                        },
                                                        columnSpan: 2,
                                                        styleType: "clear",
                                                    },
                                                ]}
                                            />
                                        </div>
                                        : null
                                }
                                {
                                    this.state.chosenTab === 1
                                        ? <div className={styles.tab} data-tab={1}>
                                            <Form
                                                columns={1}
                                                ref={this.refToSourceForm}
                                                fields={[
                                                    {
                                                        ID: ArticleManager.FIELD_SOURCE,
                                                        type: 'URL',
                                                        placeholder: "e.g. www.behance.com/john/project",
                                                        value: this.state.article.source,
                                                        length: [2, 400],
                                                        label: {
                                                            value: "Link to article source",
                                                            help: "Instead of duplicating content, you could just link this article to your source, be it Behance, Medium, your website, or some other place",
                                                            force: 'right',
                                                        },
                                                        warn: {
                                                            onBlur: false,
                                                            text: "Add the link shown in the address bar for that item (https://...)",
                                                        }
                                                    },
                                                ]}

                                                onUpdate={(formState) => {
                                                    let a = ArticleModel.clone(this.state.article);

                                                    let source = formState.findFieldByID(ArticleManager.FIELD_SOURCE);
                                                    a.source = !Helper.isEmpty(source) && !Helper.isEmpty(source.data.value) ? source.data.value : null;

                                                    this.setState({article: a});
                                                }}
                                            />
                                        </div>
                                        :null
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div className={cx(styles.container, styles.final)}>
                    <div className={styles.content}>
                        <div className={styles.buttons}>
                            <Button
                                custom={{style: styles, className: "buttonSave"}}
                                type={ButtonType.DEFAULT}
                                onClick={()=>{this.onSubmit()}}
                                title={"Publish Article"}
                                icon={<Icon icon round source={"public"} className={styles.icon} />}

                            />
                            <Button custom={{style: styles, className: "buttonCancel"}} type={ButtonType.OUTLINE} onClick={()=>{this.onCancel()}} title={"Cancel"} />
                        </div>
                    </div>
                </div>


                <Modal
                    styles={styles}
                    visible={this.state.chosenTab === null}
                    show={{header : false, footer : false}}
                >

                   <div className={styles.main}>
                       <div className={styles.title}><p>Choose an article <b>type</b></p></div>
                       <div className={styles.buttons}>
                           <div className={styles.button} data-active={this.state.chosenTab === 0} onClick={()=>{this.chooseTab(0)}}>
                               <div className={styles.content}>
                                   <div className={styles.main}>
                                       <Icon className={styles.icon} icon round source={"description"} />
                                   </div>
                                   <div className={styles.title}>
                                       <p>Write from scratch</p>
                                   </div>
                                   <div className={styles.subtitle}>
                                       <p>Want to write something for your visitors or maybe showcase your work? Write your article here...</p>
                                   </div>
                               </div>
                           </div>

                           <div className={styles.button} data-active={this.state.chosenTab === 1} onClick={()=>{this.chooseTab(1)}}>
                               <div className={styles.content}>
                                   <div className={styles.main}>
                                       <Icon className={styles.icon} icon round source={"link"} />
                                   </div>
                                   <div className={styles.title}>
                                       <p>Connect to external link</p>
                                   </div>

                                   <div className={styles.subtitle}>
                                       <p>Advertising some external item from Medium, Behance or maybe Github? Add the link.</p>
                                   </div>
                               </div>
                           </div>

                           <div className={cx(styles.button, styles.back)} onClick={()=>{this.props.history.push(Config.ROUTE_PAGE_PORTFOLIO)}}>
                               <div className={styles.content}>
                                   <div className={styles.main}>
                                       <Icon className={styles.icon} icon round source={"arrow_back"} />
                                   </div>
                                   <div className={styles.title}>
                                       <p>Return</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                </Modal>
                <OverlayIndividual styles={styles} visible={this.state.chosenTab === null}/>

            </div>
        );
    }


    deployErrorHandler(){
        alert("Oops");
        this.props.history.push(Config.ROUTE_PAGE_PORTFOLIO);
    }

    chooseTab(tab){
        if(this.state.chosenTab !== tab ) {
            this.setState({chosenTab : tab}, ()=>{});
            this.props.toggleScroll(true);
        }
    }


    onSubmit = () => {
        let flag = true;

        if(!this.refToTopForm.current.isValid(true)) flag = false;


        if(this.state.chosenTab === 0){
            if(!this.refToContentForm.current.isValid(true)) flag = false;
        } else if (this.state.chosenTab === 1) {
            if (!this.refToSourceForm.current.isValid(true)) flag = false;
        }


        console.log(flag);
    };


    onCancel = () => {

    }


}

export default connect(
    null,
    (dispatch) => {
        return {
            toggleScroll: (enabled = true) => {
                return enabled
                    ? dispatch({type: Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_ENABLE})
                    : dispatch({type: Config.REDUX_ACTION_VIEW_COMMON_DOCUMENT_BACKGROUND_SCROLL_DISABLE})
            }
        }
    })(ArticleManager);