import _ from "lodash";
import React from "react";
import styled from "styled-components";
import descriptor from "../descriptor";

const Wrapper = styled.div`
  min-height: 20px;
  margin-top: 3px;
  overflow: hidden;
`;

const Text = styled.p`
  margin: 0;
  font-size: 8pt;
  font-weight: 600;
  text-align: left;
  color: ${props => props.theme.colors.red};
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 250ms, transform 250ms;
  &[data-visible="true"] {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 250ms, transform 250ms;
  }
`;

function Warning({ className, value }) {
  return (
    <Wrapper className={className}>
      <Text data-visible={!_.isNil(value) && _.isString(value)}>{value}</Text>
    </Wrapper>
  );
}

Warning.propTypes = descriptor.Warning.propTypes;
Warning.defaultProps = descriptor.Warning.defaultProps;

export default Warning;
