import React from "react";
import styled from "styled-components";

import AssetWave from "../../../../assets/shape/wave.svg";

import { Button, Emoji } from "../../../atoms";
import { pages } from "../../../../constants";
import { components } from "../../../../themes";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 200;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 250px;
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
  @media ${props => props.theme.medias.mobile} {
    padding-bottom: calc(150px + ${props => props.theme.sizes.navHeightMobile});
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
  align-items: flex-start;
  justify-items: center;
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
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.white};
  font-size: 15pt;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  margin: 0;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
  max-width: 400px;
  margin-top: calc(3 * ${props => props.theme.sizes.edge});
`;

function Header() {
  return (
    <Wrapper>
      <Overlay>
        <Wave1 />
        <Wave2 />
        <Wave3 />
      </Overlay>
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
        <Right />
      </Canvas>
    </Wrapper>
  );
}

export default Header;
