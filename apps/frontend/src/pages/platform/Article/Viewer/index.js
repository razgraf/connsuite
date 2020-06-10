import _ from "lodash";
import React, { useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types } from "../../../../constants";
import { useHistory } from "../../../../hooks";

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.gradients.primary};
  opacity: 1;

  &:after {
    position: absolute;
    z-index: ${props => props.theme.sizes.toastContainerElevation};
    left: 0;
    top: 0;
    content: "";
    width: 100vw;
    height: 100vh;
    background: ${props => rgba(props.theme.colors.dark, 0.25)};
    pointer-events: none;
    opacity: 0;
    transition: opacity 1500ms;
  }

  & > * {
    position: relative;
    z-index: 20;
  }

  &[data-leaving="true"] {
    &:after {
      opacity: 1;
      pointer-events: all;
      transition: opacity 1500ms;
    }
  }
`;
const StyledNav = styled(Nav)`
  position: relative;
  z-index: 200;
`;
const Canvas = styled(components.Canvas)`
  z-index: 100;
`;

function ArticleViewer({ query }) {
  const articleId = _.get(query, "id");
  const auth = useSelector(state => state.auth);
  //   const reducer = useArticleReducer();
  //   const machine = useArticleCreateMachine();
  const history = useHistory();

  return (
    <Page data-leaving={false}>
      <StyledNav appearance={types.nav.appearance.secondary} title={pages.network.create.title} isLight />
      <Canvas>
        <p>View {articleId}</p>
      </Canvas>
    </Page>
  );
}

ArticleViewer.propTypes = {
  query: PropTypes.shape({}),
};

ArticleViewer.defaultProps = {
  query: {},
};

export default ArticleViewer;
