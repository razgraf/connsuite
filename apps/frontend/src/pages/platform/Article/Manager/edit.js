import _ from "lodash";
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconArticlePublish from "@material-ui/icons/PublicRounded";
import { Button, Warning, Spinner } from "../../../../components/atoms";
import { components } from "../../../../themes";
import Nav from "../../../../components/shared/Nav";
import { pages, types, modals } from "../../../../constants";
import { useHistory, useArticleReducer, useArticleEditMachine, useModal } from "../../../../hooks";
import { Header, Info, Specific } from "../../../../components/specific/Article/Manager";
import { ModalArticleLeave } from "../../../../components/specific/Modals";
import { getValueOfInputEditorSync } from "../../../../components/atoms/Input/uncontrolled";
import { blur } from "../../../../utils";
import * as Head from "../../../../components/specific/Head";

const Page = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  background: ${props => props.theme.colors.background};
  opacity: 1;
  min-height: 100vh;

  &:after {
    position: fixed;
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
    overflow: hidden;
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
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight} !important;
`;
const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: 100;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-top: none;
  padding: 0;
  margin-bottom: calc(calc(${props => props.theme.sizes.edge}) * 2.5);

  & > * {
    z-index: 10;
  }

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

const Loader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  background-color: ${props => props.theme.colors.white};
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
  }
`;

const BottomWarning = styled(Warning)`
  margin: 0 auto;
  & > p {
    font-size: 10pt;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: calc(${props => props.theme.sizes.edge} * 2) 0 150px;
  & > * {
    margin-right: ${props => props.theme.sizes.edge};
    &:last-child {
      margin-right: 0;
    }
  }
  @media ${props => props.theme.medias.medium} {
    flex-direction: column;
    & > * {
      margin-bottom: ${props => props.theme.sizes.edge};
      margin-right: 0;
      &:last-child {
        margin-bottom: 0;
      }
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
  @media ${props => props.theme.medias.medium} {
    width: 20px;
    & > * {
      left: -3px;
    }
  }
`;

const StyledWarning = styled(Warning)`
  & > p {
    font-size: 11pt;
  }
`;

const Explainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.white};
  opacity: 0;
  pointer-events: none;
  &[data-active="true"] {
    opacity: 1;
    pointer-events: all;
  }
`;

function ArticleManager({ query }) {
  const articleId = _.get(query, "id");
  const auth = useSelector(state => state.auth);
  const reducer = useArticleReducer();
  const machine = useArticleEditMachine({ articleId, reducer });
  const history = useHistory();
  const modalLeave = useModal(modals.articleLeave);
  const [contentInstance, setContentInstance] = useState(null);

  const onPublish = useCallback(() => {
    const article = {};
    Object.keys(reducer.state).forEach(key => {
      article[key] = reducer.state[key].value;
    });

    if (article.type === types.article.type.external) {
      machine.send(machine.events.forward, { payload: { auth, article, articleId } });
    } else {
      getValueOfInputEditorSync(contentInstance, content => {
        article.content = content;
        machine.send(machine.events.forward, { payload: { auth, article, articleId } });
      });
    }
  }, [auth, machine, reducer, articleId, contentInstance]);

  const onCancel = useCallback(() => {
    if ([machine.states.forbidden].includes(machine.current.value)) history.back();
    else modalLeave.setOpen(true);
  }, [modalLeave, machine, history]);

  return (
    <Page data-leaving={machine.current.value === machine.states.success}>
      <Head.ArticleEdit title={_.get(reducer, "state.title.value") || "Article"} />
      <Playground>
        <StyledNav
          isLight
          appearance={types.nav.appearance.secondary}
          accent={types.nav.accent.white}
          title={pages.article.edit.title}
          onBackClick={onCancel}
        />
        <Canvas>
          <Loader data-active={machine.current.value === machine.states.retrieve}>
            <Spinner color={c => c.secondary} size={50} thickness={2} />
          </Loader>
          <Explainer data-active={machine.current.value === machine.states.forbidden}>
            <StyledWarning isCentered value={machine.current.context.error} />
          </Explainer>
          <Header reducer={reducer} />
          <Info reducer={reducer} />
          <Specific reducer={reducer} setContentInstance={setContentInstance} />
        </Canvas>
      </Playground>
      <BottomWarning isCentered value={machine.current.context.error} />
      <Actions>
        <ButtonBox data-success={machine.current.value === machine.states.success} onMouseEnter={blur}>
          <StyledButton
            title="Publish Article"
            childrenLeft={
              <ButtonIconWrapper>
                <IconArticlePublish style={{ fontSize: "14pt" }} />
              </ButtonIconWrapper>
            }
            onClick={onPublish}
            isLoading={[machine.states.apply].includes(machine.current.value)}
            isDisabled={[machine.states.forbidden].includes(machine.current.value)}
            isDisabledSoft={[machine.states.apply, machine.states.retrieve].includes(machine.current.value)}
            type={t => t.button}
            appearance={t => t.solid}
            accent={t => t.secondary}
          />
        </ButtonBox>

        <Button
          isDisabled={[machine.states.apply, machine.states.forbidden].includes(machine.current.value)}
          type={t => t.button}
          appearance={t => t.outline}
          accent={t => t.cancel}
          title="Cancel"
          onClick={onCancel}
        />
      </Actions>
      <ModalArticleLeave onSuccess={() => history.back()} />
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
