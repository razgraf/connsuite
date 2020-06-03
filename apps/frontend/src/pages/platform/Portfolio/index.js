import React, { useCallback, useState } from "react";
import styled from "styled-components";
import IconAdd from "@material-ui/icons/Add";
import { components } from "../../../themes";
import { Button, Spinner } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { pages, modals } from "../../../constants";
import { useSelfNetworks, useSelfArticles, useCover, useModal } from "../../../hooks";
import Network, { NetworkAdd } from "../../../components/shared/Network";
import Article, { ArticleAdd } from "../../../components/shared/Article";
import Cover from "../../../components/shared/Cover";
import { ModalNetworkRemove, ModalArticleRemove } from "../../../components/specific/Modals";

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
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column-gap: ${props => props.theme.sizes.edge};
  grid-row-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  grid-auto-rows: 1fr;
  & > * {
    grid-column: span 1;
    flex-grow: 0;
  }
  @media all and (max-width: ${props => props.theme.medias.medium}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media all and (max-width: ${props => props.theme.medias.small}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const GridArticles = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(300px, 1fr);
  grid-gap: 0;
  overflow: hidden;
  padding-bottom: ${props => props.theme.sizes.edge};
  & > * {
    grid-column: span 1;
  }
`;

function Portfolio() {
  const networks = useSelfNetworks();
  const articles = useSelfArticles();
  const [articleRemove, setArticleRemove] = useState(null);
  const { setOpen: setArticleRemoveModalOpen } = useModal(modals.articleRemove);
  const { network: networkCover, setOpen: setOpenCover } = useCover();

  const onArticleRemoveClick = useCallback(
    article => {
      setArticleRemove(article);
      setArticleRemoveModalOpen(true);
    },
    [setArticleRemove, setArticleRemoveModalOpen],
  );

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
              <Article key={article._id} {...article} onRemoveClick={onArticleRemoveClick} />
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
      <Cover />
      <ModalNetworkRemove network={networkCover} onSuccess={() => setOpenCover(false)} />
      <ModalArticleRemove article={articleRemove} onSuccess={() => setArticleRemove(null)} />
    </Page>
  );
}

export default Portfolio;
