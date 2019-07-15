import React from 'react';
import stylesDefault from './../Base/BaseField.module.scss'
import styles from './TextField.module.scss';
import BaseField from "../Base/BaseField";
import {Helper} from "../../../../config/Util";


class TextField extends BaseField{



    render() {
        return super.render();
    }


    field = () => {
        return <div className={Helper.dynamicClass(stylesDefault, styles,"field", "TextField")}>
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





}


export default TextField;