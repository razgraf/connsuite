/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SectionHeader.module.scss';
import {Helper} from "../../../config/Util";
import PropTypes from 'prop-types';
import {Button, ButtonType} from "../Button/Button";

class SectionHeader extends Component{

    static propTypes ={
        title :  PropTypes.string.isRequired,
        icon : PropTypes.string,

        titleActions : PropTypes.arrayOf(
            PropTypes.shape({
                    label : PropTypes.string,
                    icon :  PropTypes.string,
                    info : PropTypes.string,
                    onClick : PropTypes.func.isRequired
                }
            )),
        actions : PropTypes.arrayOf(Button),
    };

    render() {
        return (
            <div className={styles.SectionHeader}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <div className={styles.titleText}>
                            <p>{this.props.title}</p>
                            {!Helper.isEmpty(this.props.icon) ? <i className={"material-icons"}>{this.props.icon}</i> : null}
                        </div>
                        <div className={styles.titleActions}>
                            {
                                Helper.isEmpty(this.props.titleActions) ? null:
                                    this.props.titleActions.map(
                                        (element,index)=>
                                            <div key={index} onClick={(e)=>{ element.onClick(e); }} className={"action"}>
                                                {!Helper.isEmpty(element.icon) ? <i className={"material-icons"}>{element.icon}</i> : null}
                                                {!Helper.isEmpty(element.label) ? <i className={"material-icons"}>{element.label}</i> : null}
                                            </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className={styles.actions}>
                        {
                            Helper.isEmpty(this.props.actions) ? null:
                                this.props.actions.map(
                                    (element,index)=> <Button key={index} {...element} />
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default SectionHeader;