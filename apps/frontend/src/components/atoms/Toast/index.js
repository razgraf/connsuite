/* eslint-disable react/prop-types */
import _ from "lodash";
import React from "react";
import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import { DefaultToast, DefaultToastContainer } from "react-toast-notifications";

const BubbleAnimation = keyframes`
    0%{ 
        left: 30px;
        transform: scale(0);   
    }
    100%{
        left: -75px;
        transform: scale(1);
    }
`;

const TopDarkToastWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(${props => props.theme.sizes.edge} * 1.5) calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.dark};
  border-radius: 4px;
  box-shadow: 3px 3px 10px 0 ${props => rgba(props.theme.colors.black, 0.3)};
  margin: 0 0 10px 10px;
  min-width: 250px;
  overflow: hidden;

  &:before {
    position: absolute;
    left: -80px;
    content: "";
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.secondary};
    animation-name: ${BubbleAnimation};
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    animation-duration: 450ms;
  }

  p {
    text-align: center;
    margin: 0;
    font-size: 10pt;
    font-weight: 500;
  }
  p,
  svg,
  span {
    color: ${props => props.theme.colors.white};
  }

  &[data-appearance="success"]:before {
    background-color: ${props => props.theme.colors.green};
  }
  &[data-appearance="warning"]:before {
    background-color: 5px solid ${props => props.theme.colors.yellow};
  }
  &[data-appearance="error"]:before {
    background-color: 5px solid ${props => props.theme.colors.red};
    p,
    svg,
    span {
      color: ${props => props.theme.colors.red};
    }
  }
`;

function TopDarkToast({ appearance, children: c }) {
  const children = _.isString(c) ? <p>{c}</p> : c;
  return <TopDarkToastWrapper data-appearance={appearance}>{children}</TopDarkToastWrapper>;
}

function Toast({ children, design, appearance, ...props }) {
  if (_.get(design) === "default")
    return (
      <DefaultToast appearance={appearance} {...props}>
        {children}
      </DefaultToast>
    );
  return (
    <TopDarkToast appearance={appearance} {...props}>
      {children}
    </TopDarkToast>
  );
}

export function ToastContainer(props) {
  return (
    <DefaultToastContainer
      {...props}
      style={{
        zIndex: 9999,
        top: "auto",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pointerEvents: "none",
        width: "100%",
      }}
    />
  );
}

export default Toast;
