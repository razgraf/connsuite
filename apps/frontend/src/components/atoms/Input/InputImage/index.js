import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { descriptor, Frame, Box } from "../atoms";
import { Button } from "@material-ui/core";

const StyledBox = styled(Box)``;

const Input = styled.input`
  display: none;
  &:focus {
    ${StyledBox} {
      border-color: 1px solid ${props => props.theme.colors.grayBlueDark};
      transition: border 200ms;
    }
  }
`;

const Holder = styled.p`
  content: ${props => props.placeholder || ""};
`;

function InputImage({ className, id, help, label, onUpdate, placeholder, inputRef, name, value, warning }) {
  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Holder data-purpose="holder" placeholder={placeholder}>
        {name}
      </Holder>
      <Button
        isMini
        type={t => t.button}
        accent={t => t.grayBlueNormal}
        appearance={t => t.outline}
        title={_.isNil(name) || _.isEmpty(name) ? "Choose" : "Change"}
      />
      <Input
        id={id}
        accept="image/*"
        onChange={event => {
          try {
            const files = _.get(event, "target.files");
            if (!files) throw new Error();
            const file = _.get(files, [0]);
            if (!file) throw new Error();
            onUpdate({ name: file.name, value: file });
          } catch (e) {
            console.err(e);
            onUpdate({ name: null, value: null });
          }
        }}
        placeholder={placeholder}
        ref={inputRef}
        type="file"
        autocomplete="on"
      />
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
