import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import IconAdd from "@material-ui/icons/Add";
import { components } from "../../../themes";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { pages, DUMMY } from "../../../constants";
import Network, { NetworkAdd } from "../../../components/shared/Network";
import Article, { ArticleAdd } from "../../../components/shared/Article";

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)``;
const SectionActions = styled(components.SectionActions)``;

const SectionNetworks = styled(components.Section)`
  padding: 0 calc(${props => props.theme.sizes.edge} * 1.5);
  overflow-x: hidden;
`;

const SectionArticles = styled(components.Section)`
  padding: 0;
  overflow-x: hidden;
`;

const SectionHeaderArticles = styled(SectionHeader)`
  padding-left: calc(${props => props.theme.sizes.edge} * 1.5);
  padding-right: calc(${props => props.theme.sizes.edge} * 1.5);
`;

const Add = styled.div`
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
  & > * {
    grid-column: span 1;
  }
`;

const GridArticles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 25vw);
  grid-gap: 0;
  & > * {
    grid-column: span 1;
  }
`;

function Portfolio() {
  const store = useStore();

  return (
    <Area>
      <SectionNetworks>
        <SectionHeader>
          <SectionTitle>My Networks</SectionTitle>
          <SectionActions>
            <Button
              appearance={t => t.outline}
              accent={t => t.grayBlueMedium}
              childrenLeft={
                <Add>
                  <IconAdd style={{ fontSize: "11pt" }} />
                </Add>
              }
              isMini
              title="Create Network"
              to={pages.network.create.root}
              type={t => t.router}
            />
          </SectionActions>
        </SectionHeader>
        <GridNetworks>
          {DUMMY.NETWORKS.map(network => (
            <Network key={network._id} {...network} />
          ))}
          <NetworkAdd />
        </GridNetworks>
      </SectionNetworks>
      <SectionArticles>
        <SectionHeaderArticles>
          <SectionTitle>My Articles</SectionTitle>
          <SectionActions>
            <Button
              appearance={t => t.outline}
              accent={t => t.grayBlueMedium}
              childrenLeft={
                <Add>
                  <IconAdd style={{ fontSize: "11pt" }} />
                </Add>
              }
              isMini
              title="Create Article"
              to={pages.article.create.root}
              type={t => t.router}
            />
          </SectionActions>
        </SectionHeaderArticles>
        <GridArticles>
          {DUMMY.ARTICLES.map(article => (
            <Article key={article._id} {...article} />
          ))}
          <ArticleAdd />
        </GridArticles>
      </SectionArticles>
    </Area>
  );
}

export default Portfolio;
