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

                    onChange={() => this.props.callback.onChange(this)}
                />
            </div>
        </div>;
    };


    isValid = (handleWarn) => {
        let flag = ! super.isValid(handleWarn);
        if(flag) return true;


        let value = this.value();
        if(!validator.isURL(value)) flag = true;


        if(handleWarn) {
            if(flag) this.warn();
            else this.restore();
        }

        return !flag;

    }




}


export default URLField;