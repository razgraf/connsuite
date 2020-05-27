import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconPhotoAdd from "@material-ui/icons/AddPhotoAlternateRounded";
import IconPhoto from "@material-ui/icons/InsertPhotoRounded";
import IconHelp from "@material-ui/icons/HelpRounded";
import IconDelete from "@material-ui/icons/DeleteOutlineRounded";
import { Helper } from "../../../../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
`;

const CoverWrapper = styled.div`
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

const Cover = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  transform: scale(1.1);
  filter: blur(3px);
  transition: filter 2000ms;

  &:not([src]),
  &[src=""] {
    visibility: hidden;
    visibility: hidden;
    filter: blur(0);
    transition: filter 2000ms;
  }
`;

const CoverButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 200;
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
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;

  &:not([src]),
  &[src=""] {
    visibility: hidden;
    visibility: hidden;
  }
`;

function Header({ className, reducer }) {
  return (
    <Wrapper className={className}>
      <CoverWrapper>
        <Cover />
        <CoverButton>
          <IconPhotoAdd style={{ fontSize: "14pt" }} />
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
          <CoverPillAction title="Choose Picture" onClick={() => console.log("Choose")}>
            <IconPhoto style={{ fontSize: "13pt" }} />
          </CoverPillAction>
          <CoverPillAction title="Delete" onClick={() => console.log("Delete")}>
            <IconDelete style={{ fontSize: "13pt" }} />
          </CoverPillAction>
        </CoverPill>
        <ThumbnailWrapper>
          <Thumbnail />
        </ThumbnailWrapper>
      </CoverWrapper>
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
