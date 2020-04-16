/**
 * Created by @VanSoftware on 2019-07-13.
 */
import React from 'react';
import styles from './ArticlePreview.module.scss';
import cx from "classnames";
import Overlay from "../../Common/Overlay/OverlayGlobal/OverlayGlobal";
import Cover from "../../Structure/Cover/Cover";
import BasePage from "../BasePage";



class ArticlePreview extends BasePage{
    componentDidMount() {
        super.componentDidMount();
    }

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