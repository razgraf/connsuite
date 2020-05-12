import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { components } from "../../../../../themes";
import { Logo, Account } from "../../atoms";

const Wrapper = styled.div`
  width: 100%;
  background: transparent;
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  height: ${props => props.theme.sizes.navHeight};
`;

export function NavProfile({ className }) {
  return (
    <Wrapper className={className}>
      <Content>Profile</Content>
    </Wrapper>
  );
}

NavProfile.propTypes = {
  className: PropTypes.string,
};

NavProfile.defaultProps = {
  className: null,
};

export default NavProfile;
