import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten } from "polished";
import { types } from "../../../constants";
import { components } from "../../../themes";
import Nav from "../Nav";
import Footer from "../Footer";
import SideBar from "../SideBar";

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  position: relative;
  min-height: 100vh;
  width: 100%;
`;

const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: ${props => props.theme.sizes.areaElevation};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${props => props.theme.colors.white};
  border-left: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
  border-right: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
  padding: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: ${props => props.theme.sizes.areaContentElevation};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  width: 100%;
  padding-top: ${props => props.theme.sizes.navHeight};
  padding-left: ${props => props.theme.sizes.sideBarWidth};

  @media ${props => props.theme.medias.small} {
    padding-top: ${props => props.theme.sizes.navHeightMobile};
    padding-left: 0;
  }
`;

const StyledSideBar = styled(SideBar)`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  z-index: ${props => props.theme.sizes.sideBarElevation};
  height: 100%;
  width: ${props => props.theme.sizes.sideBarWidth};
  border-right: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};

  & > div {
    position: sticky;
    left: auto;
    top: 0;
    width: ${props => props.theme.sizes.sideBarWidth};
  }

  @media ${props => props.theme.medias.small} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: ${props => props.theme.sizes.sideBarHeightMobile};
    border-top: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
    border-right: none;
    & > div {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
`;

const AreaFooter = styled(Footer)`
  @media ${props => props.theme.medias.small} {
    & > div {
      padding-bottom: calc(${props => props.theme.sizes.sideBarHeightMobile} + ${props => props.theme.sizes.edge} * 1) !important;
    }
  }
`;

function Area({ className, children }) {
  return (
    <Wrapper>
      <Nav type={types.nav.appearance.platform} />
      <Canvas className={className}>
        <StyledSideBar />
        <Content>{children}</Content>
      </Canvas>
      <AreaFooter />
    </Wrapper>
  );
}

Area.propTypes = {
  className: PropTypes.string,
};
Area.defaultProps = {
  className: null,
};

export default Area;
