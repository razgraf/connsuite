import styled, { css } from "styled-components";
import { rgba } from "polished";

const Canvas = styled.div`
  padding: 0 ${props => props.theme.sizes.edge};
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
      ${props =>
        props.extend &&
        css`
          height: calc(100% + ${props.extend});
        `}
    `}
`;

const components = {
  Canvas,
  Circle,
  Line,
};

export default components;
