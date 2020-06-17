import React from "react";
import styled from "styled-components";
import { components } from "../../../../themes";
import SectionTitle from "../Title";
import { Emoji } from "../../../atoms";
import AssetArticle from "../../../../assets/illustrations/tutorial_article.gif";
import AssetBusiness from "../../../../assets/illustrations/tutorial_business_pocket.gif";
import AssetNetworks from "../../../../assets/illustrations/tutorial_network.gif";

const Wrapper = styled.section`
  width: 100%;
`;

const Canvas = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 500px;
  padding-bottom: 50px;
  @media ${props => props.theme.medias.small} {
    padding-top: 20px;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  padding-top: 50px;
  @media ${props => props.theme.medias.medium} {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    padding-top: 20px;
  }
`;

const Item = styled.div`
  grid-column: span 1;
  &:nth-child(2) {
    & > div {
      margin-top: 100px;
    }
  }
  &:nth-child(3) {
    & > div {
      margin-top: 200px;
    }
  }
  @media ${props => props.theme.medias.medium} {
    & > div {
      margin: 0 !important;
    }
  }
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.white};
  transition: box-shadow 300ms;
  &:hover,
  &:active {
    box-shadow: 0px 12px 48px -15px rgba(0, 0, 0, 0.12);
    transition: box-shadow 300ms;
  }
`;

const Blob = styled.div`
  position: absolute;
  left: -15px;
  top: -15px;
  height: 40px;
  width: 40px;
  border-radius: 0 10px 25px 0;
  background: ${props => props.theme.colors.primary};
`;

const Illustration = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: center;
  }
`;

const Title = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 15pt;
  font-weight: 600;
  margin: 0 0 30px 0;
  width: 100%;
`;

const Description = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.grayBlueDark};
  font-size: ${props => props.theme.sizes.text};
  font-weight: 400;
  margin: 0 0 30px 0;
  width: 100%;
`;

function Value() {
  return (
    <Wrapper>
      <Canvas id="learn">
        <SectionTitle>
          Let&apos;s fix the business card together <Emoji symbol="👔" />
        </SectionTitle>
        <Grid>
          <Item>
            <Inner>
              <Blob />
              <Illustration>
                <img src={AssetNetworks} alt="Networks" />
              </Illustration>
              <Title>Link networks</Title>
              <Description>
                Connect all your existing networks to your ConnSuite profile. Get insights about your most visited accounts.
              </Description>
            </Inner>
          </Item>
          <Item>
            <Inner>
              <Blob />
              <Illustration>
                <img src={AssetArticle} alt="Articles" />
              </Illustration>
              <Title>Post articles</Title>
              <Description>
                Add articles from various sources or write some from scratch. Showcase your portfolio, your work or share interesting stuff
                that shows who you are.
              </Description>
            </Inner>
          </Item>
          <Item>
            <Inner>
              <Blob />
              <Illustration>
                <img src={AssetBusiness} alt="Business Card" />
              </Illustration>
              <Title>Improve your business card</Title>
              <Description>
                Your connsuite profile can become your ultimate online business card. Share it with your audience, event attendees or future
                business partners.
              </Description>
            </Inner>
          </Item>
        </Grid>
      </Canvas>
    </Wrapper>
  );
}

export default Value;
