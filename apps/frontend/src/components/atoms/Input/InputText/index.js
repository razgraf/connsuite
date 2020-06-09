import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { descriptor, Frame } from "../atoms";

const Input = styled.input`
  &:focus {
    & ~ *[data-component="focuser"] {
      opacity: 1;
    }
  }
`;

function InputText({ className, id, help, label, onUpdate, placeholder, inputRef, value, warning }) {
  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Input
        id={id}
        onBlur={onUpdate}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        defaultValue={_.isNil(value) ? "" : value}
        autocomplete="off"
      />
    </Frame>
  );
}

InputText.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  help: descriptor.Label.propTypes.help,
  label: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  warning: PropTypes.string,
};

InputText.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  value: null,
  warning: null,
};

export default InputText;
