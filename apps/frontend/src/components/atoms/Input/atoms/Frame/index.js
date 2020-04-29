import _ from "lodash";
import React, { useMemo } from "react";
import styled from "styled-components";
import descriptor from "../descriptor";
import Box from "../Box";
import Label from "../Label";
import Warning from "../Warning";

const Wrapper = styled.div`
  width: 100%;
`;

function Frame(props) {
  const { children, className, label: labelValue, id, warning: warningValue, box, help } = props;

  const label = useMemo(
    () => ({
      htmlFor: id,
      help,
      value: labelValue,
    }),
    [id, help, labelValue],
  );

  const warning = useMemo(
    () => ({
      value: warningValue,
    }),
    [warningValue],
  );

  return (
    <Wrapper className={className}>
      <Label {...label} htmlFor={id} isWarned={!_.isNil(warningValue)} />
      <Box {...box}>{children}</Box>
      <Warning {...warning} />
    </Wrapper>
  );
}

Frame.propTypes = descriptor.Frame.propTypes;
Frame.defaultProps = descriptor.Frame.defaultProps;

export default Frame;
