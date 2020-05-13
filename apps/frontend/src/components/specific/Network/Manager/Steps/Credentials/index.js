import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;

function Credentials({ className, isActive }) {
  return (
    <Wrapper className={className} data-active={isActive}>
      <p>2</p>
    </Wrapper>
  );
}

Credentials.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

Credentials.defaultProps = {
  className: null,
  isActive: false,
};

export default Credentials;
