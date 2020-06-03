import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { types } from "../../../constants";
import Spinner from "../../atoms/Spinner";

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 200ms;
  pointer-events: none;

  &[data-active="false"] {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

const NetworksGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column-gap: ${props => props.theme.sizes.edge};
  grid-row-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  grid-auto-rows: 1fr;
  & > * {
    grid-column: span 1;
    flex-grow: 0;
  }
  @media all and (max-width: ${props => props.theme.medias.medium}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media all and (max-width: ${props => props.theme.medias.small}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const NetworksItem = styled.div`
  grid-column: span 1;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: ${props => props.theme.colors.background};
  border-radius: 15px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;

function PlaceholderNetworks({ isActive, isAnimated }) {
  return (
    <Wrapper data-active={isActive} isAnimated={isAnimated}>
      <NetworksGrid>
        {[...Array(3).keys()].map(item => (
          <NetworksItem key={item}>
            <div>
              <Spinner color={c => c.grayBlueLight} />
            </div>
          </NetworksItem>
        ))}
      </NetworksGrid>
    </Wrapper>
  );
}

function Placeholder({ type: rawType, ...otherProps }) {
  const type = useMemo(() => (_.isFunction(rawType) ? rawType(types.placeholder.type) : _.toString(rawType)), [rawType]);
  switch (type) {
    case types.placeholder.type.networks:
      return <PlaceholderNetworks {...otherProps} />;
    default:
      return <></>;
  }
}

Placeholder.propTypes = {
  type: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(Object.keys(types.placeholder.type))]),
  isActive: PropTypes.bool,
  isAnimated: PropTypes.bool,
};

Placeholder.defaultProps = {
  type: types.placeholder.type.networks,
  isActive: true,
  isAnimated: true,
};

PlaceholderNetworks.propTypes = Placeholder.propTypes;
PlaceholderNetworks.defaultProps = Placeholder.defaultProps;

export default Placeholder;
