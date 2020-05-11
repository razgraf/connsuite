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
  pointer-events: all;
  width: 100vw;
  height: 100vh;
  z-index: calc(${props => props.theme.sizes.navElevation} + 1);
  background-color: ${props => rgba(props.theme.colors.black, 0.8)};
  opacity: 1;
  transition: opacity 300ms;

  &[data-visible="false"] {
    opacity: 0;
    pointer-events: none;
    transition: opacity 300ms;
  }
`;

function Backdrop({ className, isOpen, onClick }) {
  return <Wrapper className={className} data-visible={isOpen} onClick={onClick} />;
}

Backdrop.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

Backdrop.defaultProps = {
  className: null,
  isOpen: false,
  onClick: () => {},
};

export default Backdrop;
