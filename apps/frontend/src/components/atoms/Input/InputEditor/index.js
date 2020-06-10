import _ from "lodash";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { descriptor, Frame } from "../atoms";

/* eslint-disable */
const EditorJs = dynamic(() => import("./editor"), { ssr: false });
/* eslint-enable */

const StyledFrame = styled(Frame)`
  &[data-component="box"] {
    max-height: auto;
    height: auto;
  }
`;

const EditorWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  textarea {
    background: #292d3e;
    border: 1px solid ${props => props.theme.colors.dark};
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    color: ${props => props.theme.colors.white};
  }
`;

function InputEditor({ className, id, help, label, placeholder, setInstance, value, warning }) {
  console.log("da");
  return (
    <StyledFrame className={className} id={id} label={label} warning={warning} help={help}>
      <EditorWrapper data-gramm_editor="false" data-gramm="false">
        <EditorJs setInstance={setInstance} placeholder={placeholder} data={value} />
      </EditorWrapper>
    </StyledFrame>
  );
}

InputEditor.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  help: descriptor.Label.propTypes.help,
  label: PropTypes.string,
  setInstance: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.shape, PropTypes.array, PropTypes.object]),
  warning: PropTypes.string,
};

InputEditor.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  value: null,
  warning: null,
};

export default InputEditor;
