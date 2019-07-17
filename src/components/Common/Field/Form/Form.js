import React, {Component} from 'react';
import styles from './Form.module.scss'
import {Helper} from '../../../../config/Util'
import {TextField, FileField, URLField, AreaField} from './../index';
import PropTypes from "prop-types";


class Form extends Component{


    static propTypes = {
        fields : PropTypes.arrayOf(PropTypes.shape({})),
        columns : PropTypes.number,
        onUpdate : PropTypes.func,
        defaultValid : PropTypes.bool,
    };

    static defaultProps = {
        fields : [],
        columns : 2,
        onUpdate : ()=>{},
        defaultValid : false,
    };


    static getDerivedStateFromProps(nextProps, prevState){
        let newState = {...prevState};
        let flag = false;
        for(let i = 0; i < nextProps.fields.length; i++){
            if(prevState.fields[i].data.value !== nextProps.fields[i].value) {
                newState.fields[i].data.value = nextProps.fields[i].value;
                flag = true;
            }
        }

        return flag ? newState : null;
    }

    constructor(props){
        super(props);

        let fields = this.constructFields();

        this.state = {
            valid : this.props.defaultValid,
            fields : fields,
        }
    }


    constructFields (source = this.props.fields){
        let fields = [];
        source.forEach((element, index) => {

            let field = {};
            let data = {};
            let action = {};

            data.ID = Helper.getValue("ID",element);
            data.placeholder = Helper.getValue("placeholder",element);
            data.defaultValue = Helper.getValue("defaultValue",element);
            data.value = Helper.getValue("value",element);
            data.length =  Helper.getArray("length",element);

            data.label = {};
            if(!Helper.isEmpty(element.label)){
                let elementLabel = Helper.getObject( "label",element);
                data.label.value = Helper.getValue( "value",elementLabel);
                data.label.help = Helper.getValue("help",elementLabel);
                data.label.force = Helper.getValue( "force",elementLabel);
            }

            data.warn = {};
            if(!Helper.isEmpty(element.warn)){
                let elementWarn = Helper.getObject("warn",element);
                data.warn.onBlur = Helper.getValue("onBlur",elementWarn);
                data.warn.text = Helper.getValue( "text",elementWarn);
            }


            data.fileType = Helper.getValue( "fileType",element);
            data.maxFileSize = Helper.getValue( "maxFileSize",element);
            data.fileName = Helper.getValue( "fileName",element);
            data.height = Helper.getValue( "height",element);





            action.callback = {};
            if(!Helper.isEmpty(element.callback)){
                let elementCallback = Helper.getObject("callback",element);
                action.callback.onClick = Helper.getValue("onClick",elementCallback);
                action.callback.onChange = Helper.getValue( "onChange",elementCallback);
            }
            action.onChange = this.doUpdateFieldValue.bind(this);
            action.onUpdateWarn = this.doUpdateFieldWarnValue.bind(this);
            action.doDefineScope = this.doDefineFieldScope.bind(this);


            data.warn.value = false;
            data.scope = null;


            field.type = Helper.getValue("type",element);
            field.columnSpan  =Helper.getValue("columnSpan",element);

            field.data = data;
            field.action = action;

            fields.push(field);
        });
        return fields;
    }



    doUpdateFieldValue = (fieldID, value) => {
        if(Helper.isEmpty(fieldID)){ console.error("Empty fieldID in form value update."); return; }

        let updated = [...this.state.fields];
        let e = null;
        updated.forEach((element)=> {
            if(element.data.ID === fieldID) {
                e = element;
                element.data.value = value;
            }
        });
        this.setState({fields: updated});
        if(!Helper.isEmpty(e.action.callback.onChange)) e.action.callback.onChange(e, this);

        this.onUpdate();

    };


    doUpdateFieldWarnValue = (fieldID, warn = true) => {

        console.log(fieldID);
        if(Helper.isEmpty(fieldID)){ console.error("Empty fieldID in form warn update."); return; }

        let updated = [...this.state.fields];
        updated.forEach((element)=> {
            if(element.data.ID === fieldID) {
                element.data.warn.value = warn;
            }
        });
        this.setState({fields: updated});
        this.onUpdate();

    };


    doDefineFieldScope = (fieldID, scope) => {

        if(Helper.isEmpty(fieldID)){ console.error("Empty fieldID in form scope update."); return; }

        let updated = [...this.state.fields];
        updated.forEach((element)=> {
            if(element.data.ID === fieldID) {
                element.data.scope = scope;
            }
        });
        this.setState({fields: updated});

    };


    findFieldByID = (fieldID) => {
        let e = null;
        this.state.fields.forEach((element)=>{
            if(element.data.ID === fieldID) {
                e = element;
            }
        });
        return e;
    };


    onUpdate = () => {
        this.props.onUpdate(this);
        this.setState({valid : this.isValid(false)});
    };


    isValid = (handleWarn = false) => {
        this.state.fields.forEach((element)=> {
            if(!element.data.scope.isValid(handleWarn)) return false;
        });

        return true;
    };


    render() {
        return (
            <div className={styles.Form} data-columns={this.props.columns}>
                <div className={styles.container}>
                    {
                        this.state.fields.map((element, index) => {

                            let configuration = {
                                key : index,
                                data : element.data,
                                action : element.action,
                                columnSpan : element.columnSpan
                            };

                            switch (element.type) {

                                case 'Text' : return <TextField {...configuration} />;
                                case 'File' : return <FileField {...configuration} />;
                                case 'URL' : return <URLField {...configuration} />;
                                case 'Area' : return <AreaField {...configuration} />;
                                default : return <div key={index}/>
                            }
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Form;