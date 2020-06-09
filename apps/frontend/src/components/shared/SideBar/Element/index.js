import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import Link from "next/link";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.2);
`;

const Helper = styled.div`
  position: absolute;
  z-index: 100;
  left: calc(${props => props.theme.sizes.sideBarWidth} + 10px);
  opacity: 0;
  pointer-events: none;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
  & > p {
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.white};
    font-weight: 400;
    font-size: 9pt;
    margin: 0;
  }
`;

const BubblePartial = styled.a`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(${props => props.theme.sizes.sideBarWidth} - ${props => props.theme.sizes.sideBarHorizontalEdge} * 2);
  width: calc(${props => props.theme.sizes.sideBarWidth} - ${props => props.theme.sizes.sideBarHorizontalEdge} * 2);
  border-radius: 50%;
  cursor: pointer;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 4px 15px -6px ${props => rgba(props.theme.colors.dark, 0.15)};
  transition: box-shadow 200ms, background 200ms;

  &:hover,
  &:active {
    box-shadow: 0 6px 15px -4px ${props => rgba(props.theme.colors.dark, 0.2)};
    transition: box-shadow 200ms, background 200ms;
    & + ${Helper} {
      opacity: 1;
    }
  }
  & > * {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Bubble = styled(BubblePartial)`
  &[data-active="true"] {
    background: ${props => props.theme.gradients.primary};
    background-size: 200%;
    background-position: 50%;
    box-shadow: none;
    transition: box-shadow 200ms, background 200ms, background-position 200ms;
    cursor: default;
    &:hover,
    &:active {
      background-size: 200%;
      background-position: 100%;
      box-shadow: none;
      transition: box-shadow 200ms, background 200ms, background-position 200ms;
    }

    & > * {
      color: ${props => props.theme.colors.white};
    }

    &[data-private="true"] {
      background: ${props => props.theme.gradients.primary};

      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

function Element({ Icon, title, href, isActive, isPrivate, as }) {
  return (
    <Link href={href} as={as} passHref>
      <Wrapper>
        <Bubble data-private={isPrivate} data-active={isActive}>
          <Icon style={{ fontSize: "18pt" }} />
        </Bubble>
        <Helper>
          <p>{title}</p>
        </Helper>
      </Wrapper>
    </Link>
  );
}

Element.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool,
  isActive: PropTypes.bool,
  as: PropTypes.string,
};

Element.defaultProps = {
  isPrivate: false,
  isActive: false,
  as: null,
};

export default Element;
