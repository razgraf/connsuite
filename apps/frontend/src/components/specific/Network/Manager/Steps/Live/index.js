import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import guards, { policy } from "@connsuite/guards";
import { types, DUMMY } from "../../../../../../constants";
import { InputArea, Emoji } from "../../../../../atoms";

const Wrapper = styled.div``;

const SectionPartial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex-shrink: 0;
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

  textarea {
    min-height: 60px;
  }
`;

const Grid = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: calc(${props => props.theme.sizes.edge} * 1);
  grid-column-gap: calc(${props => props.theme.sizes.edge} * 1);
`;

const Field = styled.div`
  grid-column: span 1;
  padding: 6px 12px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.grayBlueGhost};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};

  & > p {
    text-align: left;
    font-weight: 600;
    font-size: 11pt;
    margin: 0;
    color: ${props => props.theme.colors.secondary};
    & > span {
      font-weight: 400;
      padding-left: 6px;
      color: ${props => props.theme.colors.dark};
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  flex-shrink: 0;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.grayBlueLight};
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

function Live({ className, isActive, reducer }) {
  const network = useMemo(() => {
    if (reducer.state.type.value === types.network.source.internal)
      return {
        url: reducer.state.url.value,
        title: reducer.state.title.value,
        username: reducer.state.username.value,
        icon: {
          source: reducer.state.icon.preview,
        },
      };

    return DUMMY.NETWORKS.find(item => item._id === reducer.state.externalId.value) || {}; // TODO System for external networks
  }, [reducer.state]);

  return (
    <Wrapper className={className} data-active={isActive}>
      <Section>
        <Title>
          You are almost there <Emoji symbol="👌" />
        </Title>
        <Subtitle>
          Once you go live, you&amp;ll have one more network added to your online business card! To confirm everything, click on the
          &quot;Go Live&quot; button.
        </Subtitle>
        <Grid>
          <Field>
            <p>
              Network: <span>{_.get(network, "title")}</span>
            </p>
          </Field>
          <Field>
            <p>
              Username: <span>{_.get(network, "username")}</span>
            </p>
          </Field>
          <Field>
            <p>
              Link/URL: <span>{_.get(network, "url")}</span>
            </p>
          </Field>
        </Grid>
      </Section>
      <Divider />
      <Section>
        <Subtitle>* P.S. Optionally, you could add a description to this account.</Subtitle>
        <Form>
          <InputArea
            help={{
              value: `This description will be shown when someone is interested in accessing your network. You can use this to separate business from personal accounts. ${policy.network.description.root}`,
            }}
            id="createNetworkDescription"
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

Live.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  reducer: PropTypes.shape({}).isRequired,
};

Live.defaultProps = {
  className: null,
  isActive: false,
};

export default Live;
