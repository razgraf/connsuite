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
`;

const Content = styled.div`
  position: relative;
  z-index: ${props => props.theme.sizes.areaContentElevation};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  flex: 1;
  padding: calc(${props => props.theme.sizes.navHeight} + ${props => props.theme.sizes.edge}) ${props => props.theme.sizes.edge}
    ${props => props.theme.sizes.edge} calc(${props => props.theme.sizes.sideBarWidth} + ${props => props.theme.sizes.edge});
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

  & > div {
    position: sticky;
    left: auto;
    top: 0;
    width: ${props => props.theme.sizes.sideBarWidth};
  }
`;

function Area({ className, children }) {
  return (
    <Wrapper>
      <Nav type={types.nav.platform} />
      <Canvas className={className}>
        <StyledSideBar />
        <Content>{children}</Content>
      </Canvas>
      <Footer />
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
