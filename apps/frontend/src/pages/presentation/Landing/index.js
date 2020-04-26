import React from "react";
import styled from "styled-components";

import Nav from "../../../components/shared/Nav";
import { Header } from "../../../components/specific/Landing";
import { types } from "../../../constants";

const Page = styled.div`
  width: 100%;
`;

const Top = styled.div`
  ${props => props.theme.animations.gradientMovementCss}
  background: ${props => props.theme.gradients.primary};
  position: relative;
  width: 100%;
`;

const TopContent = styled.div`
  z-index: 200;
  position: relative;
`;

const TopUnderlay = styled.div`
  z-index: 100;
  position: absolute;
`;

function Landing() {
  return (
    <Page>
      <Top>
        <TopContent>
          <Nav type={types.nav.presentation} />
          <Header />
        </TopContent>
        <TopUnderlay />
      </Top>
    </Page>
  );
}

export default Landing;
