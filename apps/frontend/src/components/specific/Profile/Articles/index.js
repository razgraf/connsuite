import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import Article from "../../../shared/Article";
import Navigator from "./Navigator";
import Placeholder from "../../../shared/Placeholder";

import { useProfileIntersection } from "../../../../hooks";
import { types } from "../../../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1) 0 calc(${props => props.theme.sizes.edge} * 0);
  background: ${props => props.theme.colors.white};
  transition: border 200ms;
`;

const Top = styled.div`
  width: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  min-height: 300px;
  padding-bottom: 30px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 300px;
  grid-gap: 0;
  overflow: hidden;
  z-index: 100;
  padding-bottom: ${props => props.theme.sizes.edge};
  & > * {
    grid-column: span 1;
    height: 300px;
  }
`;

function Articles({ className, person, controller, onIntersect, onArticleRemoveClick }) {
  const { articles, categories, skills, isSelf, isLoadingArticles, isLoadingProfile } = person;

  const { ref, isObserved } = useProfileIntersection(payload => onIntersect(types.profile.section.articles, payload));

  const chosen = useMemo(() => {
    const filter = controller.get();
    if (_.isNil(filter)) return articles;
    if (filter.isSkill) return articles.filter(article => article.skills.some(skill => _.get(skill, "title") === _.get(filter, "title")));
    if (filter.isCategory)
      return articles.filter(article => article.categories.some(category => _.get(category, "title") === _.get(filter, "title")));
    return [];
  }, [controller, articles]);

  return (
    <Wrapper className={className} ref={ref} id={types.profile.section.articles}>
      <Top>
        <SectionHeader title="Articles" isLoading={isLoadingArticles || isLoadingProfile} isObserved={isObserved} />
      </Top>
      <Navigator categories={categories} skills={skills} controller={controller} />
      <Content>
        <Grid>
          {chosen.map(article => (
            <Article key={article._id} {...article} isSelf={isSelf} onRemoveClick={onArticleRemoveClick} />
          ))}
        </Grid>
        <Placeholder type={t => t.articles} isActive={isLoadingArticles || isLoadingProfile} />
      </Content>
    </Wrapper>
  );
}

Articles.propTypes = {
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  className: PropTypes.string,
  person: PropTypes.shape({
    articles: PropTypes.arrayOf(PropTypes.shape),
    skills: PropTypes.arrayOf(PropTypes.shape),
    categories: PropTypes.arrayOf(PropTypes.shape),
    isSelf: PropTypes.bool,
    isLoadingProfile: PropTypes.bool,
    isLoadingArticles: PropTypes.bool,
  }),
  controller: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func,
  }).isRequired,
  onIntersect: PropTypes.func,
  onArticleRemoveClick: PropTypes.func,
};

Articles.defaultProps = {
  reference: null,
  className: null,
  person: {
    articles: [],
    skills: [],
    categories: [],
    isSelf: false,
    isLoadingProfile: false,
    isLoadingArticles: false,
  },
  onIntersect: () => {},
  onArticleRemoveClick: () => {},
};

export default Articles;
