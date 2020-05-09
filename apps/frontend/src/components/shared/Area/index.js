import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten } from "polished";

import { types } from "../../../constants";
import { components } from "../../../themes";
import Nav from "../Nav";

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  position: relative;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Canvas = styled(components.Canvas)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.white};
  border-left: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
  border-right: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
  min-height: 100vh;
`;

function Area({ className, children }) {
  return (
    <Wrapper>
      <Nav type={types.nav.platform} />
      <Content className={className}>
        <Canvas>{children}</Canvas>
      </Content>
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
