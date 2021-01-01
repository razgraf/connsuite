import _ from "lodash";
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconArrow from "@material-ui/icons/ArrowForwardRounded";
import IconShare from "@material-ui/icons/ShareRounded";
import IconEdit from "@material-ui/icons/EditRounded";
import IconDelete from "@material-ui/icons/RemoveCircleOutlineRounded";
import IconClose from "@material-ui/icons/CloseRounded";

import { rgba } from "polished";
import Backdrop from "../Backdrop";
import { getFriendlyTitle } from "../../../utils";
import { pages, modals, root } from "../../../constants";
import { useCover, useHistory, useModal } from "../../../hooks";

const WrapperPartial = styled.div`
  position: fixed;
  z-index: ${props => props.theme.sizes.coverElevation};
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  pointer-events: none;
  overflow: hidden;
  @media ${props => props.theme.medias.small} {
    z-index: calc(${props => props.theme.sizes.navElevation} + 10);
  }
`;

const CoverBackdrop = styled(Backdrop)`
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 200;
  padding-left: calc(${props => props.theme.sizes.edge} * 2);

  @media ${props => props.theme.medias.medium} {
    padding-left: calc(${props => props.theme.sizes.edge} * 1);
  }
`;

const Slide = styled.div`
  pointer-events: all;
  width: 50%;
  height: 100%;
  background: ${props => props.theme.gradients.primary};
  overflow-y: auto;

  @media all and (max-width: ${props => props.theme.sizes.canvasMaxWidth}) {
    width: 100%;
    max-width: calc(${props => props.theme.sizes.canvasMaxWidth} * 1 / 2);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: calc(${props => props.theme.sizes.canvasMaxWidth} * 1 / 2);
  padding-top: calc(${props => props.theme.sizes.navHeight});

  @media ${props => props.theme.medias.small} {
    padding-top: 0;
  }
`;

const Header = styled.div`
  display: none;
  @media ${props => props.theme.medias.small} {
    display: flex;
    align-items: center;
    width: 100%;
    padding: calc(${props => props.theme.sizes.sectionEdgeMobile} * 2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  & > p {
    font-weight: 600;
    color: ${props => props.theme.colors.white};
    margin: 0 0 0 15px;
  }
`;

const CloseArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  transform: rotate(180deg);
  & > svg {
    font-size: 16pt;
    color: ${props => props.theme.colors.white};
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
  @media ${props => props.theme.medias.small} {
    padding: 0 calc(${props => props.theme.sizes.sectionEdgeMobile} * 2);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: calc(${props => props.theme.sizes.edge} * 2) 0;
  @media ${props => props.theme.medias.small} {
    padding-top: calc(${props => props.theme.sizes.sectionEdgeMobile} * 2) 0;
  }
`;

const SectionTitle = styled.p`
  position: relative;
  font-size: 12pt;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 400;
  margin: 0;
  color: ${props => props.theme.colors.white};
  &:after {
    position: absolute;
    bottom: -3px;
    left: 0;
    content: "";
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background: ${props => rgba(props.theme.colors.white, 0.3)};
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 200px;
  border-radius: calc(${props => props.theme.sizes.edge} * 1);
  background: ${props => props.theme.colors.white};
  box-shadow: 0 12px 30px -15px r ${props => rgba(props.theme.colors.dark, 0.3)};
  @media ${props => props.theme.medias.medium} {
    height: 160px;
  }
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2.5);
  min-width: 150px;
  @media ${props => props.theme.medias.medium} {
    padding: 0 calc(${props => props.theme.sizes.edge} * 1.5);
  }
`;

const CardLeftImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  user-select: none;
  opacity: 1;
  transition: opacity 150ms;
  &:not([src]),
  &[src=""] {
    opacity: 0;
    transition: opacity 150ms;
  }
  @media ${props => props.theme.medias.medium} {
    max-width: 70px;
    max-height: 70px;
  }
`;

const CardMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: auto;
  flex: 1;
  border-left: 1px solid ${props => props.theme.colors.grayBlueLight};
  padding-top: ${props => props.theme.sizes.edge};
  padding-bottom: ${props => props.theme.sizes.edge};
  padding-left: calc(${props => props.theme.sizes.edge} * 2);

  @media ${props => props.theme.medias.medium} {
    padding-left: calc(${props => props.theme.sizes.edge} * 1.5);
  }
`;

const CardMainTitle = styled.p`
  min-height: 25px;
  margin: 0 0 10px 0;
  text-align: left;
  font-size: 18pt;
  font-weight: 300;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  overflow: hidden;
  @media ${props => props.theme.medias.medium} {
    font-size: 14pt;
  }
`;

const CardMainUsername = styled.p`
  margin: 0;
  font-size: 11pt;
  font-weight: 300;
  text-align: left;
  min-height: 20px;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueDark};

  &:before {
    content: "@";
    margin-right: 2px;
  }
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
  @media ${props => props.theme.medias.medium} {
    padding: 0 calc(${props => props.theme.sizes.edge} * 1);
  }
`;

const CardRightAction = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.5);
  background: ${props => props.theme.colors.white};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.grayLight};
  box-shadow: 0 3px 5px -2px ${props => rgba(props.theme.colors.dark, 0.08)};
  cursor: pointer;
  transition: background 100ms, border 100ms;

  &:hover,
  &:active {
    background: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    transition: background 100ms, border 100ms;
    & > * {
      color: ${props => props.theme.colors.white};
    }

    &[data-purpose="analytics"] {
      background: ${props => props.theme.colors.orange};
      border: 1px solid ${props => props.theme.colors.orange};
      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }

  &:last-child {
    margin: 0;
  }

  & > * {
    color: ${props => props.theme.colors.secondary};
  }
  &[data-purpose="analytics"] {
    & > * {
      color: ${props => props.theme.colors.orange};
    }
  }
`;

const Description = styled.p`
  font-size: 12pt;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.white};
  font-weight: 300;
  margin: 0;
`;

const Action = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  border-radius: 4px;
  background: ${props => rgba(props.theme.colors.white, 0.1)};
  margin-bottom: 10px;
  cursor: pointer;
  transition: opacity 150ms, background-color 150ms;

  &:hover {
    background: ${props => rgba(props.theme.colors.white, 0.3)};
    transition: opacity 150ms, background-color 150ms;
    &[data-purpose="delete"] {
      background: ${props => rgba(props.theme.colors.red, 1)};
    }
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;

const ActionTitle = styled.p`
  margin: 0;
  font-size: 9pt;
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  span {
    font-weight: 400;
  }
`;

const Wrapper = styled(WrapperPartial)`
  ${Slide} {
    transform: translateX(100%);
    transition: transform 300ms;
    will-change: transform;
  }
  &[data-visible="true"] {
    ${Slide} {
      transform: translateX(0);
      transition: transform 300ms;
      will-change: transform;
    }
  }
`;

function Cover({ isSelf }) {
  const { isOpen, network, setOpen } = useCover();
  const { setOpen: setModalRemoveOpen } = useModal(modals.networkRemove);
  const { setOpen: setShareOpen } = useModal(modals.share);
  const history = useHistory();

  const url = useMemo(
    () => pages.network.view.builder(_.get(network, "shortId") || _.get(network, "_id"), getFriendlyTitle(_.get(network, "title"))),
    [network],
  );

  const onShareClick = useCallback(
    () =>
      setShareOpen(true, {
        url: `${root}${url}`,
        explainer: `Share the ${_.get(network, "title")} link with your audience! Track your impact within the analytics page.`,
      }),
    [url, network, setShareOpen],
  );

  return (
    <Wrapper data-visible={isOpen}>
      <CoverBackdrop isOpen={isOpen} onClick={() => setOpen(false)} />
      <Container>
        <Slide>
          <Content>
            <Header onClick={() => setOpen(false)}>
              <CloseArrow>
                <IconClose />
              </CloseArrow>
              <p>Close cover</p>
            </Header>
            <Section>
              <SectionHeader>
                <SectionTitle>Network Details</SectionTitle>
              </SectionHeader>
              <Card>
                <CardLeft>
                  <CardLeftImage src={_.get(network, "icon.url")} alt="" />
                </CardLeft>
                <CardMain>
                  <CardMainTitle>{_.get(network, "title")}</CardMainTitle>
                  {_.get(network, "username") && <CardMainUsername>{_.get(network, "username")}</CardMainUsername>}
                </CardMain>
                <CardRight>
                  {isSelf && (
                    <Link href={pages.analytics.root}>
                      <CardRightAction
                        data-purpose="analytics"
                        title={pages.analytics.title}
                        onClick={() => {
                          history.push();
                        }}
                      >
                        <pages.analytics.Icon style={{ fontSize: "16pt" }} />
                      </CardRightAction>
                    </Link>
                  )}
                  <CardRightAction
                    title="Visit Network"
                    data-url={_.get(network, "url") || "#"}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconArrow style={{ fontSize: "16pt" }} />
                  </CardRightAction>
                </CardRight>
              </Card>
            </Section>
            <Section>
              <SectionHeader>
                <SectionTitle>Description</SectionTitle>
              </SectionHeader>
              <Description>{_.get(network, "description")}</Description>
            </Section>
            <Section>
              <SectionHeader>
                <SectionTitle>Actions</SectionTitle>
              </SectionHeader>
              <Action as="div" onClick={onShareClick}>
                <ActionIcon>
                  <IconShare style={{ fontSize: "12pt" }} />
                </ActionIcon>
                <ActionTitle>
                  Share Custom Link to <span>{_.get(network, "title")}</span>
                </ActionTitle>
              </Action>
              {isSelf && (
                <>
                  <Link href={pages.network.edit.route} as={pages.network.edit.builder(_.get(network, "_id"))}>
                    <Action onClick={() => history.push()}>
                      <ActionIcon>
                        <IconEdit style={{ fontSize: "12pt" }} />
                      </ActionIcon>
                      <ActionTitle>Edit Network</ActionTitle>
                    </Action>
                  </Link>
                  <Action as="div" data-purpose="delete" onClick={() => setModalRemoveOpen(true)}>
                    <ActionIcon>
                      <IconDelete style={{ fontSize: "12pt" }} />
                    </ActionIcon>
                    <ActionTitle>Remove Network</ActionTitle>
                  </Action>
                </>
              )}
            </Section>
          </Content>
        </Slide>
      </Container>
    </Wrapper>
  );
}

export default Cover;

Cover.propTypes = {
  isSelf: PropTypes.bool,
};

Cover.defaultProps = {
  isSelf: true,
};
