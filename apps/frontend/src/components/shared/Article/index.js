import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconEdit from "@material-ui/icons/EditRounded";
import IconShare from "@material-ui/icons/ShareRounded";
import IconDelete from "@material-ui/icons/DeleteOutline";
import IconVisit from "@material-ui/icons/InsertLinkRounded";
import { rgba } from "polished";
import { pages, types } from "../../../constants";
import { useHistory } from "../../../hooks";
import { ellipsis, getFriendlyTitle } from "../../../utils";
import { Button } from "../../atoms";

const WrapperPartial = styled.div`
  grid-column: span 1;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: relative;
  overflow: hidden;
`;

const ContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  transform: scale(1.05);
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: ${props => rgba(props.theme.colors.black, 0)};
  overflow: hidden;
  transition: background-color 200ms;
`;

const OverlayHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  padding: ${props => props.theme.sizes.edge};
  @media ${props => props.theme.medias.tablet} {
    padding: 10px;
  }
`;

const OverlayHeaderLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${props => rgba(props.theme.colors.dark, 0.8)};
  transform: rotate(-15deg);
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;

const OverlayHeaderActions = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px;
  border-radius: 20px;
  margin-left: auto;
  background-color: ${props => props.theme.colors.white};
  & > * {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const OverlayHeaderAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: ${props => rgba(props.theme.colors.dark, 0)};
  cursor: pointer;
  & > * {
    color: ${props => props.theme.colors.grayBlueDark};
  }
  &:hover,
  &:active {
    background-color: ${props => rgba(props.theme.colors.dark, 0.15)};
    &[title="Delete"] {
      background-color: ${props => props.theme.colors.red};
      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

const OverlayFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 101%;
  padding: ${props => props.theme.sizes.edge};
  background: ${props => props.theme.colors.white};
  transform: translateY(100%);
  transition: transform 200ms;
  will-change: transform;
  @media ${props => props.theme.medias.tablet} {
    transform: translateY(0);
    transition: transform 200ms;
    will-change: transform;
    flex-direction: row;
    align-items: center;
    width: calc(100% - 2 * 10px);
    margin: 10px;
    padding: 10px;
    border-radius: 2px;
  }
`;

const OverlayFooterTitle = styled.p`
  margin: 0 0 5px 0;
  width: 100%;
  font-size: 12pt;
  font-weight: 400;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  white-space: nowrap;
  max-width: calc(100% - 80px);
  text-align: left;
  color: ${props => props.theme.colors.dark};
  @media ${props => props.theme.medias.tablet} {
    flex: 1;
    max-width: calc(100% - 120px);
    margin-right: auto;
    margin-bottom: 0;
    font-size: 11pt;
  }
  ${props => props.theme.extensions.ellipsis};
`;

const OverlayFooterBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media ${props => props.theme.medias.tablet} {
    width: auto;
  }
`;

const OverlayFooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media ${props => props.theme.medias.tablet} {
    display: none;
  }
`;

const OverlayFooterInfoItem = styled.p`
  margin: 0;
  font-size: 9pt;
  font-weight: 700;
  &[data-purpose="category"] {
    color: ${props => props.theme.colors.secondary};
  }
`;

const OverlayFooterButton = styled(Button)``;

const Shape = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 1px;
    background: ${props => props.theme.colors.grayBlueNormal};
    position: absolute;
    z-index: 1;

    &:first-child {
      height: 100%;
      width: 1px;
      background: ${props => props.theme.colors.grayBlueNormal};
      position: absolute;
    }
  }
`;

const AddTitle = styled.p`
  margin: 0;
  font-size: 10pt;
  font-weight: 600;
  text-align: center;
  color: ${props => props.theme.colors.grayBlueDark};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  & > * {
    max-width: 160px;
  }
`;

const Wrapper = styled(WrapperPartial)`
  &:hover,
  &:active {
    ${Overlay} {
      background-color: ${props => rgba(props.theme.colors.black, 0.15)};
      transition: background-color 200ms;
    }
    ${OverlayFooter} {
      transform: translateY(0);
      transition: transform 200ms;
      will-change: transform;
    }
  }
  &:not([data-style="add"]) {
    ${Card} {
      box-shadow: 0 0 15px 0 ${props => rgba(props.theme.colors.dark, 0.1)};
      @media ${props => props.theme.medias.tablet} {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
  &[data-style="add"] {
    opacity: 0.6;
    transition: opacity 200ms;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    ${Card} {
      flex: 1;
      padding: 20px;
    }
    ${Content} {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px;
      box-shadow: none;
      border-radius: 4px;
      border: 1px solid ${props => props.theme.colors.grayBlueNormal};
    }
    ${Info} {
      padding-bottom: calc(${props => props.theme.sizes.networkEdge} * 3 / 4);
    }
    &:hover,
    &:active {
      opacity: 1;
      transition: opacity 200ms;
    }
  }

  &[data-style="missing"] {
    opacity: 1;
    transition: opacity 200ms;
    cursor: default;
    display: flex;
    flex-direction: column;
    ${Card} {
      flex: 1;
      padding: 20px;
    }
    ${Content} {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-shadow: none;
      border-radius: 4px;
      border: 1px solid ${props => props.theme.colors.grayBlueNormal};
      & > p {
        margin: 0;
        font-size: 9pt;
        font-weight: 400;
        text-align: center;
        width: 100%;
        font-family: ${props => props.theme.fonts.primary};
        color: ${props => props.theme.colors.grayBlueDark};
      }
    }
  }
`;

function Action({ Icon, callback, title, type, url, route }) {
  const history = useHistory();
  if (type === "button")
    return (
      <OverlayHeaderAction as="div" title={title} onClick={callback}>
        <Icon style={{ fontSize: "13pt" }} />
      </OverlayHeaderAction>
    );
  return (
    <Link href={route} as={url}>
      <OverlayHeaderAction as="a" title={title} onClick={() => history.push()}>
        <Icon style={{ fontSize: "13pt" }} />
      </OverlayHeaderAction>
    </Link>
  );
}

function Article({ className, _id, shortId, thumbnail, categories, title, type, onRemoveClick, isSelf }) {
  const categoryField = useMemo(() => {
    if (!categories || !categories.length) return "";
    let field = categories
      .slice(0, 3)
      .map(category => category.title)
      .join(", ");
    if (field.length > 30) return ellipsis(field, 30);
    if (categories.length > 3) field += "...";
    return field;
  }, [categories]);

  return (
    <Wrapper className={className}>
      <Card>
        <Overlay>
          <OverlayHeader>
            {type === types.article.type.external && (
              <OverlayHeaderLocation title="External">
                <IconVisit style={{ fontSize: "13pt" }} />
              </OverlayHeaderLocation>
            )}
            <OverlayHeaderActions>
              {isSelf && (
                <Action Icon={IconEdit} title="Edit" type="link" url={pages.article.edit.builder(_id)} route={pages.article.edit.route} />
              )}
              <Action Icon={IconShare} title="Share" type="button" callback={() => console.log(`Share ${_id}`)} />
              {isSelf && <Action Icon={IconDelete} title="Delete" type="button" callback={() => onRemoveClick({ _id, title })} />}
            </OverlayHeaderActions>
          </OverlayHeader>
          <OverlayFooter>
            <OverlayFooterTitle>{ellipsis(title, 80)}</OverlayFooterTitle>
            <OverlayFooterBottom>
              <OverlayFooterInfo>
                <OverlayFooterInfoItem data-purpose="category">{categoryField}</OverlayFooterInfoItem>
              </OverlayFooterInfo>

              <OverlayFooterButton
                type={t => t.link}
                appearance={t => t.solid}
                accent={t => t.secondary}
                isMini
                title={type === types.article.type.external ? "Visit Article" : "Read Article"}
                to={pages.article.view.builder(shortId, getFriendlyTitle(title))}
              />
            </OverlayFooterBottom>
          </OverlayFooter>
        </Overlay>
        <Content>
          <ContentImage src={_.get(thumbnail, "url")} />
        </Content>
      </Card>
    </Wrapper>
  );
}

function ArticleAdd() {
  const history = useHistory();

  return (
    <Link href={pages.article.create.root}>
      <Wrapper data-style="add" as="a" onClick={() => history.push()}>
        <Card>
          <Content>
            <Shape>
              <div />
              <div />
            </Shape>
          </Content>
        </Card>
        <Info>
          <AddTitle>Create Article</AddTitle>
        </Info>
      </Wrapper>
    </Link>
  );
}

function ArticleMissing() {
  return (
    <Wrapper data-style="missing">
      <Card>
        <Content>
          <p>Stories coming soon</p>
        </Content>
      </Card>
    </Wrapper>
  );
}

Action.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  route: PropTypes.string,
  callback: PropTypes.func,
};

Action.defaultProps = {
  url: null,
  route: null,
  callback: () => {},
};

Article.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string.isRequired,
  shortId: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(Object.values(types.article.type)),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
  ),
  onRemoveClick: PropTypes.func,
  isSelf: PropTypes.bool,
};

Article.defaultProps = {
  className: "",
  title: "",
  type: types.article.type.internal,
  categories: [],
  onRemoveClick: () => {},
  isSelf: true,
};

export default Article;
export { ArticleAdd, ArticleMissing };
