import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DUMMY, types } from "../../../../../../constants";
import { NetworkMini } from "../../../../../shared/Network";
import guards, { policy } from "../../../../../../guards";
import { InputText, InputImage } from "../../../../../atoms";
import { readPreviewFromImage } from "../../../../../../utils";

const Wrapper = styled.div``;

const SectionPartial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 2) 0;
  & > p {
    font-size: 14pt;
    font-weight: 400;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.grayBlueNight};
    transition: color 150ms;
    margin: 0;
  }
`;

const Label = styled.div`
  padding: 4px 8px;
  border-radius: 2px;
  text-align: center;
  background-color: ${props => props.theme.colors.grayBlueMedium};
  transition: background-color 150ms;
  margin-left: 8px;

  & > span {
    font-size: 9pt;
    font-weight: 600;
    color: ${props => props.theme.colors.white};
    display: flex;
    margin: 0;
    &:first-child {
      display: none;
    }
    &:last-child {
      color: ${props => props.theme.colors.grayBlueNight};
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  min-height: 160px;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(${props => props.theme.sizes.edge} * 1.5);
`;

const Section = styled(SectionPartial)`
  opacity: 0.7;
  transition: opacity 150ms;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight};
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: none;
  }
  &[data-active="true"] {
    opacity: 1;
    cursor: default;
    ${Title} > p {
      color: ${props => props.theme.colors.secondary};
      transition: color 150ms;
    }
    ${Label} {
      background-color: ${props => props.theme.colors.secondary};
      transition: background-color 150ms;
      & > span {
        display: flex;
        &:last-child {
          display: none;
        }
      }
    }
  }
`;

const StyledNetworkMini = styled(NetworkMini)`
  height: 50px;
  width: 50px;
  padding: 10px;
`;

function Choose({ className, isActive, reducer }) {
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
      }

      reducer.dispatch({
        type: reducer.actions.UPDATE_ICON,
        payload,
      });

      readPreviewFromImage(file).then(preview => {
        if (reducer.state.type.value === types.network.source.internal)
          reducer.dispatch({
            type: reducer.actions.UPDATE_ICON_PREVIEW,
            payload: preview,
          });
      });
    },
    [reducer],
  );

  const onNetworkTypeChange = useCallback(
    type => {
      if (reducer.state.type.value !== type) {
        reducer.dispatch({
          type: reducer.actions.UPDATE_TYPE,
          payload: { value: type, error: null },
        });
      }
    },
    [reducer],
  );

  return (
    <Wrapper className={className} data-active={isActive}>
      <Section
        data-active={reducer.state.type.value === types.network.source.external}
        onClick={() => onNetworkTypeChange(types.network.source.external)}
      >
        <Title>
          <p>a. Choose the network you want to add</p>
          <Label>
            <span>Active</span>
            <span>Click to switch</span>
          </Label>
        </Title>
        <Grid>
          {DUMMY.NETWORKS.map(item => (
            <StyledNetworkMini
              key={item._id}
              network={item}
              isFocused={item._id === reducer.state.externalId.value}
              onClick={() => {
                reducer.dispatch({
                  type: reducer.actions.UPDATE_EXTERNAL_ID,
                  payload: {
                    value: item._id,
                    error: null,
                  },
                });
              }}
            />
          ))}
        </Grid>
      </Section>
      <Section
        data-active={reducer.state.type.value === types.network.source.internal}
        onClick={() => onNetworkTypeChange(types.network.source.internal)}
      >
        <Title>
          <p>b. Or create a custom network</p>
          <Label>
            <span>Active</span>
            <span>Click to switch</span>
          </Label>
        </Title>
        <Form>
          <InputText
            help={{
              value: `Just like 'Facebook' or 'Twitter' you can give a name to your website/new network. ${policy.network.title.root}`,
            }}
            id="createNetworkTitle"
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
            value={reducer.state.type.value === types.network.source.internal ? reducer.state.title.value : ""}
            warning={reducer.state.title.error}
          />
          <InputImage
            help={{ value: `Provide a logo or an icon to make this stand out. ${policy.network.icon.root}` }}
            id="createNetworkIcon"
            label="Network Icon"
            isEventInterpreted
            onUpdate={onNetworkIconChoose}
            placeholder="Pick an icon"
            name={reducer.state.icon.name}
            value={reducer.state.icon.value}
            warning={reducer.state.icon.error}
          />
        </Form>
      </Section>
    </Wrapper>
  );
}

Choose.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  reducer: PropTypes.shape({
    actions: PropTypes.shape({}),
    dispatch: PropTypes.func,
    state: PropTypes.shape({}),
  }).isRequired,
};

Choose.defaultProps = {
  className: null,
  isActive: false,
};

export default Choose;