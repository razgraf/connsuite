import _ from "lodash";
import React, { Fragment, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import guards, { policy } from "@razgraf/connsuite-guards";
import IconPhotoAdd from "@material-ui/icons/AddPhotoAlternateRounded";
import IconPhoto from "@material-ui/icons/InsertPhotoRounded";
import IconDelete from "@material-ui/icons/DeleteOutlineRounded";

import { components } from "../../../../../themes";
import { InputArea, InputImage, InputText, Warning, Emoji } from "../../../../atoms";
import { readPreviewFromImage, parseSkilledDescription, blur } from "../../../../../utils";

const Wrapper = styled(components.Section)`
  width: 100%;
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow: hidden;
  @media ${props => props.theme.medias.medium} {
    padding: 0;
  }
`;

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)`
  & > p {
    color: ${props => props.theme.colors.grayBlueBlack};
    margin-left: 6px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  @media ${props => props.theme.medias.medium} {
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-right: calc(${props => props.theme.sizes.edge} * 2);
  @media ${props => props.theme.medias.medium} {
    flex: none;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding-right: 0;
    padding-bottom: calc(${props => props.theme.sizes.sectionEdge} * 1);
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media ${props => props.theme.medias.medium} {
    flex: none;
    width: 100%;
  }
`;

const CoverWrapperPartial = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 300px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.background};
  @media ${props => props.theme.medias.medium} {
    height: 200px;
    width: 200px;
  }
`;

const CoverContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
`;
const Cover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;

  &:not([src]),
  &[src=""] {
    visibility: hidden;
    visibility: hidden;
  }
`;

const CoverButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 50;
  position: absolute;
  height: 60px;
  width: 60px;
  cursor: pointer;
  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 200ms;
  & > * {
    margin-top: -1px;
    margin-right: -2px;
    color: ${props => props.theme.colors.grayBlueDark};
  }
  &:hover,
  &:active {
    box-shadow: 0 2px 20px -5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 200ms;
  }
`;

