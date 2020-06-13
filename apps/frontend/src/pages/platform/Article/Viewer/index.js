import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import dayjs from "dayjs";
import dayjsFormat from "dayjs/plugin/advancedFormat";

import { components } from "../../../../themes";
import { pages, types } from "../../../../constants";
import * as Head from "../../../../components/specific/Head";
import Nav from "../../../../components/shared/Nav";
import Footer from "../../../../components/shared/Footer";
import { parseFullName, getPrimaryUsername } from "../../../../utils";

import { Header, Content, Author } from "../../../../components/specific/Article/Viewer";

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.colors.white};
  opacity: 1;
`;
const StyledNav = styled(Nav)``;

const Main = styled.div`
  width: 100%;
  position: relative;
`;

dayjs.extend(dayjsFormat);

function ArticleViewer({ article }) {
  console.log(article);

  const user = _.get(article, "user");
  const name = parseFullName({ user });
  const username = getPrimaryUsername(user);

  const cover = _.get(article, "cover.url");
  const content = _.get(article, "content");

  const summary = _.get(article, "summary");
  const title = _.get(article, "title");

  const skills = _.get(article, "skills");
  const categories = _.get(article, "categories");

  const createdAt = _.attempt(() => dayjs(_.get(article, "createdAt")).format("MMMM Do, YYYY - hh:mm"));

  return (
    <Page data-leaving={false}>
      <Head.ArticleViewer name={name} title={title} username={username} createdAt={createdAt} description={summary} />
      <StyledNav appearance={types.nav.appearance.secondary} accent={types.nav.accent.white} title={title} />
      <Main>
        <Header cover={cover} />
        <Content user={user} title={title} createdAt={createdAt} content={content} skills={skills} categories={categories} />
        <Author user={user} />
      </Main>
      <Footer />
    </Page>
  );
}

ArticleViewer.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    shortId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    skills: PropTypes.arrayOf(PropTypes.shape({})),
    categories: PropTypes.arrayOf(PropTypes.shape({})),
    user: PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
      }),
      usernames: PropTypes.arrayOf(PropTypes.shape({})),
      thumbnail: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

ArticleViewer.defaultProps = {};

export default ArticleViewer;
