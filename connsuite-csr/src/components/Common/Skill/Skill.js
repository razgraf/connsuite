import React from 'react';
import styles from './Skill.module.scss'
import PropTypes from "prop-types";
import {Helper} from "../../../config/Util";
import {HashLink} from "react-router-hash-link";

const Skill = (props) => {


    return (
        <span className={styles.Skill}>
            <span className={styles.container}>
                <span className={styles.content}><span>{props.label}</span></span>
                {
                    !Helper.isEmpty(props.actions)
                        ? (<span className={styles.tooltip}>
                                <span className={styles.container}>
                                    {
                                        props.actions.map((element,index) => {

                                            return(
                                                <React.Fragment key={index}>
                                                    {(index !== 0) ? <span className={styles.divider}/> : null}
                                                    <HashLink
                                                        smooth
                                                        to={element.to}
                                                        onClick={element.onClick}>
                                                        <span className={styles.button}><span>{element.label}</span></span>
                                                    </HashLink>
                                                </React.Fragment>
                                            )
                                            }
                                        )
                                    }

                                </span>
                                <span className={styles.arrow}/>
                            </span>)
                        : null
                }
            </span>

        </span>
    )
};

Skill.propTypes = {
    label : PropTypes.string.isRequired,
    actions : PropTypes.arrayOf(PropTypes.shape({
        label : PropTypes.string.isRequired,
        to : PropTypes.string,
        onClick : PropTypes.func
    }))
};



export default Skill;