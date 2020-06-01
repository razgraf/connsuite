import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { components } from "../../../../../themes";
import { pages, types } from "../../../../../constants";
import { useHistory } from "../../../../../hooks";
import { Account, Logo } from "../../atoms";

const WrapperPartial = styled.div`
  position: fixed;
  top: 0;
  z-index: ${props => props.theme.sizes.navElevation};
  order: 1;
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.grayLight};
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.sizes.navHeight};
  padding: 0 ${props => props.theme.sizes.navHorizontalEdge};
  max-width: calc(${props => props.theme.sizes.canvasMaxWidth});
`;

const NavLogo = styled(Logo)`
  border: 1px solid ${props => props.theme.colors.grayLight};
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  padding: 0 calc(${props => props.theme.sizes.edge} * 1);
`;

const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavAccountWrapper = styled.div`
  position: relative;
  opacity: 0;
  transition: opacity 200ms;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
    transition: opacity 200ms;
  }
`;
const NavAccount = styled(Account)`
  & > div[data-component="pill"] {
    border: 1px solid ${props => props.theme.colors.grayLight};
  }
`;

const NavNetworks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  opacity: 0;
  transition: opacity 200ms;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
    transition: opacity 200ms;
  }
`;

const Title = styled.p`
  margin: 0;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14pt;
  color: ${props => props.theme.colors.dark};
  text-align: left;
  font-weight: 400;
`;

const Wrapper = styled(WrapperPartial)``;

function NavProfile({ className, hasAccount, hasParent, title, onBackClick }) {
  const { history, pop } = useHistory();
  const parentRoute = useMemo(
    () => (!_.isNil(onBackClick) ? null : hasParent && history.length ? _.get(history[history.length - 1], "route") : pages.dashboard.root),
    [hasParent, history, onBackClick],
  );

  const onLogoClick = useCallback(() => {
    if (!_.isNil(onBackClick) && _.isFunction(onBackClick)) onBackClick();
    else pop();
  }, [onBackClick, pop]);

  return (
    <Wrapper className={className}>
      <Content>
        <NavLogo href={parentRoute} hasParent={hasParent} onClick={onLogoClick} />
        <Main>
          <Title>{title}</Title>
        </Main>
        <AccountWrapper>
          <NavAccountWrapper data-active={hasAccount}>
            <NavAccount />
          </NavAccountWrapper>
          <NavNetworks data-active={!hasAccount}>
            <p>Networks</p>
          </NavNetworks>
        </AccountWrapper>
      </Content>
    </Wrapper>
  );
}

NavProfile.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  hasAccount: PropTypes.bool,
  hasParent: PropTypes.bool,
  onBackClick: PropTypes.func,
};

NavProfile.defaultProps = {
  className: null,
  hasAccount: true,
  hasParent: false,
  onBackClick: null,
};

export default NavProfile;
