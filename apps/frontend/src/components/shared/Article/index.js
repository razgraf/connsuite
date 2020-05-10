import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconEdit from "@material-ui/icons/EditRounded";
import IconShare from "@material-ui/icons/ShareRounded";
import IconDelete from "@material-ui/icons/DeleteOutline";
import { rgba } from "polished";
import { pages } from "../../../constants";
import { ellipsis } from "../../../utils";
import { Button } from "../../atoms";

const Wrapper = styled.div`
  grid-column: span 1;
`;

const Card = styled.div``;

const Content = styled.div``;

const ContentImage = styled.img``;

const Overlay = styled.div``;

const OverlayHeader = styled.div``;

const OverlayHeaderLocation = styled.div`
  & > p {
  }
`;

const OverlayHeaderActions = styled.div`
  height: 30px;
  width: 30px;
`;

const OverlayHeaderAction = styled.div`
  & > {
    color: ${props => props.theme.colors.grayBlueDark};
  }
`;

const OverlayFooter = styled.div``;

const OverlayFooterTitle = styled.p``;

const OverlayFooterBottom = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const OverlayFooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const OverlayFooterInfoItem = styled.p``;

const OverlayFooterButton = styled(Button)``;

function Action({ Icon, title, type, url }) {
  if (type === "button")
    return (
      <OverlayHeaderAction as="div" title={title}>
        <Icon style={{ fontSize: "16pt" }} />
      </OverlayHeaderAction>
    );
  return (
    <Link href={url}>
      <OverlayHeaderAction title={title}>
        <Icon style={{ fontSize: "16pt" }} />
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

function Article({ className, _id, image, title }) {
  const actions = useMemo(() => actionFactory(_id), [_id]);

  return (
    <Link href={pages.article.view.builder(_id)}>
      <Wrapper className={className}>
        <Card>
          <Overlay>
            <OverlayHeader>
              <OverlayHeaderLocation title="External">E</OverlayHeaderLocation>
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
                  <OverlayFooterInfoItem>Categories</OverlayFooterInfoItem>
                  <OverlayFooterInfoItem>Skills</OverlayFooterInfoItem>
                </OverlayFooterInfo>
                <OverlayFooterButton
                  appearance={t => t.solid}
                  accent={t => t.grayBlueMedium}
                  isMini
                  type={t => t.link}
                  to={pages.article.view.builder(_id)}
                />
              </OverlayFooterBottom>
            </OverlayFooter>
          </Overlay>
          <Content>
            <ContentImage src={_.get(image, "source")} />
          </Content>
        </Card>
      </Wrapper>
    </Link>
  );
}

function ArticleAdd() {
  return <p>Add</p>;
}

Article.propTypes = {
  className: PropTypes.string,
  _id: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
};

Article.defaultProps = {
  className: "",
  title: "",
};

Action.propTypes = {
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Article;
export { ArticleAdd };
