import React, { useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import IconAdd from "@material-ui/icons/Add";
import { Button } from "../../../atoms";
import { getPrimaryUsername } from "../../../../utils";
import { pages } from "../../../../constants";
import { useHistory } from "../../../../hooks";
import AssetArticle from "../../../../assets/illustrations/tutorial_article.gif";
import AssetBusiness from "../../../../assets/illustrations/tutorial_business_pocket.gif";
import AssetNetworks from "../../../../assets/illustrations/tutorial_network.gif";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  @media ${props => props.theme.medias.medium} {
    grid-template-columns: 1fr;
    grid-gap: 15px;
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
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
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
  color: ${props => props.theme.colors.grayBlueBlack};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 13pt;
  font-weight: 400;
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

function Welcome() {
  const auth = useSelector(state => state.auth);
  const username = useMemo(() => getPrimaryUsername(auth.user), [auth]);
  const history = useHistory();
  const router = useRouter();

  return (
    <Wrapper>
      <Grid>
        <Item>
          <Inner>
            <Illustration>
              <img src={AssetNetworks} alt="Networks" />
            </Illustration>
            <Title>Link networks</Title>
            <Description>
              Connect all your existing networks to your ConnSuite profile. Get insights about your most visited accounts.
            </Description>
            <Actions>
              <Button
                appearance={t => t.outline}
                accent={t => t.grayBlueMedium}
                childrenLeft={
                  <ButtonIconWrapper>
                    <IconAdd style={{ fontSize: "11pt" }} />
                  </ButtonIconWrapper>
                }
                title="Add Networks"
                to={pages.network.create.root}
                type={t => t.router}
                onClick={() => history.push()}
              />
            </Actions>
          </Inner>
        </Item>
        <Item>
          <Inner>
            <Illustration>
              <img src={AssetArticle} alt="Articles" />
            </Illustration>
            <Title>Post articles</Title>
            <Description>
              Add articles from various sources or write some from scratch. Showcase your portfolio, your work or share interesting stuff
              that shows who you are.
            </Description>
            <Actions>
              <Button
                appearance={t => t.outline}
                accent={t => t.grayBlueMedium}
                childrenLeft={
                  <ButtonIconWrapper>
                    <IconAdd style={{ fontSize: "11pt" }} />
                  </ButtonIconWrapper>
                }
                title="Add Articles"
                to={pages.article.create.root}
                type={t => t.router}
                onClick={() => history.push()}
              />
            </Actions>
          </Inner>
        </Item>
        <Item>
          <Inner>
            <Illustration>
              <img src={AssetBusiness} alt="Business Card" />
            </Illustration>
            <Title>Improve your business card</Title>
            <Description>
              Your connsuite profile can become your ultimate online business card. Share it with your audience, event attendees or future
              business partners.
            </Description>
            <Actions>
              <Button
                appearance={t => t.outline}
                accent={t => t.grayBlueMedium}
                title="View your profile"
                to={pages.article.create.root}
                type={t => t.button}
                onClick={() => {
                  history.push();
                  router.push(pages.profile.view.route, pages.profile.view.builder(username));
                }}
              />
            </Actions>
          </Inner>
        </Item>
      </Grid>
    </Wrapper>
  );
}

export default Welcome;
