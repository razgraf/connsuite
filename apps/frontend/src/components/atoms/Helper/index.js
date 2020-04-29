import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WrapperPartial = styled.div``;

const Floating = styled.div`
  position: absolute;
  z-index: 8;
  order: 2;

  max-height: 300px;
  width: 230px;
  padding: 15px;
  margin-left: -5px;

  border-radius: 4px;
  background: ${props => props.theme.colors.grayBlueBlack};
  overflow-y: auto;
  opacity: 0;
  transition: opacity 0ms;
  pointer-events: none;

  &[data-force="top"] {
    bottom: 40px;
  }

  &[data-force="bottom"] {
    top: 40px;
  }

  &[data-force="left"] {
    right: 40px;
    top: 0;
  }
  &[data-force="right"] {
    left: 36px;
    top: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  color: #ffffff;
  text-align: left;
  font-size: 9pt;
  font-weight: 400;
  user-select: none;
`;

const Wrapper = styled(WrapperPartial)`
  position: relative;
  &:hover,
  &:active,
  &:focus {
    & > ${Floating} {
      opacity: 1;
      transition: opacity 150ms;
      pointer-events: all;
    }
  }
`;

function Helper({ className, children, force, value }) {
  return (
    <Wrapper className={className}>
      {children}
      {value && (
        <Floating data-force={force}>
          <Text>{value}</Text>
        </Floating>
      )}
    </Wrapper>
  );
}

Helper.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  force: PropTypes.oneOf(["left", "right", "top", "bottom"]),
};

Helper.defaultProps = {
  className: null,
  value: null,
  force: "right",
};

export default Helper;
