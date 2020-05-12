import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import Router from "next/router";
import IconChoose from "@material-ui/icons/ExploreRounded";
import IconCredentials from "@material-ui/icons/HowToRegRounded";
import IconLive from "@material-ui/icons/FlashOnRounded";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types } from "../../../../constants";

import { Header, Footer } from "../../../../components/specific/Network/Manager";

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.gradients.primary};

  &:before {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    z-index: 0;
    content: "";
    width: 100%;
    height: 211px;
    background: ${props => rgba(props.theme.colors.white, 0.05)};
  }
  & > * {
    position: relative;
    z-index: 20;
  }
`;
const StyledNav = styled(Nav)`
  position: relative;
`;
const Canvas = styled(components.Canvas)``;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: 30px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Main = styled.div``;

const steps = {
  [types.network.manager.create]: [
    {
      index: 1,
      Icon: IconChoose,
      title: "Choose Network",
      left: "Cancel",
      leftClick: () => {},
      right: "Next Step",
      rightClick: () => {
        console.log("back");
        Router.back();
      },
      isStart: true,
    },
    {
      index: 2,
      Icon: IconCredentials,
      title: "Fill in credentials",
      left: "Cancel",
      leftClick: () => {},
      right: "Next Step",
      rightClick: () => {},
    },
    {
      index: 3,
      Icon: IconLive,
      title: "Go Live",
      left: "Cancel",
      leftClick: () => {},
      right: "Go Live",
      rightClick: () => {},
      isFinal: true,
    },
  ],
};

Router.events.on("routeChangeError", (err, url) => console.log(err, url));

function NetworkManager({ query }) {
  const [step, setStep] = useState(1);
  const type = types.network.manager.create;

  return (
    <Page>
      <StyledNav appearance={types.nav.appearance.secondary} title={pages.network.create.title} hasParent />
      <Canvas>
        <Card>
          <Header step={step} source={steps[type]} />
          <Main></Main>
          <Footer step={steps[type].find(item => item.index === step)} />
        </Card>
      </Canvas>
    </Page>
  );
}

NetworkManager.propTypes = {
  query: PropTypes.shape({}),
};

NetworkManager.defaultProps = {
  query: {},
};

export default NetworkManager;
