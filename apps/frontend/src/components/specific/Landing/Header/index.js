import React from "react";
import styled from "styled-components";

import AssetLogo from "../../../../assets/logo/icon_logo_white.png";
import AssetProfile from "../../../../assets/images/profile_fallback.jpg";
import AssetWave from "../../../../assets/shape/wave.svg";

import { Button, Emoji } from "../../../atoms";
import { pages } from "../../../../constants";
import { components } from "../../../../themes";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Underlay = styled.div`
  position: absolute;
  z-index: 200;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 250px;
  @media ${props => props.theme.medias.small} {
    height: 100px;
  }
`;

const Wave1 = styled.img.attrs(() => ({
  src: AssetWave,
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transform: scale(-1, 1) translateY(20px);
`;

const Wave2 = styled(Wave1)`
  transform: scale(-1.2, 1) rotate(1deg) translateY(0px);
  opacity: 0.2;
`;

const Wave3 = styled(Wave1)`
  transform: scale(-1.4, 1) rotate(-2deg) translateY(0px);
  opacity: 0.2;
`;

const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 650px;
  width: 100%;
  padding-bottom: calc(150px + ${props => props.theme.sizes.navHeight});
  @media ${props => props.theme.medias.medium} {
    padding-bottom: calc(150px + ${props => props.theme.sizes.navHeightMobile});
    flex-direction: column;
    min-height: 600px;
    height: auto;
    padding-bottom: 150px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-items: center;
  padding: calc(2 * ${props => props.theme.sizes.edge}) 0 calc(1 * ${props => props.theme.sizes.edge});
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: relative;
  padding-top: 20px;
  @media ${props => props.theme.medias.medium} {
    display: none;
  }
`;

const Transparent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 480px;
  height: 280px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background-color 300ms;

  &:first-child {
    /* background-color: rgba(255, 255, 255, 1);
    z-index: 4; */
  }

  &:nth-child(2) {
    transform: rotate(5deg);
    transform-origin: bottom right;
    position: absolute;
    z-index: 2;
  }
  &:nth-child(3) {
    transform: rotate(10deg);
    transform-origin: bottom right;
    position: absolute;
    z-index: 3;
  }

  & > p {
    color: ${props => props.theme.colors.grayBlueDark};
    text-align: center;
    font-family: ${props => props.theme.fonts.primary};
    font-weight: 400;
    font-size: 14pt;
    & > span {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.white};
  font-size: 38pt;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.primary};
  letter-spacing: -1.4px;
  line-height: 1.3;
  max-width: 500px;
  margin-top: 0;
  margin-bottom: calc(2 * ${props => props.theme.sizes.edge});

  @media ${props => props.theme.medias.medium} {
    font-size: 36pt;
    text-align: center;
    width: 100%;
    max-width: 100%;
  }
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.white};
  font-size: 15pt;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  margin: 0;
  @media ${props => props.theme.medias.medium} {
    font-size: 12pt;
    width: 100%;
    text-align: center;
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  max-width: 400px;
  margin-top: calc(3 * ${props => props.theme.sizes.edge});
  @media ${props => props.theme.medias.medium} {
    grid-template-columns: 1fr;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    & > * {
      padding-top: 17px;
      padding-bottom: 17px;
    }
  }
`;

const Badge = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-start;
  height: 68px;
  min-width: 160px;
  border-radius: 50px;
  padding: 6px;
  background: ${props => props.theme.gradients.primary};
`;

const BadgeImage = styled.img`
  height: calc(68px - 2 * 6px);
  width: calc(68px - 2 * 6px);
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 8px;
`;
const BadgeContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-right: 24px;
`;

const BadgeTitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 400;
  color: ${props => props.theme.colors.white};
  font-size: 8.5pt;
  margin: 0 0 8px 0;
`;

const BadgeCredentials = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BadgeCredentialsIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 4px;
  object-fit: contain;
`;

const BadgeCredentialsText = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  font-size: 11pt;
  margin: 0 0 1px 0;
  & > span {
    font-weight: 600;
    font-size: 10pt;
    margin-right: 3px;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Underlay>
        <Wave1 />
        <Wave2 />
        <Wave3 />
      </Underlay>
      <Canvas>
        <Left>
          <Title>Create the ultimate online business card</Title>
          <Subtitle>Link to all your public networks, accounts & stories</Subtitle>
          <Actions>
            <Button
              type={t => t.router}
              to={`${pages.landing.root}#connect`}
              title={
                <>
                  <Emoji label="!" symbol="⭐️" /> Let&apos;s do it!
                </>
              }
              appearance={t => t.solid}
              accent={t => t.dark}
            />
            <Button
              type={t => t.router}
              to={`${pages.landing.root}#learn`}
              title="Learn more"
              appearance={t => t.outline}
              accent={t => t.white}
            />
          </Actions>
        </Left>
        <Right>
          <Transparent>
            <Badge>
              <BadgeImage src={AssetProfile} alt="" />
              <BadgeContent>
                <BadgeTitle>Find me on ConnSuite</BadgeTitle>
                <BadgeCredentials>
                  <BadgeCredentialsIcon src={AssetLogo} alt="" />
                  <BadgeCredentialsText>
                    <span>/</span>username
                  </BadgeCredentialsText>
                </BadgeCredentials>
              </BadgeContent>
            </Badge>
          </Transparent>
          <Transparent />
          <Transparent />
        </Right>
      </Canvas>
    </Wrapper>
  );
}

export default Header;
