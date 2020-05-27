import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types } from "../../../../constants";
import { useHistory, useArticleReducer } from "../../../../hooks";
import { Picker, Header, Info, Specific } from "../../../../components/specific/Article/Manager";

const Page = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.colors.white};
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

  &[data-leaving="true"] {
    &:after {
      opacity: 1;
      pointer-events: all;
      transition: opacity 1500ms;
    }
  }
`;

const Playground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const StyledNav = styled(Nav)`
  position: relative !important;
  z-index: 200 !important;
  order: 0 !important;
`;
const Canvas = styled(components.Canvas)`
  z-index: 100;
  min-height: calc(100vh - ${props => props.theme.sizes.navHeight});
  border-left: 1px solid ${props => props.theme.colors.grayLight};
  border-right: 1px solid ${props => props.theme.colors.grayLight};
  box-shadow: 0 100px 15px 0 ${props => rgba(props.theme.colors.dark, 0.05)};
  padding: 0;
`;

function ArticleManager() {
  const auth = useSelector(state => state.auth);
  const reducer = useArticleReducer();
  //   const machine = useArticleCreateMachine();
  const history = useHistory();

  //   useEffect(() => console.log(machine.current.value), [machine]);

  const [type, setType] = useState("external");

  return (
    <Page data-leaving={false}>
      <Picker isActive={type === null} onPick={setType} />
      <Playground>
        <StyledNav
          appearance={types.nav.appearance.secondary}
          accent={types.nav.accent.white}
          title={pages.article.create.title}
          hasParent
          isLight
        />
        <Canvas>
          <Header reducer={reducer} />
          <Info reducer={reducer} />
          <Specific reducer={reducer} />
        </Canvas>
      </Playground>
    </Page>
  );
}

ArticleManager.propTypes = {
  query: PropTypes.shape({}),
};

ArticleManager.defaultProps = {
  query: {},
};

export default ArticleManager;
