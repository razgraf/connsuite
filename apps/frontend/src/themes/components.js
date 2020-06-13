import styled, { css } from "styled-components";
import { rgba } from "polished";

const Canvas = styled.div`
  padding: 0 ${props => props.theme.sizes.canvasEdge};
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.canvasMaxWidth};
  width: 100%;
`;

const coordinates = css`
  ${props =>
    props.top &&
    css`
      top: ${props.top};
    `};
  ${props =>
    props.right &&
    css`
      right: ${props.right};
    `};
  ${props =>
    props.bottom &&
    css`
      bottom: ${props.bottom};
    `};
  ${props =>
    props.left &&
    css`
      left: ${props.left};
    `};

  ${props =>
    props.rotate &&
    css`
      transform: rotate(${props.rotate});
    `};
`;

const Circle = styled.div`
  border: 1px solid ${props => (props.dark ? props.theme.colors.grayLight : rgba(props.theme.colors.white, 0.1))};
  position: ${props => (props.fixed ? "fixed" : "absolute")};
  height: calc(2 * ${props => props.radius || "10px"});
  width: calc(2 * ${props => props.radius || "10px"});
  border-radius: 50%;

  ${coordinates};
`;

const Line = styled.div.attrs(props => ({
  "data-orientation": props.vertical ? "vertical" : "horizontal",
}))`
  background: ${props => (props.dark ? props.theme.colors.grayLight : rgba(props.theme.colors.white, 0.1))};
  position: ${props => (props.fixed ? "fixed" : "absolute")};
  height: 1px;
  width: 100%;

  ${props =>
    props.extend &&
    css`
      width: calc(100% + ${props.extend});
    `}

  ${coordinates};

  ${props =>
    props.vertical &&
    css`
      height: 100%;
      width: 1px;
      ${props.extend &&
      css`
        height: calc(100% + ${props.extend});
      `}
    `}
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: calc(${props => props.theme.sizes.edge} * 2) 0;
  @media ${props => props.theme.medias.tablet} {
    padding: calc(${props => props.theme.sizes.edge} * 1) 0;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 40px;
  & > p {
    margin: 0 calc(${props => props.theme.sizes.edge} * 2 / 3) 0 0;
    text-align: left;
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fonts.primary};
    font-size: 13pt;
    font-weight: 400;
  }
  @media ${props => props.theme.medias.tablet} {
    & > p {
      font-size: 14pt;
    }
  }
`;

const SectionActions = styled.div`
  display: flex;
  align-items: center;
  padding-left: calc(${props => props.theme.sizes.edge} * 1);
  & > * {
    margin-right: calc(${props => props.theme.sizes.edge} * 1);
    &:last-child {
      margin-right: 0;
    }
  }
`;

const components = {
  Canvas,
  Circle,
  Line,

  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
};

export default components;
