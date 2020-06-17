import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Spinner } from "../../../../atoms";

const Wrapper = styled.div`
  position: relative;
  z-index: 100;
  height: calc(${props => props.theme.sizes.articleCoverHeight} + 100px);
  width: 100%;
  background: ${props => props.theme.colors.background};
  margin-top: ${props => props.theme.sizes.navHeight};
  @media ${props => props.theme.medias.small} {
    margin-top: ${props => props.theme.sizes.navHeightMobile};
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  height: 100%;
  padding-bottom: 30px;
  width: 100%;
  top: 0;
  left: 0;
`;

const Image = styled.img`
  z-index: 100;
  position: relative;
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: 0;
  /* transition: opacity 300ms; */
  &[data-active="true"] {
    opacity: 1;
    /* transition: opacity 300ms; */
  }
`;

function Header({ className, cover }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <Wrapper className={className}>
      <Loader>
        <Spinner color={c => c.grayBlueDark} size={40} thickness={2} />
      </Loader>
      <Image src={cover} data-active={!isLoadingImage} onLoad={() => setIsLoadingImage(false)} />
    </Wrapper>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: null,
};

export default Header;
