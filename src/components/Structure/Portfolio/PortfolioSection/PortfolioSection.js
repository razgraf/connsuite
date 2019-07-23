/**
 * Created by @VanSoftware on 2019-07-22.
 */

import React, {PureComponent} from 'react';
import styles from './PortfolioSection.module.scss'
import PortfolioNavigator from "../PortfolioNavigator/PortfolioNavigator";
import Article from "../../../Common/Article/Article";
import PropTypes from "prop-types";
import {ArticleCategoryModel, ArticleModel} from "../../../../model/ArticleModel";
import SkillModel from "../../../../model/SkillModel";


class PortfolioSection extends PureComponent{


    static propTypes = {
        articles : PropTypes.arrayOf(PropTypes.shape(ArticleModel.propTypes)),
        categories : PropTypes.arrayOf(PropTypes.shape(ArticleCategoryModel.propTypes)),
        skills : PropTypes.arrayOf(PropTypes.shape(SkillModel.propTypes)),
    };

    static defaultProps = {

    };


    constructor(props){
        super(props);


        this.state = {
            articles : this.props.articles,
            categories : this.props.categories,
            skills : this.props.skills,
        };


        this.state.activeSkill = this.state.skills[0].clone();
        this.state.activeCategory = this.state.categories[0].clone();


    }




    render() {

        let fitting =  this.state.articles.filter((element) => {

            if(this.state.activeCategory.AID !== PortfolioNavigator.CATEGORY_SKILL.AID){
                if((element.categories.filter(category => category.AID === this.state.activeCategory.AID)).length === 0)
                    return false;
            }
            else {

                if((element.skills.filter(skill => skill.AID === this.state.activeSkill.AID)).length === 0)
                    return false;
            }


            return true;
        })

        return (
            <div className={styles.PortfolioSection}>
                <PortfolioNavigator
                    activeCategory={this.state.activeCategory}
                    categories={this.state.categories}
                    activeSkill={this.state.activeSkill}
                    skills={this.state.skills}
                    setActiveSkill={this.setActiveSkill.bind(this)}
                    setActiveCategory={this.setActiveCategory.bind(this)}

                />
                <div className={styles.grid}>
                    {
                        fitting.map((element,index)=> (<Article key={index} article={element} />))
                    }
                    {
                        fitting.length < 6
                            ? Array.from(Array( (6 - fitting.length)).keys() ).map((element, index) => (
                                <div key={"empty-"+index} data-empty={"true"}>
                                    <div className={styles.shape}>
                                        <div/>
                                        <div/>
                                    </div>
                                </div>
                            ))
                            : null
                    }
                </div>
            </div>
        );
    }


    setActiveSkill(skill){
        this.setState({
                activeCategory : PortfolioNavigator.CATEGORY_SKILL,
                activeSkill : skill.clone()
        });
    }
    setActiveCategory(category){
        this.setState({
            activeCategory : category.clone()
        });
    }
}


export default PortfolioSection;