import React, {Component} from 'react';
import {Helper} from "../../../../config/Util";
import styles from './BaseField.module.scss';
import FieldLabel from "../FieldLabel/FieldLabel";
import BaseFieldModel from "../BaseFieldModel";
import PropTypes from "prop-types";


class BaseField extends Component{


    static propTypes = {
        columnSpan : PropTypes.number,
        data : PropTypes.shape({...BaseFieldModel.propTypes.data}),
        action : PropTypes.shape({...BaseFieldModel.propTypes.action}),

    };

    static defaultProps = {
        ...BaseFieldModel.defaultProps,
        columnSpan : 1,
    };


    constructor(props){
        super(props);

        this.state = {
            warnText : "Please check this field again",
        };

        this.element =  {
            container: React.createRef(),
            label: React.createRef(),
            field :  React.createRef(),
        };


        this.props.action.doDefineScope(this.props.data.ID, this);

    }

    componentDidMount() {
        if(!Helper.isEmpty(this.props) && !Helper.isEmpty(this.props.action)  && !Helper.isEmpty(this.props.action.callback)  && !Helper.isEmpty(this.props.action.callback.onInitialized))
            this.props.action.callback.onInitialized(this);
    }



    render() {
        return (
            <div className={styles.Base} data-warn={this.props.data.warn.value} ref={this.element.container}  style={{gridColumn : "span " + this.props.columnSpan}} data-visible={this.props.visible} data-style_type={this.props.styleType}>
                <div className={styles.container}>
                    <FieldLabel data = {{ ...this.props.data.label, warn :this.props.data.warn.value} } referece={this.element.label} />
                    {this.field()}
                    <div className={styles.warn}>
                        <div className={styles.content}>
                            <p>{
                                !Helper.isEmpty(this.props.data.warn.text)
                                    ? this.props.data.warn.text
                                    : (!Helper.isEmpty(this.state.warnText) ? this.state.warnText : "Please check this field again")
                            }
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

    field(){
        console.error("Implement Field.field()", this);
        return <div className={styles.field}><p style={{color : "#aaa"}}>Field-specific component</p></div>;
    };


    isValid(handleWarn = false){
        try{
            let flag = false;

            let value = this.value();
            if(Helper.isEmpty(value)) {
                if(this.props.data.optional) return true;
                flag = true;
            }
            if(!this.isInLengthBounds()) flag = true;

            if(handleWarn) {
                if(flag) this.doWarn();
                else this.doRestore();
            }

            return !flag;
        }
        catch (e) {
            console.error(e);
        }
    };


    doWarn(){
        this.props.action.onUpdateWarn(this.props.data.ID, true);
    };

    doRestore(){
        this.props.action.onUpdateWarn(this.props.data.ID, false);
    };

    value(){
        try{
            return this.props.data.value;
        }
        catch (e) {
            console.error("Implement Field.value()", this);
            console.error(e);}
        return null;
    };



    isInLengthBounds(value = null, length = null){
       let v = (value !== null ?  value : this.value());
       if(Helper.isEmpty(v)) return false;

       let l = length !== null
           ? length
           : (this.props.data.length !== null
               ? this.props.data.length : null
           );
       if(Helper.isEmpty(l)) return true;

       if(l.length === 1) return v.length >= l[0];
       return v.length >= l[0] && v.length <= l[1];

    }

}


export default BaseField;