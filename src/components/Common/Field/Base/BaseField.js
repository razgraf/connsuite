import React, {Component} from 'react';
import {Helper} from "../../../../config/Util";
import styles from './BaseField.module.scss';
import FieldLabel from "../FieldLabel/FieldLabel";
import BaseFieldModel from "../BaseFieldModel";


class BaseField extends Component{





    static propTypes = BaseFieldModel.propTypes;
    static defaultProps = BaseFieldModel.defaultProps;


    constructor(props){
        super(props);

        this.state = {
            warn : false,
            warnText : "Please check this field again",
            element : {
                parent : this.props.parent,
                container : React.createRef(),
                field : React.createRef(),
                label : React.createRef(),
            }
        }

    }

    componentDidMount() {
        if(!Helper.isEmpty(this.props)
            && !Helper.isEmpty(this.props.callback)
            && !Helper.isEmpty(this.props.callback.onInitialized)
        )
            this.props.callback.onInitialized(this);
    }


    render() {
        return (
            <div className={styles.Base} data-warn={this.state.warn} ref={this.state.container}>
                <div className={styles.container}>
                    <FieldLabel {...this.props.label} reference={this.state.element.label} warn={this.state.warn} />
                    {this.field()}
                    <div className={styles.warn}>
                        <div className={styles.content}>
                            <p>{
                                !Helper.isEmpty(this.props.warnText)
                                    ? this.props.warnText
                                    : (
                                        !Helper.isEmpty(this.state.warnText) ?
                                            this.state.warnText : "Please check this field again"
                                    )
                            }</p>
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
                if(this.props.optional) return true;
                flag = true;
            }
            if(!this.isInLengthBounds()) flag = true;

            if(handleWarn) {
                if(flag) this.warn();
                else this.restore();
            }

            return !flag;
        }
        catch (e) {
            console.error(e);
        }
    };

    warn(){
        this.setState({warn : true});
    };

    restore(){
        this.setState({warn : false});
    };

    value(){
        try{
            return this.state.element.field.current.value;
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
           : (this.props.length !== null
               ? this.props.length : null
           );
       if(Helper.isEmpty(l)) return true;

       if(l.length === 1) return v.length >= l[0];
       return v.length >= l[0] && v.length <= l[1];

    }

}


export default BaseField;