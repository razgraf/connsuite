/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import styles from './Network.module.scss';
import PropTypes from "prop-types";
import {Helper} from "../../../config/Util";
import Icon from "../Icon/Icon";
import {Button, ButtonType} from "../Button/Button";



class Network extends Component{

    static propTypes ={
        title :  PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired,
    };


    render() {
        return(
            <div className={styles.Network}>
                <div className={styles.container}>

                    <div className={styles.content}>
                        <div className={styles.header}>
                            <div className={styles.indicator}>
                                <div/>
                            </div>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.icon}>
                                <img alt={this.props.title} src={this.props.icon} />
                            </div>
                        </div>
                        <div className={styles.footer}>
                            <p>View Details</p>
                        </div>
                    </div>
                    <div className={styles.overlay}>
                        <div className={styles.content}>
                            <div className={styles.actions}>
                                <div className={styles.link}>
                                    <Icon icon source={"link"} className={styles.icon}/>
                                    <p>Visit this networks</p>
                                </div>

                                <Button
                                    custom={{
                                        style : styles,
                                        className : "view"
                                    }}
                                    title={"View Details"}
                                    type={ButtonType.DEFAULT}
                                    onClick={(e)=>{ console.log("Open Cover"); }}
                                />
                            </div>
                        </div>


                    </div>
                </div>



                <div className={styles.info}>
                    <div className={styles.title}><p>{this.props.title}</p></div>
                    {
                        !Helper.isEmpty(this.props.description) ?
                            <div className={styles.description}><p>{this.props.description}</p></div> : null
                    }
                </div>
            </div>
        )
    }


}

export default Network;