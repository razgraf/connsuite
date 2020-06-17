import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { rgba } from "polished";
import Network, { NetworkMini } from "../../../../shared/Network";
import { ellipsis } from "../../../../../utils";

const IndicatorBlink = keyframes`
  0%{
    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  100%{
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${props => props.theme.sizes.networkManagerPreviewWidth};
  border: 1px solid ${props => props.theme.colors.grayAccent};
  border-right: none;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  padding-top: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-right: 0;
  margin-left: calc(${props => props.theme.sizes.edge} * 6);
  border-radius: calc(${props => props.theme.sizes.edge} * 2) 0 0 calc(${props => props.theme.sizes.edge} * 2);

  @media ${props => props.theme.medias.medium} {
    margin: 0;
    border-right: 1px solid ${props => props.theme.colors.grayAccent};
    border-radius: 2px;
    padding: calc(${props => props.theme.sizes.edge});
    padding-bottom: 50px;
    width: 100%;
  }
`;

const HeaderPartial = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  padding-bottom: calc(${props => props.theme.sizes.edge} * 1);
  border-bottom: 1px solid ${props => props.theme.colors.grayAccent};
`;

const HeaderActions = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: calc(${props => props.theme.sizes.edge} * 1);
`;

const HeaderAction = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }

  &:nth-child(1) {
    background-color: ${props => props.theme.colors.red};
  }
  &:nth-child(2) {
    background-color: ${props => props.theme.colors.yellow};
  }
  &:nth-child(3) {
    background-color: ${props => props.theme.colors.green};
  }
`;

const HeaderBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  background-color: ${props => props.theme.colors.grayBlueGhost};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-radius: 4px;
  padding: 6px 10px;
  margin-left: 4px;
`;

const HeaderBarIndicator = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background: ${props => props.theme.colors.secondary};
  position: absolute;
  right: 6px;
  animation-name: ${IndicatorBlink};
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-duration: 1200ms;
  animation-timing-function: ease-in;
  visibility: hidden;
`;

const HeaderBarTitle = styled.p`
  width: 100%;
  max-width: calc(100% - 20px);
  margin: 0;
  font-style: italic;
  font-size: 9pt;
  color: ${props => props.theme.colors.grayBlueMedium};
  font-weight: 400;
  user-select: none;
  ${props => props.theme.extensions.ellipsis};
`;

const Header = styled(HeaderPartial)`
  &[data-active="true"] {
    ${HeaderBarTitle} {
      color: ${props => props.theme.colors.secondary};
    }
    ${HeaderBarIndicator} {
      visibility: visible;
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
  @media ${props => props.theme.medias.medium} {
    max-height: 260px;
    max-width: 260px;
    justify-content: center;
    margin: 0 auto;
    padding: 15px;
    position: relative;
  }
`;

const ContentMain = styled.div`
  flex: 1;
  z-index: 200;
`;

const ContentMainNetwork = styled(Network)`
  *[data-component="content-footer"] {
    visibility: hidden;
    & > * {
      display: none;
    }
  }
  *[data-component="content-image"] {
    max-height: 110px;
    max-width: 110px;
  }
`;

const ContentSide = styled.div`
  position: relative;
  z-index: 100;
  height: 100%;
  width: 100px;

  @media ${props => props.theme.medias.medium} {
    position: absolute;
    right: -40px;
    transform: rotate(30deg);
  }
`;

const ContentSideNetwork = styled(NetworkMini)`
  position: absolute;
  height: 60px;
  width: 60px;
  padding: 15px;
  box-shadow: 0 0 5px 1px ${props => rgba(props.theme.colors.dark, 0.05)};

  &:nth-child(1) {
    top: 30px;
    left: -15px;
  }
  &:nth-child(2) {
    top: 90px;
    left: 50px;
    transform: rotate(15deg);
    filter: blur(1px);
  }
  &:nth-child(3) {
    top: 160px;
    left: 10px;
    height: 50px;
    width: 50px;
    transform: rotate(-15deg);
    filter: blur(2px);
    opacity: 0.6;
  }
`;

function Preview({ className, reducer, network, isBarActive }) {
  const bar = useMemo(
    () =>
      ellipsis(
        `${_.toString(_.get(network, "url")) || "https://www.network.com"}/${_.toString(_.get(reducer.state.username, "value"))}`,
        40,
      ),
    [network, reducer.state.username],
  );

  return (
    <Wrapper className={className}>
      <Header data-active={isBarActive}>
        <HeaderActions>
          <HeaderAction />
          <HeaderAction />
          <HeaderAction />
        </HeaderActions>
        <HeaderBar>
          <HeaderBarTitle>{bar}</HeaderBarTitle>
          <HeaderBarIndicator />
        </HeaderBar>
      </Header>
      <Content>
        <ContentMain>
          <ContentMainNetwork {...network} isViewOnly isInEditMode />
        </ContentMain>
        <ContentSide>
          <ContentSideNetwork {...network} isViewOnly />
          <ContentSideNetwork {...network} isViewOnly />
          <ContentSideNetwork {...network} isViewOnly />
        </ContentSide>
      </Content>
    </Wrapper>
  );
}

Preview.propTypes = {
  className: PropTypes.string,
  isBarActive: PropTypes.bool,
  network: PropTypes.shape({}),
};

Preview.defaultProps = {
  className: null,
  isBarActive: false,
  network: {},
};

export default Preview;
