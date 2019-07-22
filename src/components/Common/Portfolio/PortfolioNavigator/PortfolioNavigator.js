/**
 * Created by @VanSoftware on 2019-07-22.
 */

import React, {Component} from 'react';
import styles from './PortfolioNavigator.module.scss'
import PropTypes from "prop-types";
import {ArticleCategoryModel} from "../../../../model/ArticleModel";
import SkillModel from "../../../../model/SkillModel";
import Icon from "../../Icon/Icon";

class PortfolioNavigator extends Component{

    static CATEGORY_SKILL = new ArticleCategoryModel({AID : "-1"});

    static propTypes = {
        activeCategory: PropTypes.shape(ArticleCategoryModel.propTypes),
        categories : PropTypes.arrayOf(PropTypes.shape(ArticleCategoryModel.propTypes)),
        activeSkill: PropTypes.shape(SkillModel.propTypes),
        skills : PropTypes.arrayOf(PropTypes.shape(SkillModel.propTypes)),
    };

    static defaultProps = {
        categories : [],
        skills : [],
    };

    constructor(props){
        super(props);

        this.state = { isSkillBoxVisible : false, };

        this.skillBox = React.createRef();
        this.skillBoxCaller = React.createRef();
    }



    componentDidMount() {
        document.addEventListener('mousedown', this.handleSkillBox);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleSkillBox);
    }

    handleSkillBox = (event) => {
        try {
            if (this.skillBox === null || this.skillBoxCaller === null) return;

            let outside = !this.skillBoxCaller.current.contains(event.target);
            if (outside && this.state.isSkillBoxVisible) this.setState({isSkillBoxVisible: false});
        }catch (e) {
            console.error(e);
        }
    };


    render() {
        return (
            <div className={styles.PortfolioNavigator}>
                <div className={styles.container}>
                    <div className={styles.active}>
                        <p>{
                            this.props.activeCategory.AID !== PortfolioNavigator.CATEGORY_SKILL.AID
                                ? this.props.activeCategory.title
                                : `Skill: ${this.props.activeSkill.title}`
                        }
                        </p>
                    </div>
                    <div className={styles.categories}>
                        {
                            this.props.categories.map((element,index)=>(
                                <div
                                    key={index}
                                    className={styles.category}
                                    data-active={element.AID === this.props.activeCategory.AID}
                                    onClick={()=>{this.props.setActiveCategory(element)}}
                                >
                                    <div className={styles.content}>
                                        <p>{element.title}</p>
                                    </div>

                                </div>
                            ))
                        }
                        <div
                            className={styles.category}
                            data-category={"skill"}
                            data-skill-visible={this.state.isSkillBoxVisible}
                            data-active={this.props.activeCategory.AID === PortfolioNavigator.CATEGORY_SKILL.AID}
                            ref={this.skillBoxCaller}
                            onClick={()=>{this.setState({isSkillBoxVisible : ! this.state.isSkillBoxVisible }); }}
                        >
                            <div className={styles.content}>
                                <p>Skill: </p>
                                <div className={styles.chosen}>
                                    <p>{this.props.activeSkill.title}</p>
                                    <Icon
                                        icon
                                        className={styles.icon}
                                        round
                                        source={"keyboard_arrow_down"}
                                        />
                                    <div className={styles.skillBox} ref={this.skillBox} data-visible={this.state.isSkillBoxVisible}>
                                        {
                                            this.props.skills.map((element, index)=>(
                                                <div
                                                    key={index}
                                                    className={styles.skill}
                                                    onClick={()=>{this.props.setActiveSkill(element)}}
                                                    data-active={this.props.activeCategory.AID === PortfolioNavigator.CATEGORY_SKILL.AID && element.AID === this.props.activeSkill.AID}
                                                >
                                                    <div className={styles.content}>
                                                        <p>{element.title}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
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


export default PortfolioNavigator;