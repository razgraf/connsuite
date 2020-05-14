import _ from "lodash";
import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { descriptor, Frame } from "../atoms";
import Button from "../../Button";
import guards from "../../../../guards";

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

function InputImage({ className, id, help, label, onUpdate, placeholder, inputRef, name, value, warning, isEventInterpreted }) {
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
  value: PropTypes.shape({}),
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
  value: null,
  warning: null,
  isEventInterpreted: false,
};

export default InputImage;
