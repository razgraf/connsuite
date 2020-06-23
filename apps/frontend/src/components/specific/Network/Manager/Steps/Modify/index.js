import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import guards, { policy } from "@razgraf/connsuite-guards";
import { types } from "../../../../../../constants";
import { InputArea, InputImage, InputText } from "../../../../../atoms";
import { readPreviewFromImage } from "../../../../../../utils";

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
  grid-column-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  grid-row-gap: 0;

  ${props =>
    props.columns === 2 &&
    css`
      & > *:last-child {
        grid-column: span 2;
      }
    `}

  & > * {
    width: 100%;
    grid-column: span 1;
  }
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

function Modify({ className, isActive, reducer }) {
  const onNetworkIconChoose = useCallback(
    file => {
      let payload = {
        name: null,
        value: null,
        error: "File not accepted",
      };
      if (!_.isNil(file)) {
        payload = {
          name: file.name,
          value: file,
          preview: null,
          error: guards.interpret(guards.isNetworkIconAcceptable, file),
        };

        if (payload.error === null)
          readPreviewFromImage(file).then(preview => {
            if (reducer.state.type.value === types.network.type.internal)
              reducer.dispatch({
                type: reducer.actions.UPDATE_ICON_PREVIEW,
                payload: preview,
              });
          });
        else
          reducer.dispatch({
            type: reducer.actions.UPDATE_ICON_PREVIEW,
            payload: null,
          });
      }

      reducer.dispatch({
        type: reducer.actions.UPDATE_ICON,
        payload,
      });
    },
    [reducer],
  );

  return (
    <Wrapper className={className} data-active={isActive}>
      <Section data-active={reducer.state.type.value === types.network.type.internal}>
        <Title>What updates do you have in mind?</Title>
        <Subtitle>
          If you wish to edit your network, this is the place to do it. Make sure that the modifications you have in mind are necessary as
          changes will directly affect your profile.
        </Subtitle>
        <Form columns={2}>
          <InputText
            help={{
              value: `Just like 'Facebook' or 'Twitter' you can give a name to your website/new network. ${policy.network.title.root}`,
            }}
            id="editNetworkTitle"
            label="Title"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_TITLE,
                payload: {
                  value: e.target.value,
                  error: guards.interpret(guards.isNetworkTitleAcceptable, e.target.value),
                },
              });
            }}
            placeholder="MySpace"
            value={reducer.state.type.value === types.network.type.internal ? reducer.state.title.value : ""}
            warning={reducer.state.title.error}
          />
          <InputImage
            help={{ value: `Provide a logo or an icon to make this stand out. ${policy.network.icon.root}` }}
            id="editNetworkIcon"
            label="Network Icon"
            isEventInterpreted
            onUpdate={onNetworkIconChoose}
            placeholder="Pick an icon"
            name={reducer.state.icon.name}
            value={reducer.state.icon.value}
            warning={reducer.state.icon.error}
          />
          <InputText
            help={{ value: `Where should we send people that click on the network? ${policy.network.url.root}` }}
            id="editNetworkUrl"
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
            id="editNetworkUsernameInternal"
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
          <InputArea
            help={{
              value: `This description will be shown when someone is interested in accessing your network. You can use this to separate business from personal accounts. ${policy.network.description.root}`,
            }}
            id="editNetworkDescription"
            label="Description (optional)"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_DESCRIPTION,
                payload: {
                  value: e.target.value,
                  error:
                    !_.isNil(e.target.value) && !_.isEmpty(e.target.value)
                      ? guards.interpret(guards.isNetworkDescriptionsAcceptable, e.target.value)
                      : null,
                },
              });
            }}
            placeholder="e.g. Contact me here for business inquiries only."
            value={reducer.state.description.value}
            warning={reducer.state.description.error}
          />
        </Form>
      </Section>
      <Section data-active={reducer.state.type.value === types.network.type.external}>
        <Title>What updates do you have in mind?</Title>
        <Subtitle>
          If you wish to edit your network, this is the place to do it. Make sure that the modifications you have in mind are necessary as
          changes will directly affect your profile.
        </Subtitle>
        <Form>
          <InputText
            help={{
              value: `You know how every social network asks for a username? What would yours be for this new custom network? ${policy.network.username.root}`,
            }}
            id="editNetworkUsernameExternal"
            label="Username"
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
          <InputArea
            help={{
              value: `This description will be shown when someone is interested in accessing your network. You can use this to separate business from personal accounts. ${policy.network.description.root}`,
            }}
            id="editNetworkDescription"
            label="Description (optional)"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_DESCRIPTION,
                payload: {
                  value: e.target.value,
                  error:
                    !_.isNil(e.target.value) && !_.isEmpty(e.target.value)
                      ? guards.interpret(guards.isNetworkDescriptionsAcceptable, e.target.value)
                      : null,
                },
              });
            }}
            placeholder="e.g. Contact me here for business inquiries only."
            value={reducer.state.description.value}
            warning={reducer.state.description.error}
          />
        </Form>
      </Section>
    </Wrapper>
  );
}

Modify.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  reducer: PropTypes.shape({
    actions: PropTypes.shape({}),
    dispatch: PropTypes.func,
    state: PropTypes.shape({}),
  }).isRequired,
};

Modify.defaultProps = {
  className: null,
  isActive: false,
};

export default Modify;
