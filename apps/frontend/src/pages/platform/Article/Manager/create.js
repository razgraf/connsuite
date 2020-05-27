import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconArticlePublish from "@material-ui/icons/PublicRounded";
import { Button } from "../../../../components/atoms";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types } from "../../../../constants";
import { useHistory, useArticleReducer } from "../../../../hooks";
import { Picker, Header, Info, Specific } from "../../../../components/specific/Article/Manager";

const Page = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
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
  position: relative;
  z-index: 100;
  min-height: calc(100vh - ${props => props.theme.sizes.navHeight});
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-top: none;
  padding: 0;
  margin-bottom: calc(${props => props.theme.sizes.edge});

  &:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    left: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px ${props => rgba(props.theme.colors.grayBlueDark, 0.2)};
  }
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px ${props => rgba(props.theme.colors.grayBlueDark, 0.2)};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: calc(${props => props.theme.sizes.edge} * 3) 0 150px;
  & > * {
    margin-right: ${props => props.theme.sizes.edge};
    &:last-child {
      margin-right: 0;
    }
  }
`;

const StyledButton = styled(Button)`
  flex-shrink: 0;
  &[data-loading="true"] {
    background: ${props => props.theme.gradients.gold};
  }
`;

const ButtonBox = styled.div`
  flex-shrink: 0;
  &[data-success="true"] {
    & > ${StyledButton} {
      background: ${props => props.theme.gradients.green};
    }
  }
`;

const ButtonIconWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  & > * {
    left: -10px;
    position: absolute;
    color: ${props => props.theme.colors.white};
  }
`;

function ArticleManager() {
  const auth = useSelector(state => state.auth);
  const reducer = useArticleReducer();
  //   const machine = useArticleCreateMachine();
  const history = useHistory();

  //   useEffect(() => console.log(machine.current.value), [machine]);

  const [type, setType] = useState("external");

  const onCancel = useCallback(() => {
    // check reducer
    // confirm modal
  }, []);

  const onPublish = useCallback(() => {}, []);

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
      <Actions>
        <ButtonBox
          // data-success={machine.current.value === machine.states.success}
          onMouseEnter={() => {
            try {
              const list = document.getElementsByTagName("input");
              Array.prototype.forEach.call(list, item => item.blur());
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <StyledButton
            title="Publish Article"
            childrenLeft={
              <ButtonIconWrapper>
                <IconArticlePublish style={{ fontSize: "14pt" }} />
              </ButtonIconWrapper>
            }
            onClick={onPublish}
            // isLoading={machine.current.value === machine.states.create}
            type={t => t.button}
            appearance={t => t.solid}
            accent={t => t.secondary}
            // isDisabledSoft={!isForwardEnabled}
          />
        </ButtonBox>

        <Button
          isDisabled={false} // machine.current.value === machine.states.apply
          type={t => t.button}
          appearance={t => t.outline}
          accent={t => t.cancel}
          title="Cancel"
          onClick={onCancel}
        />
      </Actions>
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
