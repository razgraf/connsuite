/**
 * Created by @VanSoftware on 2019-07-22.
 */

import React, {Component} from 'react';
import styles from './Article.module.scss'
import {ArticleModel} from "../../../model/ArticleModel";
import Image from "../Image/Image";
import {Button, ButtonType} from "../Button/Button";

class Article extends Component{


    static propTypes = ArticleModel.propTypes;

    static defaultProps = ArticleModel.defaultProps;

    render() {
        return (
            <div className={styles.Article}>
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
                                            title={"Read more"}
                                            onClick={()=>{alert("Clicky");}}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Article;