import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconArrowDown from "@material-ui/icons/KeyboardArrowDownRounded";

import { components } from "../../../../../themes";
import { pages } from "../../../../../constants";
import { useHistory, useIntersection, useCover, useOnClickOutside } from "../../../../../hooks";
import { Account, Logo } from "../../atoms";
import { Dropdown } from "../../../../atoms";
import { NetworkMini, NetworkMiniMore } from "../../../Network";

const WrapperPartial = styled.div`
  position: fixed;
  top: 0;
  z-index: ${props => props.theme.sizes.navElevation};
  order: 1;
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.grayLight};
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.15);
  transition: box-shadow 300ms;

  &[data-top="true"] {
    box-shadow: 0 10px 38px -12px rgba(0, 0, 0, 0);
    transition: box-shadow 300ms;
  }
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
  padding: 0 calc(${props => props.theme.sizes.edge} * 1);
`;

const AccountWrapper = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
const NavAccountWrapper = styled.div`
  position: relative;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
    transition: opacity 200ms;
  }
`;
const NavAccount = styled(Account)`
  z-index: 100;
  & > div[data-component="pill"] {
    border: 1px solid ${props => props.theme.colors.grayLight};
  }
`;

const NavNetworks = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  height: 100%;
  z-index: 200;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
    transition: opacity 200ms;
  }
  & > * {
    height: calc(${props => props.theme.sizes.navHeight} - 2 * 10px);
    width: calc(${props => props.theme.sizes.navHeight} - 2 * 10px);
    padding: 10px;
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
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

const Navigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 15px;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: calc(100% - 2 * 15px);
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-radius: 2px;
  & > p {
    margin: 0;
    font-family: ${props => props.theme.fonts.primary};
    font-size: 12pt;
    color: ${props => props.theme.colors.secondary};
    text-align: left;
    font-weight: 600;
  }
`;

const Wrapper = styled(WrapperPartial)``;

const Intersection = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  order: 0;
`;

const Action = styled.div`
  margin: 0 0 0 calc(${props => props.theme.sizes.edge} * 1 / 3);
  margin-right: -5px;
`;

const ActionDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: ${props => props.theme.colors.white};
  transform: rotate(0deg);
  transition: background 200ms, transform 200ms;

  &:hover,
  &:active {
    background: ${props => props.theme.colors.grayBlueLight};
    transition: background 200ms, transform 200ms;
  }

  &[data-active="true"] {
    transform: rotate(180deg);
    transition: transform 200ms;
  }

  & > * {
    color: ${props => props.theme.colors.grayBlueBlack};
    user-select: none;
  }
`;

const NavigatorDropdown = styled(Dropdown)`
  top: calc(${props => props.theme.sizes.navHeight} + 5px);
  left: 0;
  min-width: 160px;
  & > a {
    padding: 15px;
    & > * {
      font-size: 10pt;
      color: ${props => props.theme.colors.dark};
    }
  }
`;

function NavProfile({ className, title, networks, hasParent, onBackClick }) {
  const { setOpen: setCoverOpen, setNetwork: setCoverNetwork } = useCover();
  const { history, pop } = useHistory();
  const parentRoute = useMemo(
    () => (!_.isNil(onBackClick) ? null : hasParent && history.length ? _.get(history[history.length - 1], "route") : pages.dashboard.root),
    [hasParent, history, onBackClick],
  );
  const onLogoClick = useCallback(() => {
    if (!_.isNil(onBackClick) && _.isFunction(onBackClick)) onBackClick();
    else pop();
  }, [onBackClick, pop]);

  const [ref, entry] = useIntersection({
    threshold: 0,
    rootMargin: "0px",
    root: null,
  });

  const onNetworkClick = useCallback(
    network => {
      setCoverNetwork(network);
      setCoverOpen(true);
    },
    [setCoverNetwork, setCoverOpen],
  );

  const [isDown, setIsDown] = useState(false);
  const [navigatorRef] = useOnClickOutside(() => setIsDown(false));

  return (
    <>
      <Wrapper className={className} data-top={entry.intersectionRatio === 1}>
        <Content>
          <NavLogo href={parentRoute} hasParent={hasParent} onClick={onLogoClick} />
          <Main>
            <Title>{title}</Title>
            <Navigator ref={navigatorRef}>
              <Box>
                <p>Profile</p>
                <Action>
                  <ActionDropdown data-active={isDown} onClick={() => setIsDown(!isDown)}>
                    <IconArrowDown style={{ fontSize: "11pt" }} />
                  </ActionDropdown>
                </Action>
              </Box>
              <NavigatorDropdown
                isActive={isDown}
                items={[
                  {
                    title: "Profile",
                    isActive: true,
                  },
                  {
                    title: "Business Card",
                  },
                ]}
                onItemClick={item => {
                  setIsDown(false);
                }}
              />
            </Navigator>
          </Main>
          <AccountWrapper>
            <NavAccountWrapper data-active={entry.intersectionRatio === 1}>
              <NavAccount />
            </NavAccountWrapper>
            <NavNetworks data-active={entry.intersectionRatio !== 1}>
              {_.toArray(networks)
                .slice(0, 4)
                .map(network => (
                  <NetworkMini {...network} key={network._id} onClick={() => onNetworkClick(network)} />
                ))}
              {_.toArray(networks).length > 4 && <NetworkMiniMore />}
            </NavNetworks>
          </AccountWrapper>
        </Content>
      </Wrapper>
      <Intersection ref={ref} />
    </>
  );
}

NavProfile.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  networks: PropTypes.arrayOf(PropTypes.shape({})),
  hasParent: PropTypes.bool,
  onBackClick: PropTypes.func,
};

NavProfile.defaultProps = {
  className: null,
  networks: [],
  hasParent: false,
  onBackClick: null,
};

export default NavProfile;
