import React from "react";
import styled from "styled-components";
import AssetLogo from "../../../../assets/logo/logo_horiz_white.png";
import { pages } from "../../../../constants";
import { components } from "../../../../themes";
import { Button } from "../../../atoms";

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  height: ${props => props.theme.sizes.navHeight};
`;

const LogoWrapper = styled.div`
  height: 40px;
  width: auto;
  margin-right: auto;
`;

const Logo = styled.img`
  object-fit: contain;
  height: 100%;
`;

export function NavProfile() {
  return (
    <Wrapper>
      <Content>Profile</Content>
    </Wrapper>
  );
}
