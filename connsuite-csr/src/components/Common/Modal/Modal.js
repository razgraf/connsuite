import React, {PureComponent} from 'react';
import styles from './Modal.module.scss'
import PropTypes from 'prop-types';
import Icon from "../Icon/Icon";
import {Helper} from "../../../config/Util";
import {Button, ButtonType} from "../Button/Button";

class Modal extends PureComponent{

    static propTypes = {
        title : PropTypes.string,
        closable : PropTypes.bool,
        visible : PropTypes.bool,

        show : PropTypes.shape({
            header : PropTypes.bool,
            footer : PropTypes.bool,
        }),

        styles : PropTypes.object,

        onClose : PropTypes.func,
        onOpen : PropTypes.func,

        footer : PropTypes.shape({
            closeTitle:  PropTypes.string,
            buttons : PropTypes.arrayOf(PropTypes.element)
        })
    };

    static defaultProps = {
        title : "Modal",
        closable : true,
        visible : false,
        show : {
            header : true,
            footer : true
        },
        onClose : () => {},
        onOpen : () => {},


        footer : {
            closeTitle : "Close"
        }
    };

    constructor(props){
        super(props);
        this.state = {
            visible : this.props.visible
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(prevState !== null && nextProps.visible && !prevState.visible) {
            nextProps.onOpen();
        }

        return {visible : nextProps.visible}
    }

    render() {
        return (
            <div className={Helper.dynamicClass(styles, this.props.styles, "Modal")} data-visible={this.props.visible}>
                <div className={Helper.dynamicClass(styles, this.props.styles, "container")}>
                    <div className={Helper.dynamicClass(styles, this.props.styles, "card")}>
                        <div className={Helper.dynamicClass(styles, this.props.style, "content")}>
                            {
                                this.props.show.header
                                    ? <div className={Helper.dynamicClass(styles, this.props.style, "modal-header")}>
                                        <div className={Helper.dynamicClass(styles, this.props.style, "title")}>
                                            <p>{this.props.title}</p>
                                        </div>
                                        <div className={Helper.dynamicClass(styles, this.props.style, "action")}>
                                            {
                                                this.props.closable
                                                    ? <div className={Helper.dynamicClass(styles, this.props.style, "close")} onClick={this.props.onClose}>
                                                        <Icon icon round source={"close"} className={Helper.dynamicClass(styles, this.props.style, "icon")}/>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className={Helper.dynamicClass(styles, this.props.styles, "modal-body")}>
                                {this.props.children}
                            </div>

                            {
                                this.props.show.footer
                                    ? <div className={Helper.dynamicClass(styles, this.props.styles, "modal-footer")}>
                                        <div className={Helper.dynamicClass(styles, this.props.styles, "content")}>
                                        {
                                            this.props.footer.buttons
                                        }
                                        {
                                            this.props.closable
                                                ?
                                                <Button custom={{style : styles, className : "modal-buttonClose"}} type={ButtonType.SIMPLE} onClick={this.props.onClose} title={this.props.footer.closeTitle}/>
                                                : null
                                        }


                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>

            </div>
        );
    }


}

export default Modal;