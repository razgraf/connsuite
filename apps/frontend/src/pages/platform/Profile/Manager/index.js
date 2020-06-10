import _ from "lodash";
import React, { useMemo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useSelector } from "react-redux";
import IconArticlePublish from "@material-ui/icons/PublicRounded";
import { components } from "../../../../themes";
import { pages, types } from "../../../../constants";
import { useHistory, useProfileReducer, useProfileMachine } from "../../../../hooks";
import { parseFullName, getPrimaryUsername } from "../../../../utils";

import { Button, Warning } from "../../../../components/atoms";
import Nav from "../../../../components/shared/Nav";
import { Header } from "../../../../components/specific/Profile/Manager";

const Page = styled.div`
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  background: ${props => props.theme.colors.background};
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
  min-height: calc(100vh - ${props => props.theme.sizes.navHeight});

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

function ProfileManager() {
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const reducer = useProfileReducer();
  const machineProfile = useProfileMachine();
  const username = useMemo(() => getPrimaryUsername(_.get(auth, "user")), [auth]);

  useEffect(() => {
    machineProfile.send(machineProfile.events.request, {
      payload: {
        auth,
        identifier: username,
      },
    });
  }, []); /* componentDidMount */ // eslint-disable-line react-hooks/exhaustive-deps

  const person = useMemo(() => _.get(machineProfile, "current.context.data"), [machineProfile]);
  console.log(person);

  const onCancel = useCallback(() => {
    console.log("Ask for cancel");
  }, []);

  return (
    <Page data-leaving={false}>
      <Playground>
        <StyledNav
          isLight
          appearance={types.nav.appearance.secondary}
          accent={types.nav.accent.white}
          title={pages.profile.edit.title}
          onBackClick={onCancel}
        />
        <Canvas>
          <Header reducer={reducer} />
        </Canvas>
      </Playground>
      <Actions>
        <ButtonBox
          data-success={false}
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
            onClick={() => {}}
            isLoading={false}
            type={t => t.button}
            appearance={t => t.solid}
            accent={t => t.secondary}
          />
        </ButtonBox>

        <Button
          isDisabled={false}
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

ProfileManager.propTypes = {
  query: PropTypes.shape({}),
};

ProfileManager.defaultProps = {
  query: {},
};

export default ProfileManager;
