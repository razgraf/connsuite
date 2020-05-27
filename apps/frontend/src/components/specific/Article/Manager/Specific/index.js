import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div``;

function Specific({ className, reducer }) {
  return (
    <Wrapper className={className}>
      <p>3</p>
    </Wrapper>
  );
}

Specific.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
};

Specific.defaultProps = {
  className: null,
};

export default Specific;
