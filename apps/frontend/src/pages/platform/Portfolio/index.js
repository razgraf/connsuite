import React, { useState } from "react";
import styled from "styled-components";
import IconAdd from "@material-ui/icons/Add";
import { components } from "../../../themes";
import { Button, Spinner } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { pages } from "../../../constants";
import { useNetworks, useArticles } from "../../../hooks";
import Network, { NetworkAdd } from "../../../components/shared/Network";
import Article, { ArticleAdd } from "../../../components/shared/Article";
import Cover from "../../../components/shared/Cover";

const Page = styled.div``;

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)``;
const SectionActions = styled(components.SectionActions)``;

const SectionNetworks = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: ${props => props.theme.sizes.edge};
`;

const SectionArticles = styled(components.Section)`
  padding: 0;
  overflow-x: hidden;
  margin-bottom: 0;
`;

const SectionQuick = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 3);
`;

const SectionQuickContent = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: calc(${props => props.theme.sizes.edge} * 1);
    &:last-child {
      margin-right: 0;
    }
  }
`;

const SectionHeaderArticles = styled(SectionHeader)`
  padding-left: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-right: calc(${props => props.theme.sizes.edge} * 1.5);
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const GridNetworks = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: ${props => props.theme.sizes.edge};
  grid-row-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  grid-auto-rows: 1fr;
  & > * {
    grid-column: span 1;
  }
`;

const GridArticles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 0;
  overflow: hidden;
  padding-bottom: ${props => props.theme.sizes.edge};
  & > * {
    grid-column: span 1;
  }
`;

function Portfolio() {
  const [isCoverVisible, setIsCoverVisible] = useState(true);

  const networks = useNetworks();
  const articles = useArticles();

  return (
    <Page>
      <Area>
        <SectionNetworks>
          <SectionHeader>
            <SectionTitle>
              <p>Networks</p>
              <Spinner color={c => c.secondary} isVisible={networks.isLoading} />
            </SectionTitle>
            <SectionActions>
              <Button
                appearance={t => t.outline}
                accent={t => t.grayBlueMedium}
                childrenLeft={
                  <ButtonIconWrapper>
                    <IconAdd style={{ fontSize: "11pt" }} />
                  </ButtonIconWrapper>
                }
                isMini
                title="Create Network"
                to={pages.network.create.root}
                type={t => t.router}
              />
            </SectionActions>
          </SectionHeader>
          <GridNetworks>
            {networks.list.map(network => (
              <Network key={network._id} {...network} />
            ))}
            <NetworkAdd />
          </GridNetworks>
        </SectionNetworks>
        <SectionArticles>
          <SectionHeaderArticles>
            <SectionTitle>
              <p>Articles</p>
              <Spinner color={c => c.secondary} isVisible={articles.isLoading} />
            </SectionTitle>
            <SectionActions>
              <Button
                appearance={t => t.outline}
                accent={t => t.grayBlueMedium}
                childrenLeft={
                  <ButtonIconWrapper>
                    <IconAdd style={{ fontSize: "11pt" }} />
                  </ButtonIconWrapper>
                }
                isMini
                title="Create Article"
                to={pages.article.create.root}
                type={t => t.router}
              />
            </SectionActions>
          </SectionHeaderArticles>
          <GridArticles>
            {articles.list.map(article => (
              <Article key={article._id} {...article} />
            ))}
            <ArticleAdd />
          </GridArticles>
        </SectionArticles>
        <SectionQuick>
          <SectionHeader>
            <SectionTitle>Quick Actions</SectionTitle>
          </SectionHeader>
          <SectionQuickContent>
            <Button
              appearance={t => t.outline}
              accent={t => t.grayBlueMedium}
              childrenLeft={
                <ButtonIconWrapper>
                  <IconAdd style={{ fontSize: "11pt" }} />
                </ButtonIconWrapper>
              }
              title="Create Network"
              to={pages.network.create.root}
              type={t => t.router}
            />
            <Button
              appearance={t => t.outline}
              accent={t => t.grayBlueMedium}
              childrenLeft={
                <ButtonIconWrapper>
                  <IconAdd style={{ fontSize: "11pt" }} />
                </ButtonIconWrapper>
              }
              title="Create Article"
              to={pages.article.create.root}
              type={t => t.router}
            />
          </SectionQuickContent>
        </SectionQuick>
      </Area>
      <Cover isVisible={isCoverVisible} setIsVisible={setIsCoverVisible} />
    </Page>
  );
}

export default Portfolio;
