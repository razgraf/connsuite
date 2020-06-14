import _ from "lodash";
import React, { useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconArticlePublish from "@material-ui/icons/FaceRounded";
import { components } from "../../../../themes";
import { modals, pages, types } from "../../../../constants";
import { useProfileReducer, useProfileEditMachine, useHistory, useModal } from "../../../../hooks";
import { blur, getPrimaryUsername } from "../../../../utils";

import { Button, Spinner, Warning } from "../../../../components/atoms";
import Nav from "../../../../components/shared/Nav";
import { Header } from "../../../../components/specific/Profile/Manager";
import { ModalProfileLeave } from "../../../../components/specific/Modals/Profile";

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
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-top: none;
  margin-bottom: calc(calc(${props => props.theme.sizes.edge}) * 2.5);
  padding-bottom: calc(calc(${props => props.theme.sizes.edge}) * 2.5);
  @media ${props => props.theme.medias.medium} {
    padding-left: calc(${props => props.theme.sizes.canvasEdgeMobile});
    padding-right: calc(${props => props.theme.sizes.canvasEdgeMobile});
  }

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

const BottomWarning = styled(Warning)`
  margin: 0 auto;
  & > p {
    font-size: 10pt;
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

function ProfileManager() {
  const auth = useSelector(state => state.auth);
  const reducer = useProfileReducer();
  const history = useHistory();
  const username = useMemo(() => getPrimaryUsername(_.get(auth, "user")), [auth]);
  const machine = useProfileEditMachine({ identifier: username, reducer });
  const modalLeave = useModal(modals.profileLeave);

  useEffect(() => {
    console.log(machine);
  }, [machine]); /* componentDidMount */ // eslint-disable-line react-hooks/exhaustive-deps

  const person = useMemo(() => _.get(machine, "current.context.data"), [machine]);

  const onCancel = useCallback(() => {
    modalLeave.setOpen(true);
  }, [modalLeave]);

  const onPublish = useCallback(() => {
    const profile = {
      firstName: reducer.state.firstName.value,
      lastName: reducer.state.lastName.value,
      description: reducer.state.description.value,
      tagline: reducer.state.tagline.value,
      picture: reducer.state.picture.value,
    };

    machine.send(machine.events.forward, {
      payload: { auth, profile },
      PICTURE_REQUIRED: _.isNil(_.get(machine, "current.context.data.user.picture.url")),
    });
  }, [auth, machine, reducer]);

  return (
    <Page data-leaving={machine.current.value === machine.states.success}>
      <Head.ProfileEdit />
      <Playground>
        <StyledNav
          isLight
          appearance={types.nav.appearance.secondary}
          accent={types.nav.accent.white}
          title={pages.profile.edit.title}
          onBackClick={onCancel}
        />
        <Canvas>
          <Loader data-active={machine.current.value === machine.states.retrieve}>
            <Spinner color={c => c.secondary} size={50} thickness={2} />
          </Loader>
          <Header reducer={reducer} person={person} />
        </Canvas>
      </Playground>

      <BottomWarning isCentered value={machine.current.context.error} />

      <Actions>
        <ButtonBox data-success={machine.current.value === machine.states.success} onMouseEnter={blur}>
          <StyledButton
            title="Update Profile"
            childrenLeft={
              <ButtonIconWrapper>
                <IconArticlePublish style={{ fontSize: "14pt" }} />
              </ButtonIconWrapper>
            }
            onClick={onPublish}
            isLoading={[machine.states.apply].includes(machine.current.value)}
            isDisabledSoft={[machine.states.apply, machine.states.retrieve].includes(machine.current.value)}
            type={t => t.button}
            appearance={t => t.solid}
            accent={t => t.secondary}
          />
        </ButtonBox>

        <Button
          isDisabled={machine.current.value === machine.states.apply}
          type={t => t.button}
          appearance={t => t.outline}
          accent={t => t.cancel}
          title="Cancel"
          onClick={onCancel}
        />
      </Actions>
      <ModalProfileLeave onSuccess={() => history.back()} />
    </Page>
  );
}

ProfileManager.propTypes = {
  query: PropTypes.shape({}),
};

ProfileManager.defaultProps = {
  query: {},
};

export default ProfileManager;
