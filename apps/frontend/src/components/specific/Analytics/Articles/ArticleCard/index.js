import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import IconVisit from "@material-ui/icons/InsertLinkRounded";
import IconRead from "@material-ui/icons/DescriptionOutlined";

import { rgba } from "polished";
import { Line } from "react-chartjs-2";
import { colors, fonts } from "../../../../../themes";

import { types, pages } from "../../../../../constants";
import { getFriendlyTitle } from "../../../../../utils";

const Wrapper = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  padding: 8px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-radius: 6px;
  box-shadow: 1px 15px 30px -12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  height: 120px;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  &:not([src]),
  &[src=""] {
    opacity: 0;
  }
`;

const Title = styled.p`
  font-size: 11pt;
  font-weight: 400;
  text-align: center;
  width: 100%;
  font-family: ${props => props.theme.fonts.primary};
  word-break: break-all;
  color: ${props => props.theme.colors.dark};
  margin: ${props => props.theme.sizes.edge} 0;
`;

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 80px;
  flex: 1;
  background-color: ${props => rgba(props.theme.colors.orange, 0.1)};
  border-radius: 2px;
  transition: background-color 200ms;

  & > p {
    font-size: 18pt;
    font-weight: 400;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.orange};
    margin: 0 10px 0 0;
    transition: color 200ms;
  }
  & > span {
    font-size: 10pt;
    font-weight: 600;
    color: ${props => props.theme.colors.orange};
    transition: color 200ms;
  }

  &[data-none="true"] {
    background-color: transparent;
    transition: background-color 200ms;
    & > p,
    & > span {
      color: ${props => props.theme.colors.grayBlueNormal} !important;
      transition: color 200ms;
    }
  }
`;

const ActionWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 0;
  display: flex;
  justify-content: flex-start;
  margin-top: ${props => props.theme.sizes.edge};
  width: 100%;
`;

const Action = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: background-color 150ms;
  cursor: pointer;

  & > * {
    color: ${props => props.theme.colors.white};
    transition: color 150ms;
  }

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.dark};
    transition: background-color 150ms;
    & > * {
      color: ${props => props.theme.colors.white};
      transition: color 150ms;
    }
  }
`;

function ArticleCard({ className, _id, thumbnail, title, url, value, type, shortId }) {
  return (
    <Wrapper>
      <Header>
        <Thumbnail src={_.get(thumbnail, "url")} />
      </Header>
      <Title>{title}</Title>
      <ValueWrapper data-none={!_.toNumber(value)}>
        <p>{value}</p>
        <span>{value === 1 ? "View" : "Views"}</span>
      </ValueWrapper>
      <ActionWrapper>
        <Action
          title={`${type === types.article.type.external ? "Visit" : "Read"} Article`}
          data-url={url || "#"}
          href={pages.article.view.builder(_id, getFriendlyTitle(title))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {type === types.article.type.external ? <IconVisit style={{ fontSize: "12pt" }} /> : <IconRead style={{ fontSize: "12pt" }} />}
        </Action>
      </ActionWrapper>
    </Wrapper>
  );
}

ArticleCard.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string.isRequired,
  shortId: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  value: PropTypes.number,
};

ArticleCard.defaultProps = {
  className: "",
  title: "",
  type: types.article.type.internal,
  url: "#",
  value: 0,
};

export default ArticleCard;
