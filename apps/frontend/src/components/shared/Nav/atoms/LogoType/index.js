import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AssetLogoType from "../../../../../assets/logo/logo_horiz_white.png";

const Wrapper = styled.div`
  height: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge} - 2 * 10px);
  width: auto;
  cursor: pointer;
  @media ${props => props.theme.medias.mobile} {
    height: calc(${props => props.theme.sizes.navHeightMobile} - 2 * ${props => props.theme.sizes.navVerticalEdge} - 2 * 10px);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;

function LogoType({ className, onClick }) {
  return (
    <Wrapper className={className} onClick={onClick}>
      <Container>
        <Image src={AssetLogoType} alt="" />
      </Container>
    </Wrapper>
  );
}

LogoType.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

LogoType.defaultProps = {
  className: null,
  onClick: () => {},
};

export default LogoType;
