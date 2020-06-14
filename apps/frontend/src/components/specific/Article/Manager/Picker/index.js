import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconArticleInternal from "@material-ui/icons/DescriptionRounded";
import IconArticleExternal from "@material-ui/icons/Link";
import IconReturn from "@material-ui/icons/ArrowBackRounded";
import { useHistory } from "../../../../../hooks";
import { types, pages } from "../../../../../constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.sizes.articlePickerElevation};
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${props => props.theme.gradients.primary};
  opacity: 1;
  pointer-events: all;

  &[data-active="false"] {
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
    transition: opacity 200ms;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.sizes.edge};
  overflow-y: auto;
  overflow-x: hidden;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 200;
  width: 100%;
  max-width: 800px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
  @media ${props => props.theme.medias.small} {
    margin-top: 160px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 4) calc(${props => props.theme.sizes.edge} * 1.5)
    calc(${props => props.theme.sizes.edge} * 2);
`;

const Title = styled.p`
  margin: 0;
  font-size: 14pt;
  font-weight: 400;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueDark};
  & > span {
    font-weight: 700;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: calc(${props => props.theme.sizes.edge} * 1);
  padding: calc(${props => props.theme.sizes.edge} * 1.5);

  @media ${props => props.theme.medias.small} {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }
`;

const ElementPartial = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  height: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5);
  box-shadow: none;
  border-radius: ${props => props.theme.sizes.edge};
  transition: box-shadow 0.15s;
  overflow: hidden;
`;

const ElementIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  width: 140px;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.5);
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.grayBlueNormal};
  transition: border 150ms;
  & > * {
    color: ${props => props.theme.colors.grayBlueMedium};
    transition: color 150ms;
  }
  @media ${props => props.theme.medias.small} {
    height: 80px;
    width: 80px;
  }
`;

const ElementTitle = styled.p`
  color: ${props => props.theme.colors.grayBlueDark};
  font-size: 11pt;
  font-weight: 500;
  font-family: ${props => props.theme.fonts.primary};
  margin: 0;
  transition: color 150ms;
`;

const ElementDescriptions = styled.p`
  margin: calc(${props => props.theme.sizes.edge} * 1.5) 0 0;
  line-height: 1.5;
  text-align: center;
  font-size: 10pt;
  font-weight: 500;
  color: ${props => props.theme.colors.secondary};
  opacity: 0;
  transform: translateY(200px);
  transition: transform 150ms, opacity 100ms;
  @media ${props => props.theme.medias.small} {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Element = styled(ElementPartial)`
  &:not([data-purpose="return"]) {
    &:hover,
    &:active {
      box-shadow: 0 10px 48px -8px ${props => rgba(props.theme.colors.secondary, 0.25)};
      transition: box-shadow 150ms;

      ${ElementIcon} {
        border: 1px solid ${props => props.theme.colors.secondary};
        transition: border 150ms;
        & > * {
          color: ${props => props.theme.colors.secondary};
          transition: color 150ms;
        }
      }
      ${ElementTitle} {
        color: ${props => props.theme.colors.secondary};
        transition: color 150ms;
      }
      ${ElementDescriptions} {
        opacity: 1;
        transform: translateY(0);
        transition: transform 150ms, opacity 100ms;
      }
    }
    @media ${props => props.theme.medias.small} {
      box-shadow: 0 10px 48px -8px ${props => rgba(props.theme.colors.secondary, 0.25)};
    }
  }

  &[data-purpose="return"] {
    &:hover,
    &:active {
      ${ElementIcon} {
        border: 1px solid ${props => props.theme.colors.red};
        transition: border 150ms;
        & > * {
          color: ${props => props.theme.colors.red};
          transition: color 150ms;
        }
      }
      ${ElementTitle} {
        color: ${props => props.theme.colors.red};
        transition: color 150ms;
      }
    }
  }
`;

function Picker({ className, isActive, onPick }) {
  const { back } = useHistory();

  return (
    <Wrapper className={className} data-active={isActive}>
      <Container>
        <Card>
          <Header>
            <Title>
              Choose an article <span>type</span>
            </Title>
          </Header>
          <Main>
            <Element onClick={() => onPick(types.article.type.internal)}>
              <ElementIcon>
                <IconArticleInternal style={{ fontSize: "24pt" }} />
              </ElementIcon>
              <ElementTitle>Write from scratch</ElementTitle>
              <ElementDescriptions>
                Want to write something for your visitors or maybe showcase your work? Write your article here.
              </ElementDescriptions>
            </Element>

            <Element onClick={() => onPick(types.article.type.external)}>
              <ElementIcon>
                <IconArticleExternal style={{ fontSize: "24pt" }} />
              </ElementIcon>
              <ElementTitle>Connect to external link</ElementTitle>
              <ElementDescriptions>
                Advertising some external item from Medium, Behance or maybe Github? Add the link here.
              </ElementDescriptions>
            </Element>

            <Element data-purpose="return" onClick={() => back({ fallback: pages.portfolio.root })}>
              <ElementIcon>
                <IconReturn style={{ fontSize: "24pt" }} />
              </ElementIcon>
              <ElementTitle>Return</ElementTitle>
            </Element>
          </Main>
        </Card>
      </Container>
    </Wrapper>
  );
}

Picker.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onPick: PropTypes.func.isRequired,
};

Picker.defaultProps = {
  className: null,
  isActive: true,
};

export default Picker;
