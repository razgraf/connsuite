import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import guards, { policy } from "@connsuite/guards";
import { InputText, InputTags } from "../../../../atoms";

const Wrapper = styled.div`
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  background: ${props => props.theme.colors.white};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${props => props.theme.sizes.edge};
  & > * {
    grid-column: span 1;
    &:first-child {
      grid-column: span 2;
    }
  }
`;

function Info({ className, reducer }) {
  return (
    <Wrapper className={className}>
      <Form>
        <InputText
          help={{
            value: `Give your article/portfolio piece a title. ${policy.article.title.root}`,
          }}
          id="manageArticleTitle"
          label="Title"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_TITLE,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isArticleTitleAcceptable, e.target.value),
              },
            });
          }}
          placeholder="e.g. My awesome article"
          value={reducer.state.title.value}
          warning={reducer.state.title.error}
        />
        <InputTags
          help={{
            value: `In order to advertise your work better, you could add some skills, products or techniques that you used or helped with this article/project. ${policy.article.skills.root}`,
          }}
          id="manageArticleSkills"
          label="Skills and Tools"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_SKILLS,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isArticleSkillListAcceptable, e.target.value),
              },
            });
          }}
          placeholder="e.g. Figma, React"
          value={reducer.state.skills.value}
          warning={reducer.state.skills.error}
          source={[
            {
              _id: "A1",
              title: "A1",
            },
            {
              _id: "B1",
              title: "B1",
            },
          ]}
        />

        <InputTags
          help={{
            value: `To make your portfolio of articles more organized, you can assign high-level categories to this element. ${policy.article.categories.root}`,
          }}
          id="manageArticleCategories"
          label="Categories"
          onUpdate={e => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_CATEGORIES,
              payload: {
                value: e.target.value,
                error: guards.interpret(guards.isArticleCategoryListAcceptable, e.target.value),
              },
            });
          }}
          placeholder="e.g. Design, Marketing"
          value={reducer.state.skills.value}
          warning={reducer.state.skills.error}
          source={[
            {
              _id: "A1",
              title: "A1",
            },
            {
              _id: "B1",
              title: "B1",
            },
          ]}
        />
      </Form>
    </Wrapper>
  );
}

Info.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
};

Info.defaultProps = {
  className: null,
};

export default Info;
