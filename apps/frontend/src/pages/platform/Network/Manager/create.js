import _ from "lodash";
import React, { useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconChoose from "@material-ui/icons/ExploreRounded";
import IconCredentials from "@material-ui/icons/HowToRegRounded";
import IconLive from "@material-ui/icons/FlashOnRounded";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types } from "../../../../constants";
import { useNetworkReducer, useNetworkCreateMachine, useExternalNetworks, useHistory } from "../../../../hooks";
import { Header, Preview, Footer, Steps } from "../../../../components/specific/Network/Manager";
import * as Head from "../../../../components/specific/Head";
import { scrollTop } from "../../../../utils";

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.gradients.primary};
  opacity: 1;

  &:before {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    z-index: 0;
    content: "";
    width: 100%;
    height: 214px;
    background: ${props => rgba(props.theme.colors.white, 0.05)};
  }

  &:after {
    position: fixed;
    z-index: ${props => props.theme.sizes.toastContainerElevation};
    left: 0;
    top: 0;
    content: "";
    width: 100vw;
    height: 100vh;
    background: ${props => rgba(props.theme.colors.dark, 0.25)};
    pointer-events: none;
    opacity: 0;
    transition: opacity 1500ms;
  }

  & > * {
    position: relative;
    z-index: 20;
  }

  &[data-leaving="true"] {
    &:after {
      opacity: 1;
      pointer-events: all;
      transition: opacity 1500ms;
    }
  }

  @media ${props => props.theme.medias.medium} {
    min-height: 100vh;
    height: auto;
  }
`;
const StyledNav = styled(Nav)`
  position: relative;
  z-index: 200;
  @media ${props => props.theme.medias.medium} {
    order: -1;
  }
`;
const Canvas = styled(components.Canvas)`
  z-index: 100;
  @media ${props => props.theme.medias.medium} {
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: 30px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
  @media ${props => props.theme.medias.medium} {
    border-radius: 0;
    margin: 0;
    min-height: calc(100vh - ${props => props.theme.sizes.navHeightMobile});
  }
`;

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  min-height: 440px;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  overflow: hidden;

  @media ${props => props.theme.medias.medium} {
    padding: calc(${props => props.theme.sizes.canvasEdgeMobile} * 1);
    padding-bottom: calc(${props => props.theme.sizes.canvasEdgeMobile} * 1 + ${props => props.theme.sizes.sideBarHeightMobile});
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
  }

  &:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    content: "";
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.white};
    pointer-events: none;
    display: none;
  }
`;

const Playground = styled.div`
  position: relative;
  z-index: 300;
  flex: 1;
  height: 100%;
  transition: height 0.3s;
`;

const StepCss = css`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 300ms;
  pointer-events: none;
  /* max-width: calc(100% - ${props => props.theme.sizes.networkManagerPreviewWidth}); */

  &[data-active="true"] {
    opacity: 1;
    transition: opacity 300ms 300ms;
    pointer-events: all;
  }


  @media ${props => props.theme.medias.medium} {
    position: absolute;

  &[data-active="true"] {
    position: relative;
  }
  }
`;

const Choose = styled(Steps.Choose)`
  ${StepCss};
`;
const Credentials = styled(Steps.Credentials)`
  ${StepCss};
`;
const Live = styled(Steps.Live)`
  ${StepCss};
`;

const source = {
  1: {
    index: 1,
    Icon: IconChoose,
    title: "Choose Network",
    left: "Cancel",
    right: "Next Step",
  },
  2: {
    index: 2,
    Icon: IconCredentials,
    title: "Fill in credentials",
    left: "Go Back",
    right: "Next Step",
  },
  3: {
    index: 3,
    Icon: IconLive,
    title: "Go Live",
    left: "Go Back",
    right: "Go Live",
    isFinal: true,
  },
};

function NetworkManager() {
  const auth = useSelector(state => state.auth);
  const reducer = useNetworkReducer();
  const machine = useNetworkCreateMachine();
  const external = useExternalNetworks() || { list: [] };
  const history = useHistory();
  const step = useMemo(() => machine.current.context.step, [machine]);

  const onForward = useCallback(() => {
    if (step === 3) {
      const network = {};
      Object.keys(reducer.state).forEach(key => {
        network[key] = reducer.state[key].value;
      });
      machine.send(machine.events.forward, { payload: { auth, network } });
    } else machine.send(machine.events.forward, { payload: reducer.state });
  }, [auth, machine, reducer, step]);

  const onBackward = useCallback(() => {
    if (step === 1) history.back({ fallback: pages.portfolio.root });
    machine.send(machine.events.backward);
  }, [machine, step, history]);

  const checkForward = useCallback(() => {
    if (step === 1) {
      if (reducer.state.type.value === types.network.type.external) {
        return machine.guards.isExternalChooseAcceptable(machine.context, { payload: reducer.state });
      } else return machine.guards.isInternalChooseAcceptable(machine.context, { payload: reducer.state });
    } else if (step === 2) {
      if (reducer.state.type.value === types.network.type.external)
        return machine.guards.isExternalCredentialsAcceptable(machine.context, { payload: reducer.state });
      else return machine.guards.isInternalCredentialsAcceptable(machine.context, { payload: reducer.state });
    } else if (step === 3) {
      return machine.guards.isLiveAcceptable(machine.context, { payload: reducer.state });
    }
    return true;
  }, [reducer, step, machine.guards, machine.context]);

  const interpreted = useMemo(() => {
    if (reducer.state.type.value === types.network.type.internal)
      return {
        url: reducer.state.url.value,
        title: reducer.state.title.value,
        username: reducer.state.username.value,
        icon: {
          url: reducer.state.icon.preview,
        },
      };
    else if (reducer.state.type.value === types.network.type.external)
      return external
        ? { ..._.get(external, "list").find(item => item._id === reducer.state.externalId.value), username: reducer.state.username.value }
        : {};
    return {};
  }, [reducer.state, external]);

  useEffect(() => {
    scrollTop();
  }, [step]);

  return (
    <Page data-leaving={machine.current.value === machine.states.success}>
      <Head.NetworkCreate />
      <StyledNav appearance={types.nav.appearance.secondary} title={pages.network.create.title} />
      <Canvas>
        <Card>
          <Header step={step} source={source} />
          <Main>
            <Playground>
              <Choose isActive={step === 1} reducer={reducer} />
              <Credentials isActive={step === 2} reducer={reducer} network={interpreted} />
              <Live isActive={step === 3} reducer={reducer} />
            </Playground>
            <Preview reducer={reducer} isBarActive={step === 2} network={interpreted} />
          </Main>
          <Footer step={source[step]} onForward={onForward} onBackward={onBackward} machine={machine} checkForward={checkForward} />
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
