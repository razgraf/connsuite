import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const WrapperPartial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: calc(3 * ${props => props.theme.sizes.edge});
  width: 100%;
`;

const Content = styled.div`
  color: ${props => props.theme.colors.dark};
  line-height: 1.4;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 600;
  font-size: ${props => props.theme.sizes.sectionTitle};
  @media ${props => props.theme.medias.small} {
    text-align: center;
  }
`;

const Wrapper = styled(WrapperPartial)`
  ${props =>
    props.isLight &&
    css`
      & > ${Content} {
        color: ${props.theme.colors.white};
      }
    `}
`;

function Title({ children, isLight, value }) {
  return (
    <Wrapper isLight={isLight}>
      <Content>{children || value}</Content>
    </Wrapper>
  );
}

Title.propTypes = {
  value: PropTypes.string,
  isLight: PropTypes.bool,
};

Title.defaultProps = {
  value: null,
  isLight: false,
};

export default Title;
