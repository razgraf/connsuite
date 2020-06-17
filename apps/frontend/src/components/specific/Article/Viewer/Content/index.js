import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { components } from "../../../../../themes";
import { parseFullName } from "../../../../../utils";
import Section from "../../../../atoms/Input/InputEditor/viewer";

const Wrapper = styled.div`
  position: relative;
  z-index: 300;
  margin-top: -50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

const Card = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  box-shadow: 0px 15px 48px -15px rgba(0, 0, 0, 0.12);
  padding: calc(${props => props.theme.sizes.edge} * 4);
`;

const Title = styled.p`
  width: auto;
  margin: 15px 0 30px 0;
  text-align: center;
  font-size: 30pt;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  font-weight: 600;
  width: 100%;
`;

const By = styled.p`
  width: auto;
  margin: 0;
  text-align: center;
  font-size: 12pt;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;
`;

const Tag = styled.div`
  margin: 3px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  min-height: 40px;
  min-width: 60px;
  padding: 0 ${props => props.theme.sizes.edge};
  border: 1px solid transparent;
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: box-shadow 100ms, background-color 100ms;
  margin-top: calc(${props => props.theme.sizes.edge} * 0.5);
  margin-bottom: calc(${props => props.theme.sizes.edge} * 0.5);
  & > p {
    font-size: 9pt;
    font-weight: 600;
    color: ${props => props.theme.colors.white};
    transition: color 100ms;
    margin: 0;
  }

  &[data-purpose="category"] {
    background-color: ${props => props.theme.colors.secondary};
  }

  &[data-purpose="skill"] {
    background-color: ${props => props.theme.colors.orange};
  }
  &[data-purpose="date"] {
    background-color: ${props => props.theme.colors.grayBlueLight};
    & > p {
      color: ${props => props.theme.colors.grayBlueDark};
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 300px;
  font-size: 12pt;
`;

const Divider = styled.div`
  margin: calc(${props => props.theme.sizes.edge} * 3) auto;
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.grayBlueLight};
`;

function Content({ className, user, title, createdAt, content, skills, categories }) {
  const name = useMemo(() => parseFullName({ user }), [user]);
  const sections = useMemo(() => _.toArray(_.attempt(() => _.get(JSON.parse(content), "blocks"))), [content]);

  return (
    <Wrapper className={className}>
      <Card>
        <Title>{title}</Title>
        <By>by {name}</By>
        <Divider />
        <Main>
          {sections.map(section => (
            <Section payload={section} />
          ))}
        </Main>
        <Divider />
        <Tags>
          <Tag data-purpose="date">
            <p>{createdAt}</p>
          </Tag>
          {categories.map(category => (
            <Tag data-purpose="category" key={_.get(category, "title")}>
              <p>{_.get(category, "title")}</p>
            </Tag>
          ))}
          {skills.map(skill => (
            <Tag data-purpose="skill" key={_.get(skill, "title")}>
              <p>{_.get(skill, "title")}</p>
            </Tag>
          ))}
        </Tags>
      </Card>
    </Wrapper>
  );
}

Content.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape({})),
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};
Content.defaultProps = {
  className: null,
  skills: [],
  categories: [],
};

export default Content;
