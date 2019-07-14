import React from 'react';
import stylesDefault from './../../Base/BaseField.module.scss'
import stylesSpecific from './FileField.module.scss';
import BaseField from "../../Base/BaseField";
import {Helper} from "../../../../../config/Util";
import validator from "validator";
import BaseFieldModel from "../../BaseFieldModel";
import PropTypes from "prop-types";
import {Button, ButtonType} from "../../../Button/Button";


class FileField extends BaseField{

    static propTypes = {
        ...BaseFieldModel.propTypes,
        fileType : PropTypes.oneOf(["image", "file"]),
        maxFileSize : PropTypes.number
    };
    static defaultProps = {
        ...BaseFieldModel.defaultProps,
        fileType : "image",
        maxFileSize : 1024 * 1024 * 10,
    };


    constructor(props){
        super(props);
        this.setState({fileName : null});
    }

    render() {
        return super.render();

    }


    field = () => {
        console.log(stylesDefault);
        console.log(stylesSpecific);
        return <div className={Helper.dynamicClass(stylesDefault, stylesSpecific,"field", "FileField")}>
            <div
                className={Helper.dynamicClass(stylesDefault, stylesSpecific,"content")}
                onClick={() => {
                    this.state.element.field.current.click();
                }}
            >
                <input
                    type={"file"}
                    accept={this.props.fileType === "image" ? "image/*" : (this.props.fileType === "file" ? ".pdf, .doc, .docx" : null)}
                    defaultValue={this.props.value}
                    placeholder={this.props.placeholder}
                    ref={this.state.element.field}
                    onChange={() => {
                        this.setState({
                            fileName : (
                                !Helper.isEmpty(this.state.element.field.current) && this.state.element.field.current.files.length > 0
                                ? this.state.element.field.current.files[0].name : null
                            )
                        });
                        this.props.callback.onChange(this);
                    }}
                />

                <p>{this.state.fileName}</p>

                <Button custom={{ style: stylesSpecific, className: "buttonUpload"}}
                        title={"Choose"}
                        mini={true}
                        type={ButtonType.CUSTOM_MINI_OUTLINE}
                        onClick={() => {}}
                />
            </div>
        </div>;
    };


    value(){
        try{
            return (this.state.element.field.current.files.length > 0) ?  this.state.element.field.current.files[0] : null;
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }


    isValid = (handleWarn) => {
        let flag = false;

        let value = this.value();

        if(Helper.isEmpty(value) && this.props.optional) return true;

        if(FileField.isImageFileFormat(value)) {
            flag = true;
            this.setState({warnText : "Select a .jpg, .jpeg, .gif or .png file"});
        }
        if(FileField.isValidSize()) {
            flag = true;
            this.setState({warnText : `Select a file smaller than ${Math.round(this.props.maxFileSize / (1024 * 1024))} MB `});
        }


        if(handleWarn) {
            if(flag) this.warn();
            else this.restore();
        }

        return !flag;

    };


    static isImageFileFormat(file, format = ['.jpg', '.jpeg', '.gif', '.png']) {

        if(Helper.isEmpty(file)) return false;

        try {
            const pattern = '(' + format.join('|').replace(/\./g, '\\.') + ')$';
            return new RegExp(pattern, 'i').test(file.name);
        }catch (e) {console.error(e);}
        return false;
    }

    static isValidSize(file, maxFileSize = 1024 * 1024 * 10){

        if(Helper.isEmpty(file)) return false;
        try{
            return file.size <= maxFileSize;
        }catch (e) {console.error(e);}
        return false;

    }


    bindImageValue = () => {
        let file = this.value();
        return new Promise((resolve,reject) => {
            try {
                let reader = new FileReader();
                reader.onload = function () {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            }catch (e) {
                reject();
            }
        });
    }


}


export default FileField;