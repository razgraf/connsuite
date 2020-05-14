import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DUMMY } from "../../../../../../constants";
import { NetworkMini } from "../../../../../shared/Network";
import guards, { policy } from "../../../../../../guards";
import { InputText, InputImage } from "../../../../../atoms";

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
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 2) 0;
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
  opacity: 0.6;
  transition: opacity 150ms;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  &:last-of-type {
    margin-bottom: 0;
  }
  &[data-active="true"] {
    opacity: 1;
    ${Title} {
      color: ${props => props.theme.colors.secondary};
      transition: color 150ms;
    }
  }
`;

const StyledNetworkMini = styled(NetworkMini)`
  height: 50px;
  width: 50px;
  padding: 10px;
`;

function Choose({ className, isActive, reducer }) {
  const [section, setSection] = useState(1);
  const [selected, setSelected] = useState(null);

  return (
    <Wrapper className={className} data-active={isActive}>
      <Section data-active={section === 1} onClick={() => setSection(1)}>
        <Title>a. Choose the network you want to add</Title>
        <Grid>
          {DUMMY.NETWORKS.map(item => (
            <StyledNetworkMini key={item._id} network={item} isFocused={selected === item._id} onClick={() => setSelected(item._id)} />
          ))}
        </Grid>
      </Section>
      <Section data-active={section === 2} onClick={() => setSection(2)}>
        <Title>b. Or create a custom network</Title>
        <Form>
          <InputText
            help={{ value: "Just like 'Facebook' or 'Twitter' you can give a name to your website/new network." }}
            id="createNetworkTitle"
            label="Title"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_TITLE,
                payload: {
                  value: e.target.value,
                  error: null, // TODO guards.interpret(guards.isWebsiteAcceptable, e.target.value),
                },
              });
            }}
            placeholder="MySpace"
            value={reducer.state.title.value}
            warning={reducer.state.title.error}
          />
          <InputImage
            help={{ value: "Provide a logo or an icon to make this stand out." }}
            id="createNetworkIcon"
            label="Network Icon"
            onUpdate={event => {
              let payload = {
                name: null,
                value: null,
                error: "File not accepted",
              };
              try {
                const files = _.get(event, "target.files");
                if (!files) throw new Error();
                const file = _.get(files, [0]);
                if (!file) throw new Error();

                payload = {
                  name: file.name,
                  value: file,
                  error: null, // TODO guards.interpret(guards.isImageAcceptable, e.target.value),
                };
              } catch (e) {
                console.err(e);
              }
              reducer.dispatch({
                type: reducer.actions.UPDATE_ICON,
                payload,
              });
            }}
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
