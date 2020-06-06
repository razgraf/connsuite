import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconLive from "@material-ui/icons/FlashOnRounded";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { Warning, Spinner } from "../../../../components/atoms";
import { pages, types } from "../../../../constants";
import { useNetworkReducer, useNetworkEditMachine, useHistory } from "../../../../hooks";
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

const StyledWarning = styled(Warning)`
  & > p {
    font-size: 11pt;
  }
`;

const Loader = styled.div`
  ${StepCss};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Explainer = styled.div`
  ${StepCss};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modify = styled(Steps.Modify)`
  ${StepCss};
`;

const source = {
  1: {
    index: 1,
    Icon: IconLive,
    title: "Edit Attributes and Go Live",
    left: "Cancel changes",
    right: "Edit and Go Live",
    isFinal: true,
  },
};

function NetworkManager({ query }) {
  const networkId = _.get(query, "id");
  const auth = useSelector(state => state.auth);
  const reducer = useNetworkReducer();
  const machine = useNetworkEditMachine({ networkId, reducer });
  const history = useHistory();

  const onForward = useCallback(() => {
    const network = {};
    Object.keys(reducer.state).forEach(key => {
      network[key] = reducer.state[key].value;
    });
    machine.send(machine.events.forward, { payload: { auth, network, networkId } });
  }, [auth, machine, reducer, networkId]);

  const onBackward = useCallback(() => {
    history.back({ fallback: pages.portfolio.root });
  }, [history]);

  const checkForward = useCallback(() => {
    if (reducer.state.type.value === types.network.type.external)
      return machine.guards.isExternalModifyAcceptable(machine.current.context, { payload: { ...reducer.state, networkId } });
    else return machine.guards.isInternalModifyAcceptable(machine.current.context, { payload: { ...reducer.state, networkId } });
  }, [reducer, machine, networkId]);

  const interpreted = useMemo(() => {
    return {
      url: reducer.state.url.value,
      title: reducer.state.title.value,
      username: reducer.state.username.value,
      icon: {
        url: reducer.state.icon.preview,
      },
    };
  }, [reducer.state]);

  return (
    <Page data-leaving={machine.current.value === machine.states.success}>
      <StyledNav appearance={types.nav.appearance.secondary} title={pages.network.edit.title} hasParent />
      <Canvas>
        <Card>
          <Header step={1} source={source} />
          <Main>
            <Playground>
              <Loader data-active={machine.current.value === machine.states.retrieve}>
                <Spinner color={c => c.secondary} size={50} thickness={2} />
              </Loader>
              <Explainer data-active={machine.current.value === machine.states.forbidden}>
                <StyledWarning isCentered value={machine.current.context.error} />
              </Explainer>
              <Modify
                isActive={![machine.states.idle, machine.states.retrieve, machine.states.forbidden].includes(machine.current.value)}
                reducer={reducer}
              />
            </Playground>
            <Preview reducer={reducer} isBarActive network={interpreted} />
          </Main>
          <Footer step={source[1]} onForward={onForward} onBackward={onBackward} machine={machine} checkForward={checkForward} />
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
