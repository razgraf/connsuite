import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;

function Live({ className, isActive }) {
  return (
    <Wrapper className={className} data-active={isActive}>
      <p>3</p>
    </Wrapper>
  );
}

Live.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

Live.defaultProps = {
  className: null,
  isActive: false,
};

export default Live;
