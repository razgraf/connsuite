import _ from "lodash";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconArrow from "@material-ui/icons/ArrowForwardRounded";
import IconShare from "@material-ui/icons/ShareRounded";
import IconEdit from "@material-ui/icons/EditRounded";
import IconDelete from "@material-ui/icons/RemoveCircleOutlineRounded";
import { rgba } from "polished";

import Backdrop from "../Backdrop";
import { pages, DUMMY } from "../../../constants";
import { useCover } from "../../../hooks";

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
`;

const Slide = styled.div`
  pointer-events: all;
  width: 50%;
  height: 100%;
  background: ${props => props.theme.gradients.primary};
  overflow-y: auto;

  @media all and (max-width: ${props => props.theme.sizes.canvasMaxWidth}) {
    display: flex !important;
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
`;

const Header = styled.div`
  display: none;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const SectionHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: calc(${props => props.theme.sizes.edge} * 2) 0;
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
  border-radius: calc(${props => props.theme.sizes.edge} * 1.5);
  background: ${props => props.theme.colors.white};
  box-shadow: 0 12px 30px -15px r ${props => rgba(props.theme.colors.dark, 0.3)};
`;

const CardLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const CardLeftImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 110px;
  max-height: 110px;
  object-fit: contain;
  user-select: none;
  opacity: 1;
  transition: opacity 150ms;
  &:not([src]),
  &[src=""] {
    opacity: 0;
    transition: opacity 150ms;
  }
`;

const CardMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  flex: 1;
`;

const CardMainTitle = styled.p`
  min-height: 25px;
  margin: 0 0 10px 0;
  text-align: center;
  font-size: 18pt;
  font-weight: 300;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  white-space: nowrap;
  overflow: hidden;
`;

const CardMainUsername = styled.p`
  margin: 0;
  font-size: 11pt;
  font-weight: 300;
  text-align: center;
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
`;

const CardRightAction = styled.div`
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
  box-shadow: 0 3px 15px -2px ${props => rgba(props.theme.colors.dark, 0.1)};
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:last-child {
    margin: 0;
  }

  & > * {
    color: ${props => props.theme.colors.secondary};
  }
  &[data-purpose="statistics"] {
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
  margin-bottom: ${props => props.theme.sizes.edge};
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
  font-size: 10pt;
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

function Cover() {
  const { isOpen, network, setOpen } = useCover();

  return (
    <Wrapper data-visible={isOpen}>
      <CoverBackdrop isOpen={isOpen} onClick={() => setOpen(false)} />
      <Container>
        <Slide>
          <Content>
            <Header />
            <Section>
              <SectionHeader>
                <SectionTitle>Network Details</SectionTitle>
              </SectionHeader>
              <Card>
                <CardLeft>
                  <CardLeftImage src={_.get(network, "icon.source")} alt="" />
                </CardLeft>
                <CardMain>
                  <CardMainTitle>{_.get(network, "title")}</CardMainTitle>
                  <CardMainUsername>{_.get(network, "username")}</CardMainUsername>
                </CardMain>
                <CardRight>
                  <Link href={pages.statistics.root}>
                    <CardRightAction data-purpose="statistics" title={pages.statistics.title}>
                      <pages.statistics.Icon style={{ fontSize: "16pt" }} />
                    </CardRightAction>
                  </Link>
                  <Link href={_.get(network, "url") || "#"}>
                    <CardRightAction title="Visit Network">
                      <IconArrow style={{ fontSize: "16pt" }} />
                    </CardRightAction>
                  </Link>
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
              <Action as="div">
                <ActionIcon>
                  <IconShare style={{ fontSize: "12pt" }} />
                </ActionIcon>
                <ActionTitle>
                  Share: <span>connsuite.com/razgraf/facebook</span>
                </ActionTitle>
              </Action>
              <Link href={pages.network.edit.builder(_.get(network, "_id"))}>
                <Action as="div">
                  <ActionIcon>
                    <IconEdit style={{ fontSize: "12pt" }} />
                  </ActionIcon>
                  <ActionTitle>Edit Network</ActionTitle>
                </Action>
              </Link>
              <Action as="div" data-purpose="delete">
                <ActionIcon>
                  <IconDelete style={{ fontSize: "12pt" }} />
                </ActionIcon>
                <ActionTitle>Remove Network</ActionTitle>
              </Action>
            </Section>
          </Content>
        </Slide>
      </Container>
    </Wrapper>
  );
}

Cover.propTypes = {
  network: PropTypes.shape({}),
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

Cover.defaultProps = {
  network: DUMMY.NETWORKS[0],
  isVisible: false,
  setIsVisible: () => {},
};

export default Cover;
