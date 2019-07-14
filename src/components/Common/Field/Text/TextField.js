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





}


export default TextField;