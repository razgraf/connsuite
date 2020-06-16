import _ from "lodash";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { rgba } from "polished";
import IconFlashOn from "@material-ui/icons/FlashOnRounded";
import IconHowToReg from "@material-ui/icons/HowToRegRounded";
import { components } from "../../../../themes";
import Title from "../Title";
import Login from "./Login";
import Register from "./Register";

const Wrapper = styled.section`
  width: 100%;
  background: ${props => props.theme.gradients.primary};
`;

const Canvas = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;

  @media all and (min-height: 900px) {
    min-height: 900px;
  }
`;

const CanvasContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 4) 0;
`;

const Card = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  max-width: 800px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.white};
  @media ${props => props.theme.medias.small} {
    height: auto;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  z-index: 500;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 0);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight};
`;
const CardHeaderFacePartial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  /* border-radius: 6px 6px 0 0; */
  background-color: ${props => props.theme.colors.white};
  transition: background-color 300ms;
`;

const CardHeaderFaceDivider = styled.div`
  height: 50px;
  width: 1px;
  margin: 0 5px;
  background-color: ${props => props.theme.colors.grayBlueNormal};
`;

const CardHeaderFaceTitle = styled.p`
  color: ${props => props.theme.colors.grayBlueDark};
  font-family: ${props => props.theme.fonts.primary};
  line-height: 1.4;
  font-weight: 500;
  font-size: 11pt;
  margin: 0;
  transition: color 200ms;
`;

const CardHeaderFaceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  margin-right: ${props => props.theme.sizes.edge};
  border-radius: 50%;
  background-color: ${props => props.theme.colors.grayBlueDark};
  & > * {
    color: ${props => props.theme.colors.white};
    height: 20px;
    width: 20px;
  }
`;

const CardHeaderFace = styled(CardHeaderFacePartial)`
  &:hover,
  &:active {
    background-color: ${props => rgba(props.theme.colors.grayBlueLight, 0.6)};
    transition: background-color 200ms;
  }

  &[data-active="false"] {
    cursor: pointer;
  }
  &[data-active="true"] {
    &:hover,
    &:active {
      background-color: ${props => rgba(props.theme.colors.grayBlueLight, 0.3)};
      transition: background-color 200ms;
    }

    & > ${CardHeaderFaceTitle} {
      color: ${props => props.theme.colors.secondary};
      transition: color 200ms;
    }
    & > ${CardHeaderFaceIcon} {
      background-color: ${props => props.theme.colors.secondary};
      transition: background-color 200ms;
    }
  }
`;

const CardMain = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`;

const StyledFaceCss = css`
  position: absolute;
  top: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  transform: translateY(40px);
  transition: opacity 200ms, transform 400ms;
  ${props =>
    props.isActive &&
    css`
      pointer-events: all;
      z-index: 100;
      opacity: 1;
      transform: translateY(0);
      transition: opacity 200ms, transform 200ms;
    `}

  @media ${props => props.theme.medias.small} {
    transition: opacity 0ms, transform 0ms;
    ${props =>
      props.isActive &&
      css`
        position: relative;
        transition: opacity 200ms, transform 200ms;
      `}
  }  
`;

const StyledLogin = styled(Login)`
  ${StyledFaceCss};
`;
const StyledRegister = styled(Register)`
  ${StyledFaceCss};
`;

function Connect() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Wrapper id="connect">
      <Canvas>
        <CanvasContent>
          <Title isLight value="Connect to ConnSuite" />
          <Card>
            <CardOverlay />
            <CardContent>
              <CardHeader>
                <CardHeaderFace data-active={isLogin} onClick={() => setIsLogin(true)}>
                  <CardHeaderFaceIcon>
                    <IconFlashOn style={{ fontSize: "14pt" }} />
                  </CardHeaderFaceIcon>
                  <CardHeaderFaceTitle>Connect</CardHeaderFaceTitle>
                </CardHeaderFace>
                <CardHeaderFaceDivider />
                <CardHeaderFace data-active={!isLogin} onClick={() => setIsLogin(false)}>
                  <CardHeaderFaceIcon>
                    <IconHowToReg style={{ fontSize: "15pt" }} />
                  </CardHeaderFaceIcon>
                  <CardHeaderFaceTitle>Register</CardHeaderFaceTitle>
                </CardHeaderFace>
              </CardHeader>
              <CardMain>
                <StyledLogin isActive={isLogin} />
                <StyledRegister isActive={!isLogin} />
              </CardMain>
            </CardContent>
          </Card>
        </CanvasContent>
      </Canvas>
    </Wrapper>
  );
}

export default Connect;
