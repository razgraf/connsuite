import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Network, { NetworkMini } from "../../../../shared/Network";
import { types, DUMMY } from "../../../../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  border: 1px solid ${props => props.theme.colors.grayAccent};
  border-right: none;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  padding-top: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-right: 0;
  border-radius: calc(${props => props.theme.sizes.edge} * 2) 0 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const HeaderPartial = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
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
  background: ${props => props.theme.colors.grayBlueLight};
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

const ContentSideNetwork = styled(NetworkMini)`
  position: absolute;
  height: 60px;
  width: 60px;
  padding: 15px;

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

function Preview({ className, reducer, step }) {
  console.log(reducer);
  const network = useMemo(() => {
    if (reducer.state.type.value === types.network.source.internal)
      return {
        url: reducer.state.url.value,
        title: reducer.state.title.value,
        username: reducer.state.username.value,
        icon: {
          source: reducer.state.icon.preview,
        },
      };

    return DUMMY.NETWORKS.find(item => item._id === reducer.state.externalId.value) || {};
  }, [reducer.state]);

  return (
    <Wrapper className={className}>
      <Header data-active={step === 2}>
        <HeaderActions>
          <HeaderAction />
          <HeaderAction />
          <HeaderAction />
        </HeaderActions>
        <HeaderBar>
          <HeaderBarTitle>
            {`${_.get(reducer.state, "url.value") || "https://preview"}/${_.get(reducer.state, "username.value") || ""}`}
          </HeaderBarTitle>
        </HeaderBar>
      </Header>
      <Content>
        <ContentMain>
          <ContentMainNetwork {...network} isViewOnly />
        </ContentMain>
        <ContentSide>
          <ContentSideNetwork network={network} isViewOnly />
          <ContentSideNetwork network={network} isViewOnly />
          <ContentSideNetwork network={network} isViewOnly />
        </ContentSide>
      </Content>
    </Wrapper>
  );
}

Preview.propTypes = {
  className: PropTypes.string,
  step: PropTypes.number.isRequired,
};

Preview.defaultProps = {
  className: null,
};

export default Preview;
