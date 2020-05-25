import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: calc(${props => props.theme.sizes.navElevation} + 1);
  background-color: ${props => rgba(props.theme.colors.black, 0.7)};
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;

  &[data-visible="true"] {
    opacity: 1;
    pointer-events: all;
  }

  &[data-animated="true"] {
    transition: opacity 300ms;
  }
`;

function Backdrop({ className, isAnimated, isOpen, onClick }) {
  return <Wrapper className={className} data-visible={isOpen} data-animated={isAnimated} onClick={onClick} />;
}

Backdrop.propTypes = {
  className: PropTypes.string,
  isAnimated: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

Backdrop.defaultProps = {
  className: null,
  isAnimated: true,
  isOpen: false,
  onClick: () => {},
};

export default Backdrop;
