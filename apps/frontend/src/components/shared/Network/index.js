import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconVisit from "@material-ui/icons/InsertLinkRounded";
import { rgba } from "polished";
import { pages, redux } from "../../../constants";
import { ellipsis } from "../../../utils";
import { Button } from "../../atoms";
import { useCover, useHistory } from "../../../hooks";

const WrapperPartial = styled.div`
  grid-column: span 1;
`;

const Card = styled.div`
  z-index: 1;
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const Content = styled.div`
  position: absolute;
  z-index: 100;

  display: flex;
  flex-direction: column;

  width: calc(100% - 2 * 1px);
  height: calc(100% - 2 * 1px);
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayLight};
  border-radius: ${props => props.theme.sizes.networkEdge};
  box-shadow: 0 0 15px 0 ${props => rgba(props.theme.colors.dark, 0.05)};
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: ${props => props.theme.sizes.networkEdge} ${props => props.theme.sizes.networkEdge} 5px 5px;
`;

const ContentHeaderIndicator = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.primary};
`;

const ContentMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;

const ContentImage = styled.img`
  height: 100%;
  width: 100%;
  max-width: ${props => props.theme.sizes.networkIconMaxSize};
  max-height: ${props => props.theme.sizes.networkIconMaxSize};
  object-fit: contain;
  user-select: none;
  filter: blur(0);
  &:not([src]),
  &[src=""] {
    visibility: hidden;
  }
`;

const ContentFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0 calc(${props => props.theme.sizes.networkEdge} * 1) 0;
`;

const ContentFooterDetails = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.grayBlueMedium};
  font-size: 10pt;
  font-weight: 600;
  margin: 0;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.sizes.networkEdge};
  background-color: ${props => rgba(props.theme.colors.dark, 0.8)};
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms;
`;

const OverlayActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  width: 100%;
  height: 100%;
  padding: calc(${props => props.theme.sizes.networkEdge} * 3 / 4);
`;

const OverlayActionVisit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.networkEdge} * 3 / 4);
`;

const OverlayActionVisitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.white};
  margin-right: 10px;
  transition: background-color 200ms;

  & > * {
    color: ${props => props.theme.colors.secondary};
    line-height: 0 !important;
    transform: rotate(-15deg);
    transition: color 200ms;
  }

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.secondary};
    transition: background-color 200ms;
    & > * {
      color: ${props => props.theme.colors.white};
      transition: color 200ms;
    }
  }
`;

const OverlayActionVisitTitle = styled.p`
  font-size: 10pt;
  color: ${props => props.theme.colors.white};
  margin: 0;
  font-weight: 600;
`;

const OverlayActionDetails = styled(Button)``;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding-top: calc(${props => props.theme.sizes.networkEdge} * 3 / 4);
  & > * {
    max-width: 160px;
  }
`;

const Title = styled.p`
  min-height: 25px;
  margin: 0 0 2px 0;
  text-align: center;
  font-size: 13pt;
  font-weight: 300;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  white-space: nowrap;
  overflow: hidden;

  &:empty {
    border-radius: 4px;
    background: ${props => props.theme.colors.grayBlueLight};
    height: 25px;
    width: 100px;
  }
`;

const Username = styled.p`
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

  &:empty {
    border-radius: 4px;
    background: ${props => props.theme.colors.grayBlueLight};
    height: 20px;
    width: 160px;
  }
`;

const Shape = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 1px;
    background: ${props => props.theme.colors.grayBlueNormal};
    position: absolute;
    z-index: 1;

    &:first-child {
      height: 100%;
      width: 1px;
      background: ${props => props.theme.colors.grayBlueNormal};
      position: absolute;
    }
  }
`;

const AddTitle = styled.p`
  margin: 0;
  font-size: 10pt;
  font-weight: 600;
  text-align: center;
  min-height: 20px;
  margin-top: 10px;
  color: ${props => props.theme.colors.grayBlueDark};
`;

const Wrapper = styled(WrapperPartial)`
  &[data-viewonly="false"] {
    ${Card} {
      &:hover,
      &:active,
      &[data-focuses="true"] {
        ${Overlay} {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 200ms;
        }

        ${ContentImage} {
          filter: blur(5px);
          transition: filter 150ms;
        }
      }
    }
  }

  &[data-style="add"] {
    opacity: 0.6;
    transition: opacity 200ms;
    cursor: pointer;
    ${Content} {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px;
      box-shadow: none;
      border: 1px solid ${props => props.theme.colors.grayBlueNormal};
    }
    &:hover,
    &:active {
      opacity: 1;
      transition: opacity 200ms;
    }
  }
`;

function Network({ className, isViewOnly, isFocused, ...network }) {
  const { setOpen: setCoverOpen, setNetwork: setCoverNetwork } = useCover();
  const { _id, title, username, icon } = network;

  const doPick = useCallback(() => {
    if (!isViewOnly) {
      setCoverNetwork(network);
      setCoverOpen(true);
    }
  }, [network, isViewOnly]);

  return (
    <Wrapper className={className} data-viewonly={isViewOnly} data-focused={isFocused} onClick={doPick}>
      <Card>
        {!isViewOnly && (
          <Overlay>
            <OverlayActions>
              <OverlayActionVisit>
                <OverlayActionVisitIcon>
                  <IconVisit style={{ fontSize: "14pt" }} />
                </OverlayActionVisitIcon>
                <OverlayActionVisitTitle>Visit network</OverlayActionVisitTitle>
              </OverlayActionVisit>
              <OverlayActionDetails
                isFullWidth
                accent={t => t.secondary}
                appearance={t => t.solid}
                title="Get Details"
                type={t => t.button}
              />
            </OverlayActions>
          </Overlay>
        )}
        <Content>
          <ContentHeader>
            <ContentHeaderIndicator />
          </ContentHeader>
          <ContentMain>
            <ContentImage src={_.get(icon, "source")} />
          </ContentMain>
          <ContentFooter>
            <ContentFooterDetails>Get Details</ContentFooterDetails>
          </ContentFooter>
        </Content>
      </Card>
      <Info>
        <Title>{ellipsis(title, 19)}</Title>
        <Username>{ellipsis(username, 30)}</Username>
      </Info>
    </Wrapper>
  );
}

function NetworkAdd() {
  const { push } = useHistory();

  return (
    <Link href={pages.network.create.root}>
      <Wrapper data-style="add" onClick={push}>
        <Card>
          <Content>
            <Shape>
              <div />
              <div />
            </Shape>
          </Content>
        </Card>
        <Info>
          <AddTitle>Add Network</AddTitle>
        </Info>
      </Wrapper>
    </Link>
  );
}

function NetworkMini() {
  return <div>Mini</div>;
}

Network.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string,
  username: PropTypes.string,
  isViewOnly: PropTypes.bool,
  isFocused: PropTypes.bool,
};

Network.defaultProps = {
  title: "",
  username: "",
  className: null,
  isViewOnly: false,
  isFocused: false,
};

export default Network;
export { NetworkAdd, NetworkMini };
