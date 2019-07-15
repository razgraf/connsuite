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
                    value={Helper.sanitize(this.props.data.value)}
                    placeholder={this.props.data.placeholder}
                    ref={this.element.field}

                    onBlur={()=>{ if(this.props.data.warn.onBlur)  this.isValid(true); }}
                    onChange={(e) => {
                        this.props.action.onChange(this.props.data.ID, e.target.value);
                        if(this.props.data.warn.value) this.isValid(true);
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