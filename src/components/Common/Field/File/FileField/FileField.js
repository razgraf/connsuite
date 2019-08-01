import React from 'react';
import stylesDefault from './../../Base/BaseField.module.scss'
import stylesSpecific from './FileField.module.scss';
import BaseField from "../../Base/BaseField";
import {Helper} from "../../../../../config/Util";
import BaseFieldModel from "../../BaseFieldModel";
import PropTypes from "prop-types";
import {Button, ButtonType} from "../../../Button/Button";


class FileField extends BaseField{

    static propTypes = {
        data  :  PropTypes.shape({
            ...BaseFieldModel.propTypes.data,
            fileType : PropTypes.oneOf(["image", "file"]),
            maxFileSize : PropTypes.number,
            fileName : PropTypes.string,
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
        action : {
            ...BaseFieldModel.defaultProps.action
        }
    };


    constructor(props){
        super(props);

        this.element.button = React.createRef();
    }

    componentDidMount() {
        super.componentDidMount();
        this.setState({
            fileName : !Helper.isEmpty(this.props.data.fileName) ? this.props.data.fileName : null
        });
    }


    render() {
        return super.render();

    }


    field = () => {
        return <div className={Helper.dynamicClass(stylesDefault, stylesSpecific,"field", "FileField")}>
            <div
                className={Helper.dynamicClass(stylesDefault, stylesSpecific,"content")}
                onClick={() => { this.element.field.current.click(); }}
            >

                <input
                    type={"file"}
                    accept={this.props.data.fileType === "image" ? "image/*" : (this.props.data.fileType === "file" ? ".pdf, .doc, .docx" : null)}
                    placeholder={this.props.data.placeholder}
                    ref={this.element.field}
                    onBlur={()=>{if(this.props.data.warn.onBlur)  this.isValid(true);}}
                    onChange={(e) => {
                        let files = e.target.files;
                        let file = !Helper.isEmpty(files) && files.length > 0 ? files[0] : null;
                        let valid = (FileField.isImageFileValid(file));
                        this.setState({fileName: (file && valid? file.name : null)});
                        this.props.action.onChange(this.props.data.ID,file);
                    }}
                />

                <p>{this.state.fileName}</p>

                <Button custom={{ style: stylesSpecific, className: "buttonUpload"}}
                        title={Helper.isEmpty(this.state.fileName) ? "Choose" : "Change"}
                        mini={true}
                        reference={this.element.button}
                        type={ButtonType.MINI}
                        onClick={() => {}}
                />
            </div>
        </div>;
    };


    value(){
        try{
            return (!Helper.isEmpty(this.props.data.value)) ? this.props.data.value : null;
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }


    isValid = (handleWarn) => {
        let flag = false;

        let value = this.value();

        if(Helper.isEmpty(value)){
            if(this.props.data.hasOwnProperty("optional") && this.props.data.optional) return true;
            else {
                if(!flag) this.setState({warnText : "Please select a file"});
                flag = true;
            }
        }

        if(!FileField.isImageFileFormat(value)) {
            if(!flag) this.setState({warnText : "Select a .jpg, .jpeg, .gif or .png file"});
            flag = true;
        }
        if(!FileField.isValidSize(value)) {
            if(!flag) this.setState({warnText : `Select a file smaller than ${Math.round(this.props.data.maxFileSize / (1024 * 1024))} MB `});
            flag = true;
        }


        if(handleWarn) {
            if(flag) this.doWarn();
            else this.doRestore();
        }

        console.log(flag);


        return !flag;

    };


    static isImageFileValid(file){

        if(Helper.isEmpty(file)) return false;

        if(!FileField.isImageFileFormat(file)) return false;
        if(!FileField.isValidSize(file)) return false;

        return true;
    }


    static isImageFileFormat(file, format = ['jpg', 'jpeg', 'gif', 'png']) {

        if(Helper.isEmpty(file)) return false;

        try {
            console.log(file.name.split('.').pop());
            return format.includes(file.name.split('.').pop().toLowerCase())

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
        console.log("ere");
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