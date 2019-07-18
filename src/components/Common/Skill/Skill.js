import React from 'react';
import styles from './Skill.module.scss'
import PropTypes from "prop-types";

const Skill = (props) => {


    return (
        <div className={styles.Skill}>
            <div className={styles.container}>
                <div className={styles.content}><p>{props.label}</p></div>
                <div className={styles.tooltip}>
                    <div className={styles.container}>
                        <div className={styles.button}><p>Button 1</p></div>
                        <div className={styles.divider}/>
                        <div className={styles.button}><p>Button 2</p></div>
                    </div>
                    <div className={styles.arrow}/>
                </div>
            </div>

        </div>
    )
};

Skill.propTypes = {
    label : PropTypes.string
};

export default Skill;