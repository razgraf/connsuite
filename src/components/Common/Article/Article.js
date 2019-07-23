/**
 * Created by @VanSoftware on 2019-07-22.
 */

import React, {Component} from 'react';
import styles from './Article.module.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import Image from "../Image/Image";
import {Button, ButtonType} from "../Button/Button";
import Icon from "../Icon/Icon";
import {Link} from "react-router-dom";
import Config from "../../../config/Config";

class Article extends Component{


    static propTypes = ArticleModel.propTypes;

    static defaultProps = ArticleModel.defaultProps;

    render() {
        return (
            <Link to={Config.ROUTE_PAGE_ARTICLE_CLEAN + this.props.article.AID + "/" + this.props.article.titleEncoded} className={styles.Article}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <Image
                            className={styles.image}
                            source={this.props.article.image}
                        />
                    </div>
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.top}>
                                {
                                    this.props.article.type === ArticleModel.TYPE_EXTERNAL
                                        ? <div className={styles.indicator}>
                                            <Icon title={"External link"} icon round source={"link"} className={styles.icon}/>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.content}>
                                    <div className={styles.title}>
                                        <p>{this.props.article.title}</p>
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.skills}>
                                            <p>{this.props.article.skills.map((element,key)=>{
                                                return (key === 0 ? "" : ", ") + element.title;
                                            })}</p>
                                        </div>
                                        <Button
                                            custom={{style: styles, className: "button"}}
                                            type={ButtonType.MINI}
                                            title={ this.props.article.type === ArticleModel.TYPE_EXTERNAL ? "Visit article" :  "Read article"}
                                            onClick={()=>{alert("Clicky");}}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}


export default Article;