const CoverPill = styled.div`
  display: flex;
  align-items: center;
  z-index: 200;
  position: absolute;
  bottom: calc(${props => props.theme.sizes.edge} * 1);
  right: calc(${props => props.theme.sizes.edge} * 1);
  height: 40px;
  padding: 0 4px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.white};
  & > * {
    margin-right: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const CoverPillAction = styled.div`
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
    &:first-child {
      cursor: default;
    }
    background-color: ${props => props.theme.colors.grayBlueLight};
    &[title="Delete"] {
      background-color: ${props => props.theme.colors.red};
      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

const CoverWarning = styled(Warning)`
  position: absolute;
  z-index: 500;
  right: calc(${props => props.theme.sizes.edge} * 0.5);
  top: calc(${props => props.theme.sizes.edge} * 0.5);
  margin: 0;
  border-radius: 2px;
  padding: ${props => props.theme.sizes.edge};
  & > p {
    padding: 8px 12px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => props.theme.colors.red};
  }
`;

const CoverWrapper = styled(CoverWrapperPartial)`
  &[data-warning="true"] {
    border-bottom: 1px solid ${props => props.theme.colors.red};
    transition: border 200ms;
  }
`;

const Form = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  grid-column-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  @media ${props => props.theme.medias.medium} {
    grid-template-columns: 1fr 1fr !important;
    grid-gap: 0;
    & > * {
      grid-column: span 2 !important;
    }
  }
`;

const Single = styled.div`
  position: relative;
  grid-column: span 2;
  & > * {
    textarea {
      min-height: 148px;
      line-height: 1.6;
    }
  }
`;

const DescriptionInterpreted = styled.div`
  position: absolute;
  z-index: 300;
  right: 0;
  top: 20px;
  width: 100%;
  max-width: 600px;
  padding: 15px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 12px 30px -15px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  opacity: 0;
  transition: opacity 250ms;
  pointer-events: none;
`;

const Preview = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  pointer-events: none;
  @media ${props => props.theme.medias.medium} {
    display: none;
  }
`;

const PreviewButton = styled.div`
  padding: 4px 14px;
  border-radius: 2px;
  background-color: ${props => props.theme.colors.grayBlueLight};
  cursor: pointer;
  pointer-events: all;
  & > p {
    margin: 0;
    font-weight: 600;
    font-size: 9pt;
    color: ${props => props.theme.colors.grayBlueDark};
  }
  &:hover,
  &:active {
    & + ${DescriptionInterpreted} {
      opacity: 1;
      transition: opacity 250ms;
    }
  }
`;

const Skill = styled.span`
  position: relative;
  font-weight: 500;
  color: ${props => props.theme.colors.orange};
`;

const SectionDivider = styled.p`
  margin: calc(${props => props.theme.sizes.edge} * 1) 0 calc(${props => props.theme.sizes.edge} * 2) 0;
  padding-top: calc(${props => props.theme.sizes.edge} * 1);
  border-top: 1px solid ${props => props.theme.colors.grayBlueLight};

  color: ${props => props.theme.colors.grayBlueBlack};
  text-align: left;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 13pt;
  font-weight: 400;

  grid-column: span 2;
`;

function Header({ className, reducer, person }) {
  const inputRef = useRef();
  const skills = useMemo(() => _.toArray(_.get(person, "skills")), [person]);
  const parts = useMemo(() => parseSkilledDescription(reducer.state.description.value, skills), [reducer, skills]);

  const onChoose = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onPictureChoose = useCallback(
    file => {
      let payload = {
        name: null,
        value: null,
        error: "File not accepted",
      };
      if (!_.isNil(file)) {
        payload = {
          name: file.name,
          value: file,
          preview: null,
          error: guards.interpret(guards.isUserPictureAcceptable, file),
        };

        if (payload.error === null)
          readPreviewFromImage(file).then(preview => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_PICTURE_PREVIEW,
              payload: preview,
            });
          });
        else
          reducer.dispatch({
            type: reducer.actions.UPDATE_PICTURE_PREVIEW,
            payload: null,
          });
      }

      reducer.dispatch({
        type: reducer.actions.UPDATE_PICTURE,
        payload,
      });
    },
    [reducer],
  );

  const onPictureDiscard = useCallback(() => {
    reducer.dispatch({
      type: reducer.actions.UPDATE_PICTURE,
      payload: reducer.initial.picture,
    });
  }, [reducer]);

  const Hidden = styled.div`
    position: absolute;
    z-index: -1;
    visibility: hidden;
    opacity: 0;
  `;
  return (
    <Wrapper className={className}>
      <SectionHeader>
        <SectionTitle>
          <p>Edit picture and details</p>
        </SectionTitle>
      </SectionHeader>
      <Content>
        <Left>
          <CoverWrapper data-warning={reducer.state.picture.error !== null}>
            <CoverContainer>
              <Cover alt="" src={reducer.state.picture.preview} />
            </CoverContainer>
            <CoverButton onClick={onChoose}>
              <IconPhotoAdd style={{ fontSize: "15pt" }} />
            </CoverButton>
            <CoverPill>
              <CoverPillAction title="Choose Picture" onClick={onChoose}>
                <IconPhoto style={{ fontSize: "13pt" }} />
              </CoverPillAction>
              <CoverPillAction title="Delete" onClick={onPictureDiscard}>
                <IconDelete style={{ fontSize: "13pt" }} />
              </CoverPillAction>
            </CoverPill>
            <CoverWarning value={reducer.state.picture.error} />
          </CoverWrapper>
          <Hidden>
            <InputImage id="manageArticleCover" label="Cover" isEventInterpreted onUpdate={onPictureChoose} inputRef={inputRef} />
          </Hidden>
        </Left>
        <Right>
          <Form columns={2}>
            <InputText
              help={{ value: policy.user.name.root }}
              id="managerFirstName"
              label="First Name"
              onUpdate={e => {
                reducer.dispatch({
                  type: reducer.actions.UPDATE_FIRST_NAME,
                  payload: {
                    value: e.target.value,
                    error: guards.interpret(guards.isNameAcceptable, e.target.value),
                  },
                });
              }}
              placeholder="John"
              value={reducer.state.firstName.value}
              warning={reducer.state.firstName.error}
            />
            <InputText
              help={{ value: policy.user.name.root }}
              id="managerLastName"
              label="Last Name"
              onUpdate={e => {
                reducer.dispatch({
                  type: reducer.actions.UPDATE_LAST_NAME,
                  payload: {
                    value: e.target.value,
                    error: guards.interpret(guards.isNameAcceptable, e.target.value),
                  },
                });
              }}
              placeholder="Doe"
              value={reducer.state.lastName.value}
              warning={reducer.state.lastName.error}
            />
            <Single>
              <InputText
                help={{ value: policy.user.tagline.root }}
                id="managerTagline"
                label="Tagline"
                onUpdate={e => {
                  reducer.dispatch({
                    type: reducer.actions.UPDATE_TAGLINE,
                    payload: {
                      value: e.target.value,
                      error: guards.interpret(guards.isUserTaglineAcceptable, e.target.value),
                    },
                  });
                }}
                placeholder="Hello!"
                value={reducer.state.tagline.value}
                warning={reducer.state.tagline.error}
              />
            </Single>
            <Single>
              <InputArea
                help={{
                  value: `Your personal description. Include some skills and a few *legendary* words about yourself. ${policy.user.description.root}`,
                }}
                id="managerDescription"
                label="Description (optional)"
                onUpdate={e => {
                  reducer.dispatch({
                    type: reducer.actions.UPDATE_DESCRIPTION,
                    payload: {
                      value: e.target.value,
                      error:
                        !_.isNil(e.target.value) && !_.isEmpty(e.target.value)
                          ? guards.interpret(guards.isUserDescriptionAcceptable, e.target.value)
                          : null,
                    },
                  });
                }}
                placeholder="e.g. My story in 500 chars... Welcome to my online business card!"
                value={reducer.state.description.value}
                warning={reducer.state.description.error}
              />
              <Preview>
                <PreviewButton onMouseEnter={blur}>
                  <p>Preview</p>
                </PreviewButton>
                <DescriptionInterpreted>
                  {parts.map(({ text, isSkill, index }) => (
                    <Fragment key={`${index}-${text}`}>
                      {isSkill ? <Skill data-id={`${index}-${text}`}>{text}</Skill> : <span>{text}</span>}
                    </Fragment>
                  ))}
                </DescriptionInterpreted>
              </Preview>
            </Single>
            <SectionDivider>
              Integrations <Emoji symbol="🔗" />
            </SectionDivider>
            <Single>
              <InputText
                help={{ value: policy.user.calendly.root }}
                id="managerCalendly"
                label="Calendly Link"
                onUpdate={e => {
                  reducer.dispatch({
                    type: reducer.actions.UPDATE_CALENDLY,
                    payload: {
                      value: e.target.value,
                      error: guards.interpret(guards.isUserCalendlyAcceptable, e.target.value),
                    },
                  });
                }}
                placeholder="https://calendly.com/username"
                value={reducer.state.calendly.value}
                warning={reducer.state.calendly.error}
              />
            </Single>
          </Form>
        </Right>
      </Content>
    </Wrapper>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  person: PropTypes.shape({}),
};

Header.defaultProps = {
  className: null,
  person: {},
};

export default Header;
