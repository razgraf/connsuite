import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { rgba } from "polished";
import { pages } from "../../../../constants";

const WrapperPartial = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 0 5px 1px ${props => rgba(props.theme.colors.dark, 0.05)};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-radius: 4px;
  transition: border 150ms;
`;

const Shape = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 1px;
    background: ${props => props.theme.colors.grayBlueNormal};
    position: absolute;
    z-index: 1;

    &:first-child {
      height: 100%;
      width: 1px;
      background: ${props => props.theme.colors.grayBlueNormal};
      position: absolute;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  border-radius: 10px 0 0px 0;
  background-color: ${props => props.theme.colors.grayBlueNormal};
  opacity: 0;
  transition: background-color 150ms, opacity 150ms;
`;

const Icon = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  &:not([src]),
  &[src=""] {
    visibility: hidden;
  }
`;

const Wrapper = styled(WrapperPartial)`
  &[data-purpse="add"] {
    border: 1px solid ${props => props.theme.colors.grayBlueNormal};
    box-shadow: 0;
    opacity: 0.7;
    cursor: pointer;
    transition: opacity 150ms, border 150ms;
    &:hover,
    &:active {
      opacity: 1;
      transition: opacity 150ms;
    }
  }

  &[data-viewonly="false"] {
    cursor: pointer;
    &[data-focused="false"] {
      &:hover,
      &:active {
        ${Overlay} {
          opacity: 1;
          transition: background-color 150ms, opacity 150ms;
        }
      }
    }

    &[data-focused="true"] {
      border: 1px solid ${props => props.theme.colors.secondary};
      transition: border 150ms;
      ${Overlay} {
        opacity: 1;
        background-color: ${props => props.theme.colors.secondary};
        transition: background-color 150ms, opacity 150ms;
      }
    }
  }
`;
function NetworkMini({ className, network, isViewOnly, isFocused, onClick }) {
  return (
    <Wrapper className={className} data-focused={isFocused} data-viewonly={isViewOnly} onClick={isViewOnly ? null : onClick}>
      <Icon src={_.get(network, "icon.source")} alt="" />
      <Overlay />
    </Wrapper>
  );
}

function NetworkMiniAdd({ className }) {
  return (
    <Link href={pages.network.create.root}>
      <Wrapper className={className} data-purpose="add" as="a">
        <Shape />
        <Shape />
      </Wrapper>
    </Link>
  );
}

NetworkMini.propTypes = {
  className: PropTypes.string,
  isViewOnly: PropTypes.bool,
  isFocused: PropTypes.bool,
  onClick: PropTypes.func,
  network: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
  }),
};

NetworkMini.defaultProps = {
  className: null,
  isViewOnly: false,
  isFocused: false,
  onClick: () => {},
  network: {
    _id: "",
    title: "",
    username: "",
  },
};

NetworkMiniAdd.defaultProps = {
  className: PropTypes.string,
};

NetworkMiniAdd.propTypes = {
  className: null,
};

export default NetworkMini;
export { NetworkMiniAdd };
