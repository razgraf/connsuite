import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { darken } from "polished";
import descriptor from "../descriptor";
import Helper from "../../../Helper";

const WrapperPartial = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const Title = styled.label`
  display: inline-flex;
  margin: 0 10px 0 0;
  color: ${props => props.theme.colors.grayBlueDark};
  font-size: 13pt;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.grayBlueLight};
  transition: background-color 150ms;
  cursor: pointer;

  & > p {
    margin: 0;
    font-size: 11pt;
    font-weight: 700;
    text-align: center;
    color: ${props => props.theme.colors.grayBlueDark};
    user-select: none;
    transition: color 150ms;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: ${props => darken(0.1, props.theme.colors.grayBlueLight)};
    transition: background-color 150ms;
  }
`;

const Wrapper = styled(WrapperPartial)`
  &[data-warned="true"] {
    & > ${Title} {
      color: ${props => props.theme.colors.red};
    }
    ${Indicator} {
      background-color: ${props => props.theme.colors.red};
      & > p {
        color: ${props => props.theme.colors.white};
        transition: color 150ms;
      }
      &:hover,
      &:active,
      &:focus {
        background-color: ${props => darken(0.1, props.theme.colors.red)};
      }
    }
  }
`;

function Label({ children, className, isWarned, help, htmlFor, value }) {
  const content = _.isNil(children) ? value : children;

  return (
    <Wrapper className={className} data-warned={isWarned}>
      <Title htmlFor={htmlFor}>{content}</Title>
      {help && (
        <Helper {...help}>
          <Indicator>
            <p>?</p>
          </Indicator>
        </Helper>
      )}
    </Wrapper>
  );
}

Label.propTypes = descriptor.Label.propTypes;
Label.defaultProps = descriptor.Label.defaultProps;

export default Label;
