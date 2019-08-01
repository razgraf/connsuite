/**
 * Created by @VanSoftware on 2019-07-28.
 */
import React, {Component} from 'react'
import EditorJS from '@editorjs/editorjs'
import './EditorJSWrapper.scss'
import PropTypes from "prop-types";
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Image from '@editorjs/image'
import List from '@editorjs/list';
import Embed from '@editorjs/embed'
import Marker from '@editorjs/marker'
import CodeTool from '@editorjs/code'
import Table from '@editorjs/table'
import {Helper} from "../../../../../../config/Util";


// import Quote from '@editorjs/quote'
// import LinkTool  from '@editorjs/link'

class EditorJSWrapper extends Component{

    static propTypes = {
        id : PropTypes.string.isRequired,
        value : PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
        placeholder : PropTypes.string,

        tools : PropTypes.object,

        onReady  :PropTypes.func,
        onBlur : PropTypes.func,
        onFocus : PropTypes.func,
        onChange : PropTypes.func,
        onKeyDown: PropTypes.func,
        onDoubleClick : PropTypes.func,
    };

    static defaultProps = {
        onBlur : () => {},
        onReady : () => {},
        onFocus : () => {},
        onChange : () => {},
        onKeyDown: () => {},
        onDoubleClick : () => {},


        tools: {
            paragraph: {
                class: Paragraph,
                inlineToolbar: true,
            },
            header: {
                class: Header,
                inlineToolbar: true
            },
            image: {
                class: Image,
                inlineToolbar: true,
                config: {
                    field: "editorjs_image",
                    types: "image/png, image/jpg, image/gif",
                    endpoints: {
                        byFile: "", // Your backend file uploader endpoint
                    }
                }
            },
            list: {
                class: List,
                inlineToolbar: true,
            },
            code: CodeTool,
            embed: {
                class: Embed,
                config: {
                    services: {
                        youtube: true,
                        vimeo: true,
                        codepen: true,
                        imgur: true,
                        gfycat: true,
                    }
                }
            },
            Marker: {
                class: Marker,
                shortcut: 'CMD+SHIFT+M',
                inlineToolbar: true,
            },
            table: {
                class: Table,
                inlineToolbar: true,
                config: {
                    rows: 2,
                    cols: 3,
                },
            },
        }
    };

    constructor(props){
        super(props);

        this.editor = null;
        this.editorJS_refToEditorContainer = React.createRef();

    }


    componentDidMount() {
        this.editor = new EditorJS({
            holder:  this.props.id,
            tools : this.props.tools,
            placeholder : this.props.placeholder,

            onReady  : this.onReady,
            onChange : this.onChange,

        })
    }

    componentWillUnmount() {
        if (!this.editor || Helper.isEmpty(this.editor)) return;
        if(this.editor.hasOwnProperty("destroy") && typeof this.editor.destroy === 'function') this.editor.destroy();
        this.editor = null;
    }


    render() {
        return (
            <div style={{width : '100%'}} id={this.props.id} ref={this.editorJS_refToEditorContainer} />
        );
    }


    onReady = () => {
        this.props.onReady();
    };
    onChange = () => {
        this.props.onChange();
    }
}

export default EditorJSWrapper;