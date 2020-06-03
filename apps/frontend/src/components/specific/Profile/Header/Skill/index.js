import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WrapperPartial = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
`;

const Box = styled.span`
  display: flex;
  position: absolute;
  bottom: 24px;
  background-color: rgba(0, 0, 0, 0.9);
  flex-shrink: 0;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.15);

  opacity: 1;
  transition: opacity 200ms 100ms;
`;

const Tooltip = styled.span`
  flex-shrink: 0;
  text-align: center;
  font-weight: 400;
  font-size: 9pt;
  width: 100%;
  min-width: 90px;
  font-weight: 400;
  user-select: none;
  padding: 6px 6px;

  color: ${props => props.theme.colors.white};
  &:hover,
  &:active {
    color: ${props => props.theme.colors.orange};
  }
`;

const Title = styled.span`
  position: relative;
  font-weight: 500;
  color: ${props => props.theme.colors.orange};
`;

const Arrow = styled.span`
  position: absolute;
  bottom: 21px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 3px solid rgba(0, 0, 0, 0.85);
  opacity: 1;
  transition: opacity 200ms 100ms;
`;

const Wrapper = styled(WrapperPartial)`
  ${Box}, ${Arrow} {
    pointer-events: none;
    opacity: 0;
  }
  &:hover,
  &:active {
    ${Box}, ${Arrow} {
      pointer-events: all;
      opacity: 1;
    }
  }
`;

function Skill({ className, title, onClick }) {
  return (
    <Wrapper className={className} onClick={onClick}>
      <Title>{title}</Title>
      <Box>
        <Tooltip>Show more</Tooltip>
      </Box>
      <Arrow />
    </Wrapper>
  );
}

Skill.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Skill.defaultProps = {
  className: null,
  onClick: () => {},
};

export default Skill;
