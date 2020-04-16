/**
 * Created by @VanSoftware on 2019-07-12.
 */

import React from 'react';
import styles from './ArticleAdd.module.scss'
import {Link} from "react-router-dom";
import Config from "../../../../config/Config";


const ArticleAdd = (props) => {

    return (
        <Link to={{pathname : Config.ROUTE_PAGE_ARTICLE_ADD}}>
            <div className={styles.ArticleAdd}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.shape}>
                            <div className={styles.vert}/>
                            <div className={styles.horiz}/>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.title}><p>Create Article</p></div>
                </div>
            </div>
        </Link>
    )
};

export default ArticleAdd;