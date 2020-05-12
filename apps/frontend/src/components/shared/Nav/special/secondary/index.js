import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconArrow from "@material-ui/icons/KeyboardArrowRight";

import { components } from "../../../../../themes";
import { pages, types } from "../../../../../constants";
import { useHistory } from "../../../../../hooks";
import { Account, Logo } from "../../atoms";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: ${props => props.theme.sizes.navElevation};
  order: 1;

  width: 100%;
  background: ${props => props.theme.gradients.primary};
  box-shadow: 0 -10px 30px 12px ${props => rgba(props.theme.colors.secondary, 0.3)};


  &[data-accent="${types.nav.accent.transparent}"]{
    box-shadow: none;
    background: transparent;
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
  font-size: 15pt;
  color: ${props => props.theme.colors.white};
  text-align: left;
  font-weight: 400;
`;

function NavSecondary({ className, accent, hasAccount, hasParent, title }) {
  const { history, pop } = useHistory();
  const parentRoute = useMemo(() => (hasParent && history.length ? _.get(history[history.length - 1], "route") : pages.dashboard.root), [
    hasParent,
    history,
  ]);

  return (
    <Wrapper className={className} data-accent={accent}>
      <Content>
        <Logo href={parentRoute} hasParent={hasParent} onClick={pop} />
        <Main>
          <IconWrapper>
            <IconArrow style={{ fontSize: "16pt" }} />
          </IconWrapper>
          <Title>{title}</Title>
        </Main>
        {hasAccount && (
          <AccountWrapper>
            <Account />
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
  hasParent: PropTypes.bool,
};

NavSecondary.defaultProps = {
  accent: types.nav.accent.transparent,
  className: null,
  hasAccount: true,
  hasParent: false,
};

export default NavSecondary;
