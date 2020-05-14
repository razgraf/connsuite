import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  margin-bottom: 0;
  border-bottom: 1px solid ${props => props.theme.colors.grayAccent};
`;

const StepWrapperPartial = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StepIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  margin-right: 10px;
  background-color: ${props => props.theme.colors.grayBlueDark};
  border-radius: 50%;
  transition: background-color 200ms;
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;

const StepTitle = styled.p`
  font-size: 11pt;
  font-weight: 500;
  transition: color 0.2s;
  margin: 0;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueDark};
  transition: color 200ms;
`;

const Divider = styled.div`
  background-color: ${props => props.theme.colors.grayClear};
  margin: 0 calc(${props => props.theme.sizes.edge} * 2);
  width: 50px;
  height: 1px;
`;

const StepWrapper = styled(StepWrapperPartial)`
  &[data-active="true"] {
    ${StepIcon} {
      background-color: ${props => props.theme.colors.secondary};
      transition: background-color 200ms;
    }
    ${StepTitle} {
      color: ${props => props.theme.colors.secondary};
      transition: color 200ms;
    }
    & + ${Divider} {
      background-color: ${props => props.theme.colors.secondary};
      transition: background-color 200ms;
    }
  }
`;

function Step({ Icon, index, hasDivider, isActive, onClick, title }) {
  return (
    <StepWrapper data-active={isActive} onClick={onClick}>
      <StepIcon>
        <Icon style={{ fontSize: "15pt" }} />
      </StepIcon>
      <StepTitle>
        {index}. {title}
      </StepTitle>
      {hasDivider && <Divider />}
    </StepWrapper>
  );
}

function Header({ step, setStep, source }) {
  return (
    <Wrapper>
      {Object.values(source).map((item, _index) => (
        <Step
          {...item}
          key={item.index}
          isActive={item.index === step}
          hasDivider={_index + 1 < Object.values(source).length}
          onClick={() => setStep(item)}
        />
      ))}
    </Wrapper>
  );
}

Step.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  hasDivider: PropTypes.bool,
  onClick: PropTypes.func,
};

Step.defaultProps = {
  isActive: false,
  hasDivider: false,
  onClick: () => {},
};

Header.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  source: PropTypes.shape({}).isRequired,
};

Header.defaultProps = {
  step: 0,
  setStep: () => {},
};

export default Header;
