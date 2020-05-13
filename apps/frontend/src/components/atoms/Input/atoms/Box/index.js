import React from "react";
import styled from "styled-components";
import descriptor from "../descriptor";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-height: 50px;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2 / 3) calc(${props => props.theme.sizes.edge} * 2 / 3);
  background: transparent;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.grayBlueNormal};
  transition: border 250ms;

  p[data-purpose="holder"],
  input,
  textarea {
    font-size: 12pt;
    color: ${props => props.theme.colors.dark};
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 300;
    outline: none;
    border: none;
    flex: 1;
    background: transparent;
    -webkit-appearance: none;
  }

  p[data-purpose="holder"] {
    margin: 0;
    flex: 1;
    &:empty {
      &:after {
        content: "Search for a file...";
        font-size: 12pt;
        font-family: ${props => props.theme.fonts.primary};
        color: ${props => props.theme.colors.grayBlueMedium};
        font-weight: 300;
        outline: none;
        border: none;
        flex: 1;
        background: transparent;
        -webkit-appearance: none;
      }
    }
  }

  input::placeholder,
  textarea::placeholder {
    -webkit-appearance: none;
    color: ${props => props.theme.colors.grayBlueMedium};
    font-size: 12pt;
    font-weight: 300;
    opacity: 1;
  }
`;

const Focuser = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  border: 1px solid ${props => props.theme.colors.grayBlueMedium};
  border-radius: 2px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms;
`;

function Box({ children, className }) {
  return (
    <Wrapper className={className}>
      {children}
      <Focuser data-component="focuser" />
    </Wrapper>
  );
}

Box.propTypes = descriptor.Box.propTypes;
Box.defaultProps = descriptor.Box.defaultProps;

export default Box;
