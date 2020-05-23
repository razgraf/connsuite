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
import { pages } from "../../../constants";
import { ellipsis } from "../../../utils";
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
  cursor: pointer;
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
`;

const OverlayFooterTitle = styled.p`
  margin: 0 0 5px 0;
  width: 100%;
  font-size: 11pt;
  font-weight: 600;
  max-width: calc(100% - 80px);
  text-align: left;
  color: ${props => props.theme.colors.dark};
`;

const OverlayFooterBottom = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const OverlayFooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
`;

function Action({ Icon, callback, title, type, url }) {
  if (type === "button")
    return (
      <OverlayHeaderAction as="div" title={title} onClick={callback}>
        <Icon style={{ fontSize: "13pt" }} />
      </OverlayHeaderAction>
    );
  return (
    <Link href={url}>
      <OverlayHeaderAction title={title}>
        <Icon style={{ fontSize: "13pt" }} />
      </OverlayHeaderAction>
    </Link>
  );
}

const actionFactory = _id => [
  {
    Icon: IconEdit,
    title: "Edit",
    type: "link",
    url: pages.article.edit.builder(_id),
  },
  {
    Icon: IconShare,
    title: "Share",
    type: "button",
    callback: () => console.log(`Share ${_id}`),
  },
  {
    Icon: IconDelete,
    title: "Delete",
    type: "button",
    callback: () => console.log(`Delete ${_id}`),
  },
];

function Article({ className, _id, thumbnail, title, type }) {
  const actions = useMemo(() => actionFactory(_id), [_id]);

  return (
    <Link href={pages.article.view.builder(_id)}>
      <Wrapper className={className}>
        <Card>
          <Overlay>
            <OverlayHeader>
              {type === "external" && (
                <OverlayHeaderLocation title="External">
                  {" "}
                  <IconVisit style={{ fontSize: "13pt" }} />
                </OverlayHeaderLocation>
              )}
              <OverlayHeaderActions>
                {actions.map(action => (
                  <Action {...action} key={action.title} />
                ))}
              </OverlayHeaderActions>
            </OverlayHeader>
            <OverlayFooter>
              <OverlayFooterTitle>{ellipsis(title, 80)}</OverlayFooterTitle>
              <OverlayFooterBottom>
                <OverlayFooterInfo>
                  <OverlayFooterInfoItem data-purpose="category">Categories</OverlayFooterInfoItem>
                </OverlayFooterInfo>
                <OverlayFooterButton
                  appearance={t => t.solid}
                  accent={t => t.secondary}
                  isMini
                  title={type === "external" ? "Visit Article" : "Read Article"}
                  type={t => t.link}
                  to={pages.article.view.builder(_id)}
                />
              </OverlayFooterBottom>
            </OverlayFooter>
          </Overlay>
          <Content>
            <ContentImage src={_.get(thumbnail, "url")} />
          </Content>
        </Card>
      </Wrapper>
    </Link>
  );
}

function ArticleAdd() {
  return (
    <Link href={pages.article.create.root}>
      <Wrapper data-style="add">
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

Article.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(["internal", "external"]),
};

Article.defaultProps = {
  className: "",
  title: "",
  type: "internal",
};

Action.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  callback: PropTypes.func,
};

Action.defaultProps = {
  url: null,
  callback: () => {},
};
export default Article;
export { ArticleAdd };
