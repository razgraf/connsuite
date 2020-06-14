import _ from "lodash";
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ActionIcon from "@material-ui/icons/MoreVertRounded";

import ProfilePictureFallback from "../../../assets/images/profile_fallback.jpg";
import AssetLogo from "../../../assets/logo/logo.png";

import { parseFullName } from "../../../utils";
import { useCover } from "../../../hooks";
import Placeholder from "../Placeholder";
import { NetworkMini } from "../Network";

const Wrapper = styled.div`
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  height: 240px;
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
  box-shadow: 0 12px 48px -15px rgba(0, 0, 0, 0.2);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 35%;
  max-width: 260px;
  background: ${props => props.theme.gradients.primary};
`;

const LeftImageWrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

const LeftImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  opacity: 1;
  &:not([src]),
  &[src=""] {
    opacity: 0;
  }
`;

const LeftLogoWrapper = styled.div`
  position: absolute;
  z-index: 100;
  right: -1px;
  bottom: -1px;
  height: 36px;
  width: 36px;
  border-radius: 18px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const LeftLogo = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  &:not([src]),
  &[src=""] {
    opacity: 0;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex: 1;
  height: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5);
  background-color: ${props => props.theme.colors.white};
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
  width: 100%;
`;

const Identity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const Name = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 18pt;
  text-align: left;
  font-weight: 600;
  color: ${props => props.theme.colors.grayBlueBlack};
  margin: 0 0 10px 0;
`;

const Username = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 11pt;
  text-align: left;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  margin: 0;
`;

const Action = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: calc(${props => props.theme.sizes.edge});
  margin-bottom: calc(${props => props.theme.sizes.edge});
  background-color: ${props => props.theme.colors.grayBlueLight};
  cursor: pointer;
  transition: background-color 200ms;

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.grayBlueNormal};
    transition: background-color 200ms;
  }

  & > * {
    color: ${props => props.theme.colors.grayBlueDark};
  }

  display: none;
`;

const NetworkGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
`;

const StyledNetworkMini = styled(NetworkMini)`
  padding: 6px;
  & > img {
    border-radius: 2px;
  }
`;

function BusinessCard({ className, data, networks, username }) {
  const { setOpen: setCoverOpen, setNetwork: setCoverNetwork } = useCover();

  const onNetworkClick = useCallback(
    network => {
      setCoverNetwork(network);
      setCoverOpen(true);
    },
    [setCoverNetwork, setCoverOpen],
  );

  const picture = useMemo(() => _.get(data, "thumbnail.url") || ProfilePictureFallback, [data]);

  return (
    <Wrapper className={className}>
      <Card>
        <Left>
          <LeftImageWrapper>
            <LeftImage src={picture} alt="Profile" />
            <LeftLogoWrapper>
              <LeftLogo src={AssetLogo} alt="ConnSuite" />
            </LeftLogoWrapper>
          </LeftImageWrapper>
        </Left>
        <Right>
          <Top>
            <Identity>
              <Name>{parseFullName({ user: data })}</Name>
              <Username>@{username}</Username>
            </Identity>
            <Action>
              <ActionIcon style={{ fontSize: "11pt" }} />
            </Action>
          </Top>
          <NetworkGrid>
            {networks.map(network => (
              <StyledNetworkMini {...network} key={network._id} onClick={() => onNetworkClick(network)} />
            ))}
            <Placeholder type={t => t.networksBusinessCard} isActive={_.isNil(networks) || _.isEmpty(networks)} />
          </NetworkGrid>
        </Right>
      </Card>
    </Wrapper>
  );
}

BusinessCard.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({}),
  networks: PropTypes.arrayOf(PropTypes.shape),
  username: PropTypes.string,
};

BusinessCard.defaultProps = {
  className: null,
  data: {},
  networks: [],
  username: null,
};

export default BusinessCard;
