import _ from "lodash";
import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import guards from "@connsuite/guards";
import IconPhotoAdd from "@material-ui/icons/AddPhotoAlternateRounded";
import IconPhoto from "@material-ui/icons/InsertPhotoRounded";
import IconHelp from "@material-ui/icons/HelpRounded";
import IconDelete from "@material-ui/icons/DeleteOutlineRounded";
import { Helper, InputImage, Warning } from "../../../../atoms";
import { readPreviewFromImage } from "../../../../../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  background: ${props => props.theme.colors.white};
  transition: border 200ms;
`;

const CoverWrapperPartial = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.grayBlueGhost};
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
  transform: scale(1.1);
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
  bottom: calc(${props => props.theme.sizes.edge} * 1.5);
  right: calc(${props => props.theme.sizes.edge} * 1.5);
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

const ThumbnailWrapper = styled.div`
  z-index: 200;
  position: absolute;
  left: calc(${props => props.theme.sizes.edge} * 1.5);
  bottom: calc(${props => props.theme.sizes.edge} * -1.5);
  width: 340px;
  height: 280px;
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  background-color: ${props => props.theme.colors.grayBlueGhost};
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e4e8f0' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  transition: border 200ms;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  object-fit: cover;
  user-select: none;

  &:not([src]),
  &[src=""] {
    visibility: hidden;
    visibility: hidden;
  }
`;

const Hidden = styled.div`
  position: absolute;
  z-index: -1;
  visibility: hidden;
  opacity: 0;
`;

const CoverWrapper = styled(CoverWrapperPartial)`
  &[data-warning="true"] {
    border-bottom: 1px solid ${props => props.theme.colors.red};
    transition: border 200ms;
    ${ThumbnailWrapper} {
      border-bottom: 1px solid ${props => props.theme.colors.red};
      transition: border 200ms;
    }
  }
`;

function Header({ className, reducer }) {
  const inputRef = useRef();

  const onChoose = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onArticleCoverChoose = useCallback(
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
          error: guards.interpret(guards.isArticleCoverAcceptable, file),
        };

        console.log(payload);

        if (payload.error === null)
          readPreviewFromImage(file).then(preview => {
            reducer.dispatch({
              type: reducer.actions.UPDATE_COVER_PREVIEW,
              payload: preview,
            });
          });
        else
          reducer.dispatch({
            type: reducer.actions.UPDATE_COVER_PREVIEW,
            payload: null,
          });
      }

      reducer.dispatch({
        type: reducer.actions.UPDATE_COVER,
        payload,
      });
    },
    [reducer],
  );

  const onArticleCoverDiscard = useCallback(() => {
    reducer.dispatch({
      type: reducer.actions.UPDATE_COVER,
      payload: reducer.initial.cover,
    });
  }, [reducer]);

  return (
    <Wrapper className={className}>
      <CoverWrapper data-warning={reducer.state.cover.error !== null}>
        <CoverContainer>
          <Cover alt="" src={reducer.state.cover.preview} />
        </CoverContainer>
        <CoverButton onClick={onChoose}>
          <IconPhotoAdd style={{ fontSize: "15pt" }} />
        </CoverButton>
        <CoverPill>
          <Helper
            force="left"
            value="The *single* uploaded image will be used for both a preview and a cover image of the article. The boxes are here to offer a glimpse of how the image will look resized."
          >
            <CoverPillAction>
              <IconHelp style={{ fontSize: "13pt" }} />
            </CoverPillAction>
          </Helper>
          <CoverPillAction title="Choose Picture" onClick={onChoose}>
            <IconPhoto style={{ fontSize: "13pt" }} />
          </CoverPillAction>
          <CoverPillAction title="Delete" onClick={onArticleCoverDiscard}>
            <IconDelete style={{ fontSize: "13pt" }} />
          </CoverPillAction>
        </CoverPill>
        <ThumbnailWrapper>
          <Thumbnail alt="" src={reducer.state.cover.preview} />
        </ThumbnailWrapper>
        <CoverWarning value={reducer.state.cover.error} />
      </CoverWrapper>
      <Hidden>
        <InputImage id="manageArticleCover" label="Cover" isEventInterpreted onUpdate={onArticleCoverChoose} inputRef={inputRef} />
      </Hidden>
    </Wrapper>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  className: null,
};

export default Header;
