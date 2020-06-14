import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AssetLogo from "../../../../assets/logo/logo_horiz_white.png";
import { pages } from "../../../../constants";
import { components } from "../../../../themes";
import { Button } from "../../../atoms";

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  height: ${props => props.theme.sizes.navHeight};
  @media ${props => props.theme.medias.small} {
    height: ${props => props.theme.sizes.navHeightMobile};
  }
`;

const LogoWrapper = styled.div`
  height: 40px;
  width: auto;
  margin-right: auto;
`;

const Logo = styled.img`
  object-fit: contain;
  height: 100%;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  font-family: ${props => props.theme.fonts.primary} !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;

  & > * {
    margin-right: calc(${props => props.theme.sizes.edge} * 2);
    &:last-child {
      margin-right: 0;
    }
  }
`;

const ActionItemPartial = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5px;
  cursor: pointer;
`;

const ActionItemContent = styled.p`
  margin-top: 5px;
  margin-bottom: 4px;

  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.sizes.buttonTitleMini};
  font-weight: 700;
  text-transform: uppercase;
`;

const ActionItemLine = styled.div`
  width: 100%;
  height: 1px;
  transform: scale(0, 1);
  background-color: ${props => props.theme.colors.white};
  transition: transform 250ms;
`;

const ActionItem = styled(ActionItemPartial)`
  &:hover,
  &:active {
    & > ${ActionItemLine} {
      transform: scale(1, 1);
      transition: transform 250ms;
    }
  }
`;

const ActionButton = styled(Button)``;

function NavPresentation({ className }) {
  return (
    <Wrapper className={className}>
      <Content>
        <LogoWrapper>
          <Logo alt="" src={AssetLogo} />
        </LogoWrapper>
        <Actions>
          <ActionItem type={t => t.routerDecorator}>
            <ActionItemContent>About</ActionItemContent>
            <ActionItemLine />
          </ActionItem>
          <ActionButton
            to={`${pages.landing.root}#connect`}
            appearance={t => t.outline}
            accent={t => t.whiteToPrimary}
            title="Connect"
            type="router"
            isMini
          />
        </Actions>
      </Content>
    </Wrapper>
  );
}

NavPresentation.propTypes = {
  className: PropTypes.string,
};

NavPresentation.defaultProps = {
  className: null,
};

export default NavPresentation;
