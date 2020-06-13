import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import sanitize from "sanitize-html";
import { darken } from "polished";

const Paragraph = styled.p`
  line-height: 1.6;
  font-size: 1rem;
  margin: 0.6rem 0;

  & > a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: underline;
    &:hover,
    &:active {
      color: ${props => darken(0.2, props.theme.colors.secondary)};
    }
  }
`;
const Header = styled.h2`
  padding: 2rem 0;
  margin-bottom: -1rem;
`;

const Checklist = styled.ul`
  appearance: none;
  padding: 0;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0.6rem;
  & > p,
  & > ${Paragraph} {
    display: inline-flex;
    margin: 0;
  }
`;

const CheckItemIcon = styled.div`
  display: inline-flex;
  position: relative;
  user-select: none;
  height: 22px;
  width: 22px;
  margin: 0 10px 0 0;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.white};

  &[data-active="true"] {
    background-color: ${props => props.theme.colors.secondary};
    border: 1px solid ${props => props.theme.colors.secondary};
    &:after {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 8px;
      height: 5px;
      border: 2px solid #fcfff4;
      border-top-color: rgb(252, 255, 244);
      border-top-style: solid;
      border-top-width: 2px;
      border-right-color: rgb(252, 255, 244);
      border-right-style: solid;
      border-right-width: 2px;
      border-top: none;
      border-right: none;
      background: transparent;
      content: "";
      transform: rotate(-45deg);
    }
  }
`;

const List = styled.ul``;
const ListItem = styled.li``;

const Delimiter = styled.div`
  line-height: 1.6em;
  width: 100%;
  text-align: center;
  margin: 2rem 0 1rem 0;

  &:before {
    display: inline-block;
    content: "***";
    font-size: 30px;
    line-height: 65px;
    height: 30px;
    letter-spacing: 0.2em;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;

  &,
  th,
  td {
    text-align: left !important;
    border: 1px solid ${props => props.theme.colors.grayBlueLight};
    border-collapse: collapse;
  }
  th,
  td {
    padding: 0 10px;
  }
`;

const Code = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  background: #292d3e;
  border: 1px solid ${props => props.theme.colors.dark};

  & > code {
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    color: ${props => props.theme.colors.white};
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  width: 100%;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1rem;

  & > img {
    border-radius: 2px;
    width: 100%;
  }

  & > p {
    &:empty {
      display: none;
    }
  }

  &[data-background="true"] {
    ${ImageWrapper} {
      padding: 10px;
      border: 1px solid ${props => props.theme.colors.grayBlueLight};
      background-color: ${props => props.theme.colors.grayGhost};

      & > img {
        max-width: 500px;
      }
    }
  }
`;

const ImageCaption = styled.div`
  margin: 5px 0 0 0;
  line-height: 1.6;
  font-size: 1rem;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  & > p {
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 10pt;
    font-weight: 600;
  }
`;

function prepare(text) {
  return sanitize(text, {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href"],
    },
  });
}

function Section({ payload }) {
  const type = _.get(payload, "type");
  const data = _.get(payload, "data");

  switch (type) {
    case "paragraph": {
      const content = prepare(_.get(data, "text"));
      return <Paragraph dangerouslySetInnerHTML={{ __html: content }} />;
    }
    case "header": {
      const level = _.get(data, "level") || "2";
      return <Header as={`h${level}`}>{_.get(data, "text")}</Header>;
    }
    case "checklist": {
      const list = _.toArray(_.get(data, "items"));
      return (
        <Checklist>
          {list.map(item => (
            <CheckItem>
              <CheckItemIcon data-active={_.get(item, "checked")} />
              <Section payload={{ type: "paragraph", data: item }} />
            </CheckItem>
          ))}
        </Checklist>
      );
    }
    case "list": {
      const list = _.toArray(_.get(data, "items"));
      const style = _.toArray(_.get(data, "style"));
      return (
        <List as={style === "ordered" ? "ol" : "ul"}>
          {list.map(item => (
            <ListItem>
              <Section payload={{ type: "paragraph", data: { text: item } }} />
            </ListItem>
          ))}
        </List>
      );
    }
    case "delimiter": {
      return <Delimiter />;
    }
    case "code": {
      const content = _.toArray(_.get(data, "code"));
      return (
        <Code>
          <code>{content}</code>
        </Code>
      );
    }
    case "table": {
      const content = _.toArray(_.get(data, "content"));
      return (
        <Table>
          {content.map(column => (
            <tr>
              {column.map(item => (
                <td>
                  <Section payload={{ type: "paragraph", data: { text: item } }} />
                </td>
              ))}
            </tr>
          ))}
        </Table>
      );
    }
    case "simpleImage": {
      const url = _.get(data, "url");
      const caption = _.get(data, "caption");
      return (
        <Image data-background={_.get(data, "withBackground")}>
          <ImageWrapper>
            <img src={url} alt={caption || "image"} />
          </ImageWrapper>
          {caption && (
            <ImageCaption>
              <Section payload={{ type: "paragraph", data: { text: caption } }} />
            </ImageCaption>
          )}
        </Image>
      );
    }
    default:
      return <></>;
  }
}

Section.propTypes = {
  payload: PropTypes.shape({}),
};

Section.defaultProps = {
  payload: {},
};

export default Section;
