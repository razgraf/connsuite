import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import AssetLogoCircle from "../../../../assets/logo/logo.png";
import { components } from "../../../../themes";
import { Account } from "../atoms";

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
  max-width: calc(${props => props.theme.sizes.canvasMaxWidth} + 15px);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge});
  width: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge});
  border-radius: 50%;
  background-image: ${props => props.theme.colors.white};
  overflow: hidden;
`;

const Logo = styled.img`
  object-fit: contain;
  height: 100%;
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

function NavPlatform() {
  return (
    <Wrapper>
      <Content>
        <LogoWrapper>
          <Logo src={AssetLogoCircle} alt="" />
        </LogoWrapper>
        <Main />
        <AccountWrapper>
          <Account />
        </AccountWrapper>
      </Content>
    </Wrapper>
  );
}

export default NavPlatform;
