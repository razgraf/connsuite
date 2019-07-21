import React from 'react';
import styles from './Skill.module.scss'
import PropTypes from "prop-types";

const Skill = (props) => {


    return (
        <span className={styles.Skill}>
            <span className={styles.container}>
                <span className={styles.content}><span>{props.label}</span></span>
                <span className={styles.tooltip}>
                    <span className={styles.container}>
                        <span className={styles.button}><span>Button 1</span></span>
                        <span className={styles.divider}/>
                        <span className={styles.button}><span>Button 2</span></span>
                    </span>
                    <span className={styles.arrow}/>
                </span>
            </span>

        </span>
    )
};

Skill.propTypes = {
    label : PropTypes.string
};

export default Skill;