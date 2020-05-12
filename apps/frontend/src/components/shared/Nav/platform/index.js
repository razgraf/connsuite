import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { components } from "../../../../themes";
import { Account, Logo } from "../atoms";
import { pages } from "../../../../constants";

const Wrapper = styled.div`
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
`;

const Main = styled.div`
  height: 100%;
  flex: 1;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NavPlatform({ className }) {
  return (
    <Wrapper className={className}>
      <Content>
        <Logo href={pages.dashboard.root} />
        <Main />
        <AccountWrapper>
          <Account />
        </AccountWrapper>
      </Content>
    </Wrapper>
  );
}

NavPlatform.propTypes = {
  className: PropTypes.string,
};

NavPlatform.defaultProps = {
  className: null,
};

export default NavPlatform;
