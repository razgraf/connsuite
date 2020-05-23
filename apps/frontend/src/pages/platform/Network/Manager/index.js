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
import { useNetworkCreateReducer, useNetworkCreateMachine } from "../../../../hooks";
import { Header, Preview, Footer, Steps } from "../../../../components/specific/Network/Manager";

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
    position: absolute;
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
`;
const StyledNav = styled(Nav)`
  position: relative;
  z-index: 200;
`;
const Canvas = styled(components.Canvas)`
  z-index: 100;
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
`;

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  min-height: 440px;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);

  overflow: hidden;

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
  margin-right: calc(${props => props.theme.sizes.edge} * 6);
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

  &[data-active="true"] {
    opacity: 1;
    transition: opacity 300ms 300ms;
    pointer-events: all;
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

function NetworkManager({ query }) {
  const type = types.network.manager[_.has(query, "id") ? "edit" : "create"];
  const auth = useSelector(state => state.auth);
  const reducer = useNetworkCreateReducer();
  const machine = useNetworkCreateMachine({ type: type.toUpperCase() });
  const step = useMemo(() => machine.current.context.step, [machine]);

  useEffect(() => console.log(machine.current.value), [machine]);

  const onForward = useCallback(() => {
    if (step === 3) {
      const network = {};
      console.log(reducer.state);
      Object.keys(reducer.state).forEach(key => {
        network[key] = reducer.state[key].value;
      });
      machine.send(machine.events.forward, { payload: { auth, network } });
    } else machine.send(machine.events.forward, { payload: reducer.state });
  }, [auth, machine, reducer, step]);

  const onBackward = useCallback(() => {
    machine.send(machine.events.backward);
  }, [machine]);

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

  return (
    <Page data-leaving={machine.current.value === machine.states.success}>
      <StyledNav appearance={types.nav.appearance.secondary} title={pages.network.create.title} hasParent />
      <Canvas>
        <Card>
          <Header step={step} source={source} />
          <Main>
            <Playground>
              <Choose isActive={step === 1} reducer={reducer} />
              <Credentials isActive={step === 2} reducer={reducer} />
              <Live isActive={step === 3} reducer={reducer} />
            </Playground>
            <Preview reducer={reducer} step={step} />
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
