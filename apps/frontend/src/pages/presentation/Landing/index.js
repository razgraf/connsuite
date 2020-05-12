import React from "react";
import styled from "styled-components";

import Nav from "../../../components/shared/Nav";
import { Header, Value, Finder, Connect } from "../../../components/specific/Landing";
import { types } from "../../../constants";
import { useAuth } from "../../../hooks";

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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
function Landing() {
  useAuth("public");

  return (
    <Page>
      <Top>
        <TopContent>
          <Nav appearance={types.nav.appearance.presentation} />
          <Header />
        </TopContent>
        <TopUnderlay />
      </Top>
      <Main>
        <Value />
        <Finder />
        <Connect />
      </Main>
    </Page>
  );
}

export default Landing;
