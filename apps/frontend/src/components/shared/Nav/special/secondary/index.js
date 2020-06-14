import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconArrow from "@material-ui/icons/KeyboardArrowRight";

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
  background: ${props => props.theme.gradients.primary};
  box-shadow: 0 -10px 30px 12px ${props => rgba(props.theme.colors.secondary, 0.3)};
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.sizes.navHeight};
  padding: 0 ${props => props.theme.sizes.navHorizontalEdge};
  max-width: calc(${props => props.theme.sizes.canvasMaxWidth});
  @media ${props => props.theme.medias.small} {
    height: ${props => props.theme.sizes.navHeightMobile};
  }
`;

const NavLogo = styled(Logo)``;

const Main = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  padding: 0 calc(${props => props.theme.sizes.edge} * 1);
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavAccount = styled(Account)``;

const IconWrapper = styled.div`
  margin-right: calc(${props => props.theme.sizes.edge} * 1);
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;

const Title = styled.p`
  margin: 0;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 14pt;
  color: ${props => props.theme.colors.white};
  text-align: left;
  font-weight: 400;
`;

const Wrapper = styled(WrapperPartial)`
   &[data-accent="${types.nav.accent.transparent}"]{
    box-shadow: none;
    background: transparent;
  }

  &[data-accent="${types.nav.accent.white}"]{
    box-shadow: none;
    background: ${props => props.theme.colors.white};;
    border-bottom: 1px solid ${props => props.theme.colors.grayLight};
    ${Title}, ${IconWrapper} > *{
      color: ${props => props.theme.colors.dark};
    }
    ${NavLogo}{
      border: 1px solid ${props => props.theme.colors.grayLight};
    }
    ${NavAccount}{
      & > div[data-component="pill"]{
        border: 1px solid ${props => props.theme.colors.grayLight};
      }
    }
  }
`;

function NavSecondary({ className, accent, hasAccount, title, onBackClick }) {
  const { history, pop } = useHistory();
  const parentRoute = useMemo(
    () => (!_.isNil(onBackClick) ? null : history.length ? _.get(history[history.length - 1], "route") : pages.dashboard.root),
    [history, onBackClick],
  );

  const onLogoClick = useCallback(() => {
    if (!_.isNil(onBackClick) && _.isFunction(onBackClick)) onBackClick();
    else pop();
  }, [onBackClick, pop]);

  return (
    <Wrapper className={className} data-accent={accent}>
      <Content>
        <NavLogo href={parentRoute} onClick={onLogoClick} />
        <Main>
          <IconWrapper>
            <IconArrow style={{ fontSize: "16pt" }} />
          </IconWrapper>
          <Title>{title}</Title>
        </Main>
        {hasAccount && (
          <AccountWrapper>
            <NavAccount />
          </AccountWrapper>
        )}
      </Content>
    </Wrapper>
  );
}

NavSecondary.propTypes = {
  accent: PropTypes.oneOf(Object.values(types.nav.accent)),
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  hasAccount: PropTypes.bool,
  onBackClick: PropTypes.func,
};

NavSecondary.defaultProps = {
  accent: types.nav.accent.transparent,
  className: null,
  hasAccount: true,
  onBackClick: null,
};

export default NavSecondary;
