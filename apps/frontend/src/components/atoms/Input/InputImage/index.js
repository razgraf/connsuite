import _ from "lodash";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { descriptor, Frame } from "../atoms";
import Button from "../../Button";

const Input = styled.input`
  display: none;
`;

const Holder = styled.p`
  max-width: calc(100% - 80px);
  ${props => props.theme.extensions.ellipsis};
  &[data-purpose="holder"]:empty {
    &:after {
      content: "${props => props.placeholder}" !important;
    }
  }
`;

const Action = styled(Button)`
  padding: 8px 12px;
  position: absolute;
  right: 10px;
`;

function InputImage({ className, id, help, label, onUpdate, placeholder, inputRef, name, value, warning }) {
  const ref = useRef();
  if (_.isNil(inputRef)) inputRef = ref;

  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Holder
        data-purpose="holder"
        placeholder={placeholder}
        onClick={e => {
          if (inputRef && inputRef.current) inputRef.current.click();
        }}
      >
        {name}
      </Holder>
      <Action
        isMini
        type={t => t.button}
        accent={t => t.grayBlueDark}
        appearance={t => t.outline}
        title={_.isNil(name) || _.isEmpty(name) ? "Choose" : "Change"}
        onClick={e => {
          if (inputRef && inputRef.current) inputRef.current.click();
        }}
      />
      <Input id={id} accept="image/*" onChange={onUpdate} placeholder={placeholder} ref={inputRef} type="file" autocomplete="on" />
    </Frame>
  );
}

InputImage.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  help: descriptor.Label.propTypes.help,
  label: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.shape({}),
  warning: PropTypes.string,
};

InputImage.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  name: null,
  value: null,
  warning: null,
};

export default InputImage;
