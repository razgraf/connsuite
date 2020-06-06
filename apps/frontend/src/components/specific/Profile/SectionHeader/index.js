import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Spinner } from "../../../atoms";

const WrapperPartial = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2) 0;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  padding-right: calc(${props => props.theme.sizes.edge});
`;

const Title = styled.p`
  position: relative;
  margin: 0;
  font-size: 16pt;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};

  &:after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 2px;
    width: 50%;
    background-color: ${props => props.theme.colors.dark};
  }
`;

const Wrapper = styled(WrapperPartial)`
  &[data-observed="true"] {
    ${Title} {
      &:after {
        transform: translateX(0);
        transition: transform 300ms 500ms;
      }
    }
  }
  &[data-observed="false"] {
    ${Title} {
      &:after {
        transform: translateX(80%);
        transition: transform 300ms;
      }
    }
  }
`;

const StyledSpinner = styled(Spinner)`
  margin-bottom: -3px;
`;

function SectionHeader({ className, children, title, isObserved, isLoading }) {
  return (
    <Wrapper className={className} data-observed={isObserved}>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <StyledSpinner color={c => c.secondary} isVisible={isLoading} />
      {children}
    </Wrapper>
  );
}

SectionHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isObserved: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SectionHeader.defaultProps = {
  className: null,
  isObserved: false,
  isLoading: false,
};

export default SectionHeader;
