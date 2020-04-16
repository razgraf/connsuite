/**
 * Created by @VanSoftware on 2019-07-27.
 */

import React, {PureComponent} from 'react';
import styles from './FieldDataset.module.scss'
import PropTypes from "prop-types";
import {Helper} from "../../../../config/Util";


class FieldDataset extends PureComponent{


    constructor(props){
        super(props);

        this.refToParentElement = React.createRef();
        this.state = {
            matchingSource : []
        };
    }

    static propTypes = {
        source : PropTypes.arrayOf(PropTypes.shape({
            AID : PropTypes.string,
            title : PropTypes.string
        })),
        styles : PropTypes.object,
        onClick : PropTypes.func,
        visible : PropTypes.bool,
        match : PropTypes.string,
        reference : PropTypes.object,
        link : PropTypes.object,
    };

    static defaultProps = {
        visible : false,
        match : "",
    };


    static getDerivedStateFromProps(nextProps, prevState){
        let nextState = {...prevState};

        let matchingSource = [];
        nextProps.source.forEach((element) => {
            if (element.title.toLowerCase().indexOf(nextProps.match.toLowerCase()) > -1)
                matchingSource.push(element);
        });

        nextState.matchingSource = matchingSource;


        return nextState;

    }


    componentDidMount() {
        document.addEventListener("keydown", this.handleOnKeyDown);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleOnKeyDown)
    }

    render() {


        return (
            <div ref={this.refToParentElement} className={Helper.dynamicClass(styles, this.props.styles, "FieldDataset")} data-visible={this.props.visible}>
                <ul className={Helper.dynamicClass(styles, this.props.styles, "content")}>
                    {
                        this.state.matchingSource.map((element,index) =>

                                (
                                    <li
                                        tabIndex={index}
                                        key={index}
                                        className={Helper.dynamicClass(styles, this.props.styles, "item")}
                                        onClick={(e)=>{
                                            this.props.onClick(element);
                                        }}>
                                        <span>{element.title}</span>
                                    </li>
                                )



                        )
                    }
                </ul>
            </div>
        )
    }

    focusPreviousElement = () => {
        if(Helper.isEmpty(this.state.matchingSource) || this.state.matchingSource.length === 0) return;

        let elements = this.refToParentElement.current.querySelector("ul").getElementsByTagName("li");
        let previous = null;
        for(let i = 0; i < elements.length; i++ ){
            if(elements[i] === document.activeElement) {
                previous = (i === 0  ? null : i-1);
                break;
            }
        }
        if(previous === null) this.props.link.current.focus();
        else elements[previous].focus();
    };



    focusNextElement = () => {
        if(Helper.isEmpty(this.state.matchingSource) || this.state.matchingSource.length === 0) return;
        let elements = this.refToParentElement.current.querySelector("ul").getElementsByTagName("li");
        let next = 0;
        for(let i = 0; i < elements.length; i++ ){
            if(elements[i] === document.activeElement) {
                next = (i === elements.length - 1  ? 0 : i+1);
                break;
            }
        }
        elements[next].focus();
    };


    handleOnKeyDown = (event) => {
        if(((typeof event.which == "number") ? event.which : event.keyCode) === 40) {
            /**
             * Key Down
             */
            if (!this.props.visible) return;
            if(this.refToParentElement.current.contains(event.target)){
                this.focusNextElement();
            }
        }
        else if(((typeof event.which == "number") ? event.which : event.keyCode) === 38) {
            /**
             * Key Up
             */
            if (!this.props.visible) return;
            if(this.refToParentElement.current.contains(event.target)){
                this.focusPreviousElement();
            }
        }
        else if(((typeof event.which == "number") ? event.which : event.keyCode) === 13) {
            /**
             * Enter
             */
            if(!this.props.visible) return;

            let elements = this.refToParentElement.current.querySelector("ul").getElementsByTagName("li");
            for(let i = 0; i < elements.length; i++ ) {
                if (elements[i] === document.activeElement) {
                    elements[i].click();
                    break;
                }
            }


        }
    }



};



export default FieldDataset;