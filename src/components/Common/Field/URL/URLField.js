import React from 'react';
import stylesDefault from './../Base/BaseField.module.scss'
import styles from './URLField.module.scss';
import BaseField from "../Base/BaseField";
import {Helper} from "../../../../config/Util";
import validator from 'validator';


class URLField extends BaseField{



    render() {
        return super.render();
    }


    field = () => {
        return <div className={Helper.dynamicClass(stylesDefault, styles,"field", "URLField")}>
            <div className={stylesDefault.content}>
                <input
                    type={"text"}
                    defaultValue={this.props.value}
                    placeholder={this.props.placeholder}

                    ref={this.state.element.field}

                    onBlur={()=>{
                        if(!Helper.isEmpty(this.props.warnOnBlur) && this.props.warnOnBlur)
                            this.isValid(true);
                    }}

                    onChange={() => {
                        if(this.props.warn === true && !Helper.isEmpty(this.props.warnOnBlur) && this.props.warnOnBlur) this.isValid(true);
                        return this.props.callback.onChange(this);
                    }}
                />
            </div>
        </div>;
    };



    isValid = (handleWarn = false) => {
        let flag = ! super.isValid(handleWarn);
        if(flag) return true;


        let value = this.value();
        if(!validator.isURL(value)) flag = true;


        if(handleWarn) {
            if(flag) this.doWarn();
            else this.doRestore();
        }

        return !flag;

    }




}


export default URLField;