import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: calc((${props => props.theme.sizes.navHeight} - ${props => props.theme.sizes.navVerticalEdge} * 1) + 5px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 180px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  box-shadow: 0 12px 48px -15px rgba(0, 0, 0, 0.3);

  pointer-events: none;
  opacity: 0;
  overflow: hidden;
  transform: translateY(-20px);
  transition: opacity 100ms, transform 100ms;

  &[data-active="true"] {
    pointer-events: all;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 100ms, transform 100ms;
  }
  @media ${props => props.theme.medias.mobile} {
    top: calc((${props => props.theme.sizes.navHeightMobile} - ${props => props.theme.sizes.navVerticalEdge} * 1) + 5px);
  }
`;

const ItemWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.grayLight};
  }
  &[data-active="true"] {
    & > * {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const ItemTitle = styled.p`
  margin: 0;
  flex: 1;
  font-size: 9pt;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.colors.grayBlueDark};
`;

function Item({ title, isActive, onClick }) {
  return (
    <ItemWrapper data-active={isActive} onClick={onClick}>
      <ItemTitle>{title}</ItemTitle>
    </ItemWrapper>
  );
}

function Dropdown({ className, items, isActive, onItemClick }) {
  return (
    <Wrapper className={className} data-active={isActive}>
      {items.map(item => (
        <Item
          key={_.get(item, "title")}
          title={_.get(item, "title")}
          isActive={_.get(item, "isActive")}
          onClick={() => onItemClick(item)}
        />
      ))}
    </Wrapper>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  isActive: false,
  onClick: () => {},
};

Dropdown.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};

Dropdown.defaultProps = {
  className: null,
  isActive: false,
  onItemClick: () => {},
  items: [],
};

export default Dropdown;
