/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React, {Component} from 'react';
import styles from './ArticlePreview.module.scss';
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";



class ArticlePreview extends Component{
    render() {
        return (
            <div className={cx(styles.Page, styles.Article)}>
                <Overlay/>
                <Cover/>
                <div className={styles.container}>

                </div>
            </div>
        );
    }
}

export default ArticlePreview;