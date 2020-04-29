import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { descriptor, Frame, Box } from "../atoms";

const StyledBox = styled(Box)``;

const Input = styled.input`
  &:focus {
    ${StyledBox} {
      border-color: 1px solid ${props => props.theme.colors.grayBlueDark};
      transition: border 200ms;
    }
  }
`;

function InputText({ className, id, help, label, onUpdate, placeholder, inputRef, value, warning }) {
  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Input id={id} onBlur={onUpdate} placeholder={placeholder} ref={inputRef} type="text" defaultValue={value} />
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
