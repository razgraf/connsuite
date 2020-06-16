import React from "react";
import PropTypes from "prop-types";
import Editor from "react-editor-js";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
// import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Header from "@editorjs/header";

const tools = {
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  code: {
    class: Code,
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
  inlineCode: {
    class: InlineCode,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  simpleImage: {
    class: SimpleImage,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: false,
  },
};

export default function EditorJs({ setInstance, ...otherProps }) {
  return (
    <Editor
      instanceRef={instance => {
        setInstance(instance);
      }}
      enableReInitialize={false}
      logLevel="ERROR"
      tools={tools}
      {...otherProps}
    />
  );
}

EditorJs.propTypes = {
  setInstance: PropTypes.func,
};

EditorJs.defaultProps = {
  setInstance: () => {},
};
