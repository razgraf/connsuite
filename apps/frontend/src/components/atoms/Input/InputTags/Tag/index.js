import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconX from "@material-ui/icons/CloseRounded";

const TagWrapperPartial = styled.div`
  padding: 5px 6px 5px 10px;
  background-color: ${props => props.theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const TagTitle = styled.p`
  font-size: 11pt;
  color: #ffffff;
  font-weight: 500;
  margin: 0 4px 0 0;
`;

const TagAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => rgba(props.theme.colors.white, 0.2)};
  transition: background-color 100ms;
  cursor: pointer;
  & > * {
    color: ${props => props.theme.colors.white};
  }
  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.dark};
    transition: background-color 100ms;
  }
`;

const TagWrapper = styled(TagWrapperPartial)`
  &[data-placeholder="true"] {
    padding: 5px 0px 5px 6px;
    z-index: 0;
    background-color: ${props => props.theme.colors.grayLight};
    max-width: 100%;
    & > ${TagTitle} {
      visibility: hidden !important;
      font-weight: 300;
      font-size: 12pt;
      user-select: none;
      font-family: ${props => props.theme.fonts.primary};
    }
    & > ${TagAction} {
      display: none;
    }
  }
`;

function Tag({ className, element, isPlaceholder, onClick }) {
  return (
    <TagWrapper className={className} data-placeholder={isPlaceholder}>
      <TagTitle>{_.get(element, "title")}</TagTitle>
      <TagAction onClick={() => (!isPlaceholder ? onClick(element) : null)}>
        <IconX style={{ fontSize: "10pt" }} />
      </TagAction>
    </TagWrapper>
  );
}

Tag.propTypes = {
  className: PropTypes.string,
  element: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  isPlaceholder: PropTypes.bool,
};

Tag.defaultProps = {
  className: null,
  isPlaceholder: false,
  onClick: () => {},
};

export default Tag;
