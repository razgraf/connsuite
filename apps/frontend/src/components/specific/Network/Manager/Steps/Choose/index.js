/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DUMMY } from "../../../../../../constants";
import { NetworkMini } from "../../../../../shared/Network";
import gates, { policy } from "../../../../../../gates";
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
  color: ${props => props.theme.colors.grayBlueDark};
  transition: color 150ms;
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 2) 0;
`;

const Subtitle = styled.p`
  font-size: 11pt;
  font-weight: 400;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueDark};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  min-height: 160px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(${props => props.theme.sizes.edge} * 2);
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
            help={{ value: "HERE" }} // TODO
            id="createNetworkTitle"
            label="Title"
            onUpdate={e => {
              reducer.dispatch({
                type: reducer.actions.UPDATE_TITLE,
                payload: {
                  value: e.target.value,
                  error: null, // TODO gates.interpret(gates.isWebsiteAcceptable, e.target.value),
                },
              });
            }}
            placeholder="MySpace"
            value={reducer.state.title.value}
            warning={reducer.state.title.error}
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
