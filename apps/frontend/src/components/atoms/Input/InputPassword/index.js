import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconVisibility from "@material-ui/icons/VisibilityOutlined";
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

const VisibleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  width: 26px;
  margin-left: calc(${props => props.theme.sizes.edge} * 1 / 3);
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.grayBlueNormal};
  background-color: ${props => props.theme.colors.transparent};
  transition: background-color 200ms;
  cursor: pointer;
  & > * {
    color: ${props => props.theme.colors.grayBlueDark};
  }
  &:hover,
  &:active {
    &[data-visible="false"] {
      background-color: ${props => props.theme.colors.grayBlueLight};
      transition: background-color 200ms;
    }
  }
  &[data-visible="true"] {
    background-color: ${props => props.theme.colors.grayBlueNormal};
    transition: background-color 200ms;
  }
`;

function InputPassword({ className, id, help, label, onUpdate, placeholder, inputRef, value, warning }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Input
        id={id}
        onBlur={onUpdate}
        placeholder={placeholder}
        ref={inputRef}
        type={isVisible ? "text" : "password"}
        defaultValue={_.isNil(value) ? "" : value}
      />
      <VisibleIcon
        data-visible={isVisible}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        <IconVisibility style={{ fontSize: "10pt" }} />
      </VisibleIcon>
    </Frame>
  );
}

InputPassword.propTypes = {
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

InputPassword.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  value: null,
  warning: null,
};

export default InputPassword;
