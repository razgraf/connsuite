import React from 'react';
import stylesDefault from './../Base/BaseField.module.scss'
import styles from './AreaField.module.scss';
import BaseField from "../Base/BaseField";
import {Helper} from "../../../../config/Util";
import PropTypes from "prop-types";
import BaseFieldModel from "../BaseFieldModel";


class AreaField extends BaseField{



    static propTypes = {
        data  :  PropTypes.shape({
            ...BaseFieldModel.propTypes.data,
            height : PropTypes.oneOf([PropTypes.arrayOf(PropTypes.number), PropTypes.number])
        }),
        action : PropTypes.shape({
            ...BaseFieldModel.propTypes.action,
        })
    };
    static defaultProps = {
        data : {
            ...BaseFieldModel.defaultProps.data,
            fileType: "image",
            maxFileSize: 1024 * 1024 * 10,
        },
        height : null,
        action : {
            ...BaseFieldModel.defaultProps.action
        }
    };


    render() {
        return super.render();
    }


    field = () => {
        let style = null;
        if(!Helper.isEmpty(this.props.height)){
            if(typeof this.props.height === 'string' || typeof this.props.height === 'number') style = {height : this.props.height};
            else if(this.props.height instanceof Array && this.props.height.length > 0){
                if(this.props.height.length === 1) style = {height : this.props.height[0]};
                else style = {minHeight : this.props.height[0], maxHeight : this.props.height[1], resize : 'vertical'}
            }
        }


        return <div className={Helper.dynamicClass(stylesDefault, styles,"field", "AreaField")}>
            <div className={Helper.dynamicClass(stylesDefault, styles,"content", "content")}>
                <textarea

                    id={this.props.data.ID}
                    value={Helper.sanitize(this.props.data.value)}
                    placeholder={this.props.data.placeholder}
                    ref={this.element.field}

                    style={style}

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


export default AreaField;