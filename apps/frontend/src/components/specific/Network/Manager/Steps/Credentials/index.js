import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DUMMY, types } from "../../../../../../constants";
import { NetworkMini } from "../../../../../shared/Network";
import guards, { policy } from "../../../../../../guards";
import { InputText, InputImage, Emoji } from "../../../../../atoms";

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
`;

const Section = styled(SectionPartial)`
  opacity: 1;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);

  &:last-of-type {
    margin-bottom: 0;
  }

  &[data-active="false"] {
    display: none;
  }
`;

function Credential({ className, isActive, reducer }) {
  const type = types.network.source.internal;

  return (
    <Wrapper className={className} data-active={isActive}>
      <Section data-active={type === types.network.source.internal}>
        <Title>Tell us more about this network/website. How can we reach it?</Title>
        <Subtitle>Aside from the url, you can optionally add a custom username. If empty, it will default to your First Name.</Subtitle>
        <Form columns={2}>
          <InputText
            help={{ value: "We need a link for the website so we know where to send people that click on the card." }}
            id="createNetworkUrl"
            label="Full link/URL"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_URL,
                payload: {
                  value: e.target.value,
                  error: null, // TODO guards.interpret(guards.isWebsiteAcceptable, e.target.value),
                },
              });
            }}
            placeholder="e.g. www.website.com/link/james"
            value={reducer.state.url.value}
            warning={reducer.state.url.error}
          />
          <InputText
            help={{ value: "Add your username here. For consistency, if empty, it will default to your First Name." }} // TODO
            id="createNetworkUsernameInternal"
            label="Username (optional)"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_USERNAME,
                payload: {
                  value: e.target.value,
                  error: null, // TODO guards.interpret(guards.isWebsiteAcceptable, e.target.value),
                },
              });
            }}
            placeholder="e.g. jamesdoe007"
            value={reducer.state.username.value}
            warning={reducer.state.username.error}
          />
        </Form>
      </Section>
      <Section data-active={type === types.network.source.external}>
        <Title>What is your username on Facebook?</Title>
        <Subtitle>
          Remember how every social network had to ask you for a username <Emoji symbol="🤔" />? You&apos;ll need it here.
        </Subtitle>
        <Form>
          <InputText
            help={{ value: "You know how every social network asks for a username? What would yours be for this new custom network?" }} // TODO
            id="createNetworkUsernameExternal"
            label="Username"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_USERNAME,
                payload: {
                  value: e.target.value,
                  error: null, // TODO guards.interpret(guards.isWebsiteAcceptable, e.target.value),
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
};

Credential.defaultProps = {
  className: null,
  isActive: false,
};

export default Credential;
