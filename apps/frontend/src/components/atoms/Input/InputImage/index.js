import _ from "lodash";
import React, { useRef, useCallback } from "react";
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
  &[data-purpose="holder"][data-warning="true"]{
    color: ${props => props.theme.colors.red};
  }
`;

const Action = styled(Button)`
  padding: 8px 12px;
  position: absolute;
  right: 10px;
`;

function InputImage({ className, id, help, label, onUpdate, placeholder, inputRef, name, warning, isEventInterpreted }) {
  const ref = useRef();
  if (_.isNil(inputRef)) inputRef = ref;

  const onChange = useCallback(
    event => {
      if (!isEventInterpreted) {
        onUpdate(event);
        return;
      }
      try {
        const files = _.get(event, "target.files");
        if (!files) throw new Error();
        const file = _.get(files, [0]);
        if (!file) throw new Error();
        onUpdate(file);
        return;
      } catch (e) {
        console.error(e);
        onUpdate(null);
      }
    },
    [onUpdate, isEventInterpreted],
  );

  console.log("W", warning);

  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Holder
        data-purpose="holder"
        data-warning={!_.isNil(warning)}
        placeholder={placeholder}
        onClick={() => {
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
        onClick={() => {
          if (inputRef && inputRef.current) inputRef.current.click();
        }}
      />
      <Input id={id} accept="image/*" onChange={onChange} placeholder={placeholder} ref={inputRef} type="file" autocomplete="on" />
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
  warning: PropTypes.string,
  isEventInterpreted: PropTypes.bool,
};

InputImage.defaultProps = {
  className: null,
  inputRef: null,
  label: null,
  help: null,
  placeholder: null,
  name: null,
  warning: null,
  isEventInterpreted: false,
};

export default InputImage;
