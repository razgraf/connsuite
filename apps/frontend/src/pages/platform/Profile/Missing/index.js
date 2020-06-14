import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

import { components } from "../../../../themes";
import { types } from "../../../../constants";

import Nav from "../../../../components/shared/Nav";
import Footer from "../../../../components/shared/Footer";
import { Emoji } from "../../../../components/atoms";

import Illustration from "../../../../assets/illustrations/illustration_symbols.png";

const Page = styled.div`
  position: relative;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-top: ${props => props.theme.sizes.navHeight};
  @media ${props => props.theme.medias.small} {
    padding-top: ${props => props.theme.sizes.navHeightMobile};
  }
`;

const Canvas = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueGhost};
  border-top: none;
  border-bottom: 0;
  padding-top: 200px;
  padding-bottom: 200px;
  min-height: calc(100vh - ${props => props.theme.sizes.footerMinHeight} - ${props => props.theme.sizes.navHeight});
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
    box-shadow: 0 0 50px -10px ${props => rgba(props.theme.colors.dark, 0.1)};
  }
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px -10px ${props => rgba(props.theme.colors.dark, 0.1)};
  }

  @media ${props => props.theme.medias.small} {
    min-height: calc(100vh - ${props => props.theme.sizes.footerMinHeight} - ${props => props.theme.sizes.navHeightMobile});
  }
`;

const Image = styled.img`
  object-fit: contain;
  position: absolute;
  z-index: 10;
  padding-bottom: 40px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 36pt;
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.primary};
  margin: 0 0 40px 0;
  text-align: center;
  max-width: 800px;
  z-index: 100;
`;

const Content = styled.p`
  font-weight: 300;
  line-height: 1.7;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 11pt;
  color: ${props => props.theme.colors.dark};
  text-align: center;
  max-width: 600px;
  z-index: 100;
`;

function Missing() {
  return (
    <Page>
      <Nav
        isMissing
        appearance={types.nav.appearance.profile}
        title={
          <span>
            <span style={{ marginRight: "5px" }}>Oops</span> <Emoji symbol="👻" />
          </span>
        }
      />
      <Main>
        <Canvas>
          <Title>The search continues...</Title>
          <Content>
            We couldn&apos;t find the profile you were looking for. This user might not be registered.. or maybe is gone on a top-secret
            mission.
          </Content>
          <Image src={Illustration} />
        </Canvas>
      </Main>
      <Footer />
    </Page>
  );
}

Missing.propTypes = {};

Missing.defaultProps = {};

export default Missing;
