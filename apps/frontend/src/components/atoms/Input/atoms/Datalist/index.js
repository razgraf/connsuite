import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useOnClickOutside } from "../../../../../hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  top: 0;
  min-width: 120px;
  max-height: 200px;
  padding: 0;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  box-shadow: 0 0 10px 0 ${props => rgba(props.theme.colors.dark, 0.1)};
  overflow-y: auto;
  overflow-x: hidden;
  opacity: 1;
  pointer-events: all;

  &[data-visible="false"] {
    opacity: 0;
    pointer-events: none;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.colors.white};
  cursor: pointer;
  & > p {
    margin: 0;
    font-family: ${props => props.theme.fonts.primary};
    font-size: 9pt;
    color: ${props => props.theme.colors.dark};
    font-weight: 500;
  }
  &:hover,
  &:active,
  &:focus {
    background-color: ${props => props.theme.colors.grayBlueLight};
  }
`;

function Datalist({ className, source, onClick, isVisible, setIsVisible }) {
  const [ref] = useOnClickOutside(() => setIsVisible(false));

  return (
    <Wrapper className={className} data-visible={isVisible && source.length > 0} ref={ref}>
      {source &&
        source.map(item => (
          <Item key={_.get(item, "_id")} onClick={() => onClick(item)}>
            <p>{_.get(item, "title")}</p>
          </Item>
        ))}
    </Wrapper>
  );
}

Datalist.propTypes = {
  className: PropTypes.string,
  source: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  onClick: PropTypes.func,
};

Datalist.defaultProps = {
  isVisible: false,
  setIsVisible: () => {},
  className: null,
  source: [],
  onClick: () => {},
};

export default Datalist;
