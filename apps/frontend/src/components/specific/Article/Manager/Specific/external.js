import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import guards, { policy } from "@connsuite/guards";
import IconArticleExternal from "@material-ui/icons/Link";
import { InputText } from "../../../../atoms";

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
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5) calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.grayBlueGhost};
  border-top: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight};
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

function External({ className, reducer }) {
  return (
    <Wrapper className={className}>
      <LabelWrapper>
        <LabelIcon data-purpose="external">
          <IconArticleExternal style={{ fontSize: "16pt" }} />
        </LabelIcon>
        <LabelTitle>Connect external source</LabelTitle>
      </LabelWrapper>
      <Form>
        <InputText
          help={{
            value: `Instead of duplicating content, you could just link this article to your source, be it Behance, Medium, your website, or some other place. ${policy.article.url.root}`,
          }}
          id="manageArticleUrl"
          label="Link to article source"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_URL,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isArticleUrlAcceptable, e.target.value),
              },
            });
          }}
          placeholder="e.g. www.behance.net/john/project"
          value={reducer.state.url.value}
          warning={reducer.state.url.error}
        />
      </Form>
    </Wrapper>
  );
}

External.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
};

External.defaultProps = {
  className: null,
};

export default External;
