import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import guards, { policy } from "@connsuite/guards";
import { types } from "../../../../../../constants";
import { InputText, Emoji } from "../../../../../atoms";

const Wrapper = styled.div``;

const SectionPartial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.p`
  font-size: 14pt;
  font-weight: 400;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueNight};
  transition: color 150ms;
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 1) 0;
`;

const Subtitle = styled.p`
  font-size: 11pt;
  font-weight: 400;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueDark};
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 2) 0;
  line-height: 1.5;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  grid-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  @media ${props => props.theme.medias.medium} {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;

const Section = styled(SectionPartial)`
  opacity: 1;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  @media ${props => props.theme.medias.medium} {
    margin-bottom: calc(${props => props.theme.sizes.canvasEdgeMobile} * 1);
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &[data-active="false"] {
    display: none;
  }
`;

function Credential({ className, isActive, reducer, network }) {
  return (
    <Wrapper className={className} data-active={isActive}>
      <Section data-active={reducer.state.type.value === types.network.type.internal}>
        <Title>Tell us more about this network/website. How can we reach it?</Title>
        <Subtitle>Aside from the url, you can optionally add a custom username. If empty, it will default to your First Name.</Subtitle>
        <Form columns={2}>
          <InputText
            help={{ value: `Where should we send people that click on the network? ${policy.network.url.root}` }}
            id="createNetworkUrl"
            label="Full link/URL"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_URL,
                payload: {
                  value: e.target.value,
                  error: guards.interpret(guards.isNetworkUrlAcceptable, e.target.value),
                },
              });
            }}
            placeholder="e.g. www.website.com/link/james"
            value={reducer.state.url.value}
            warning={reducer.state.url.error}
          />
          <InputText
            help={{ value: "Add your username here. You can leave this empty if the network is a personal website or similar." }}
            id="createNetworkUsernameInternal"
            label="Username (optional)"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_USERNAME,
                payload: {
                  value: e.target.value,
                  error:
                    !_.isNil(e.target.value) && !_.isEmpty(e.target.value)
                      ? guards.interpret(guards.isNetworkUsernameAcceptable, e.target.value)
                      : null,
                },
              });
            }}
            placeholder="e.g. jamesdoe007"
            value={reducer.state.username.value}
            warning={reducer.state.username.error}
          />
        </Form>
      </Section>
      <Section data-active={reducer.state.type.value === types.network.type.external}>
        <Title>What is your username on {_.get(network, "title")}?</Title>
        <Subtitle>
          Remember how every social network had to ask you for a username <Emoji symbol="🤔" />? You&apos;ll need it here.
        </Subtitle>
        <Form>
          <InputText
            help={{
              value: `You know how every social network asks for a username? What would yours be for this new custom network? ${policy.network.username.root}`,
            }}
            id="createNetworkUsernameExternal"
            label="Username*"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_USERNAME,
                payload: {
                  value: e.target.value,
                  error: guards.interpret(guards.isNetworkUsernameAcceptable, e.target.value),
                },
              });
            }}
            placeholder="e.g. jamesdoe007"
            value={reducer.state.username.value}
            warning={reducer.state.username.error}
          />
        </Form>
      </Section>
    </Wrapper>
  );
}

Credential.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  reducer: PropTypes.shape({
    actions: PropTypes.shape({}),
    dispatch: PropTypes.func,
    state: PropTypes.shape({}),
  }).isRequired,
  network: PropTypes.shape({}),
};

Credential.defaultProps = {
  className: null,
  isActive: false,
  network: {},
};

export default Credential;
