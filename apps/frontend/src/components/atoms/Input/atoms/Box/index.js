import React from "react";
import styled from "styled-components";
import descriptor from "../descriptor";

const Wrapper = styled.div`
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
    font-weight: 300;
    outline: none;
    border: none;
    flex: 1;
    background: transparent;
    -webkit-appearance: none;
  }

  p[data-purpose="holder"] {
    &:empty {
      &:after {
        content: "Search for a file...";
        font-size: 12pt;
        color: ${props => props.theme.colors.grayBlueDark};
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
    color: ${props => props.theme.colors.grayBlueDark};
    font-size: 12pt;
    font-weight: 300;
  }
`;

function Box({ children, className }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

Box.propTypes = descriptor.Box.propTypes;
Box.defaultProps = descriptor.Box.defaultProps;

export default Box;
