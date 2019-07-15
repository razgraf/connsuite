import React, {Component} from 'react';
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
                    id={this.props.data.ID}
                    type={"text"}
                    defaultValue={Helper.sanitize(this.props.data.value)}
                    // value={Helper.sanitize(this.props.data.value)}
                    placeholder={this.props.data.placeholder}

                    ref={this.element.field}

                    onBlur={()=>{
                        if(!Helper.isEmpty(this.props.data.warnOnBlur) && this.props.data.warnOnBlur)
                            this.isValid(true);
                    }}

                    onChange={() => {
                        if(this.props.data.warn === true && !Helper.isEmpty(this.props.data.warnOnBlur) && this.props.data.warnOnBlur) this.isValid(true);
                        this.props.data.callback.onChange(this);
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


        console.log(value, flag);

        if(handleWarn) {
            if(flag) this.doWarn();
            else this.doRestore();
        }

        return !flag;

    }




}


export default URLField;