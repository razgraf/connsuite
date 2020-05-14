import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const SpinnerCircleAnimation = keyframes`
    0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const SpinnerCircleWrapper = styled.div`
  &,
  &:after {
    border-radius: 50%;
    width: ${props => props.size || "20"}px;
    height: ${props => props.size || "20"}px;
  }
  & {
    font-size: ${props => props.thickness || "1.5"}px;
    position: relative;
    text-indent: -9999em;
    border-top: 2em solid rgba(255, 255, 255, 0.2);
    border-right: 2em solid rgba(255, 255, 255, 0.2);
    border-bottom: 2em solid rgba(255, 255, 255, 0.2);
    border-left: 2em solid #ffffff;
    transform: translateZ(0);
    animation: ${SpinnerCircleAnimation} 1.1s infinite linear;
  }
`;

function SpinnerCircle({ className, size, thickness }) {
  return <SpinnerCircleWrapper className={className} size={size} thickness={thickness} />;
}

function Spinner({ className, type = "circle", ...otherProps }) {
  switch (type) {
    case "circle":
      return <SpinnerCircle className={className} {...otherProps} />;
    default:
      return <></>;
  }
}

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  thickness: PropTypes.number,
  type: PropTypes.oneOf(["circle", "circle-path", "circle-sized"]),
};

Spinner.defaultProps = {
  className: null,
  size: 20,
  thickness: 1.5,
};

SpinnerCircle.propTypes = Spinner.propTypes;
SpinnerCircle.defaultProps = Spinner.defaultProps;

export default Spinner;
