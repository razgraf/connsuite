import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import Network from "../../../../shared/Network";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  border: 1px solid ${props => props.theme.colors.grayAccent};
  border-right: none;
  padding: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-right: 0;
  border-radius: calc(${props => props.theme.sizes.edge} * 2) 0 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const HeaderPartial = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-bottom: calc(${props => props.theme.sizes.edge} * 1.5);
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
  flex: 1;
  background: ${props => props.theme.colors.grayBlueGhost};
  border-radius: 4px;
  padding: 6px 10px;
  margin-left: 4px;
`;

const HeaderBarTitle = styled.p`
  width: 100%;
  max-width: 100%;
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
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
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
`;

const ContentSideNetwork = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  padding: 10px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 0 5px 1px ${props => rgba(props.theme.colors.dark, 0.05)};
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-radius: 4px;

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

const ContentSideNetworkImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

function Preview({ className, network, isBarActive }) {
  return (
    <Wrapper className={className}>
      <Header data-active={isBarActive}>
        <HeaderActions>
          <HeaderAction />
          <HeaderAction />
          <HeaderAction />
        </HeaderActions>
        <HeaderBar>
          <HeaderBarTitle>{`${_.get(network, "URL")}/${_.get(network, "username")}`}</HeaderBarTitle>
        </HeaderBar>
      </Header>
      <Content>
        <ContentMain>
          <ContentMainNetwork {...network} isViewOnly />
        </ContentMain>
        <ContentSide>
          <ContentSideNetwork>
            <ContentSideNetworkImage src={_.get(network, "icon.source")} alt="" />
          </ContentSideNetwork>
          <ContentSideNetwork>
            <ContentSideNetworkImage src={_.get(network, "icon.source")} alt="" />
          </ContentSideNetwork>
          <ContentSideNetwork>
            <ContentSideNetworkImage src={_.get(network, "icon.source")} alt="" />
          </ContentSideNetwork>
        </ContentSide>
      </Content>
    </Wrapper>
  );
}

Preview.propTypes = {
  className: PropTypes.string,
  network: PropTypes.shape({}).isRequired,
  isBarActive: PropTypes.bool,
};

Preview.defaultProps = {
  className: null,
  isBarActive: false,
};

export default Preview;
