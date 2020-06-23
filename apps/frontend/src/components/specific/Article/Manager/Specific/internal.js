import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import guards from "@razgraf/connsuite-guards";
import IconArticleInternal from "@material-ui/icons/DescriptionRounded";
import { InputEditor } from "../../../../atoms";

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.white};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${props => props.theme.sizes.edge};
  padding: calc(${props => props.theme.sizes.edge} * 2);
  & > * {
    grid-column: span 1;
    &:first-child {
      grid-column: span 2;
    }
  }
  @media ${props => props.theme.medias.small} {
    padding: calc(${props => props.theme.sizes.canvasEdgeMobile});
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5) calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight};
  @media ${props => props.theme.medias.small} {
    padding-left: calc(${props => props.theme.sizes.canvasEdgeMobile});
    padding-right: calc(${props => props.theme.sizes.canvasEdgeMobile});
  }
`;

const LabelIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${props => props.theme.sizes.edge};
  & > * {
    color: ${props => props.theme.colors.secondary};
  }
  &[data-purpose="external"] {
    transform: rotate(-15deg) translateY(1px);
  }
`;

const LabelTitle = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 12pt;
  color: ${props => props.theme.colors.secondary};
`;

function Internal({ className, reducer, setContentInstance }) {
  return (
    <Wrapper className={className}>
      <LabelWrapper>
        <LabelIcon>
          <IconArticleInternal style={{ fontSize: "16pt" }} />
        </LabelIcon>
        <LabelTitle>Write from scratch</LabelTitle>
      </LabelWrapper>
      <Form>
        <InputEditor
          help={{
            value:
              "Add text, images, quotes and more. Tip: if grammarly or any other plug-in is interfering, please disable it while editing content format.",
          }}
          id="manageArticleUrl"
          setInstance={setContentInstance}
          label="Content"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_CONTENT,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isArticleContentAcceptable, e.target.value),
              },
            });
          }}
          placeholder="Start writing here"
          value={reducer.state.content.value}
          warning={reducer.state.content.error}
        />
      </Form>
    </Wrapper>
  );
}

Internal.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
  setContentInstance: PropTypes.func.isRequired,
};

Internal.defaultProps = {
  className: null,
};

export default Internal;
