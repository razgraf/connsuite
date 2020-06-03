import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import Article from "../../../shared/Article";
import Navigator from "./Navigator";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1) 0 calc(${props => props.theme.sizes.edge} * 3);
  background: ${props => props.theme.colors.white};
  transition: border 200ms;
`;

const Top = styled.div`
  width: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(300px, 1fr);
  grid-gap: 0;
  overflow: hidden;
  padding-bottom: ${props => props.theme.sizes.edge};
  & > * {
    grid-column: span 1;
  }
`;

function Articles({ className, isLoading, articles, categories, skills, controller }) {
  return (
    <Wrapper className={className}>
      <Top>
        <SectionHeader title="Articles" isLoading={isLoading} />
      </Top>
      <Navigator categories={categories} skills={skills} controller={controller} />
      <Grid>
        {articles.map(article => (
          <Article key={article._id} {...article} />
        ))}
      </Grid>
    </Wrapper>
  );
}

Articles.propTypes = {
  className: PropTypes.string,
  articles: PropTypes.arrayOf(PropTypes.shape),
  skills: PropTypes.arrayOf(PropTypes.shape),
  categories: PropTypes.arrayOf(PropTypes.shape),
  controller: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func,
  }).isRequired,
  isLoading: PropTypes.bool,
};

Articles.defaultProps = {
  className: null,
  articles: [],
  skills: [],
  categories: [],
  isLoading: false,
};

export default Articles;
