import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconArrowBack from "@material-ui/icons/ArrowBackRounded";
import IconLive from "@material-ui/icons/FlashOnRounded";
import { Button, Warning } from "../../../../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2);
  margin-top: 0;
  border-top: 1px solid ${props => props.theme.colors.grayAccent};
`;

const StyledButton = styled(Button)`
  flex-shrink: 0;
  &[data-disabled="true"] {
    opacity: 0.6;
  }
`;

const StyledWarning = styled(Warning)`
  & > p {
    font-size: 11pt;
  }
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  &[data-right="true"] {
    & > * {
      color: ${props => props.theme.colors.white};
    }
  }
  & > * {
    color: ${props => props.theme.colors.grayBlueDark};
    margin-top: 1px;
  }
`;

function Footer({ className, step, onForward, onBackward, machine, isForwardEnabled }) {
  return (
    <Wrapper className={className}>
      <StyledButton
        title={_.get(step, "left")}
        childrenLeft={
          <ButtonIconWrapper>
            <IconArrowBack style={{ fontSize: "14pt" }} />
          </ButtonIconWrapper>
        }
        type={t => t.button}
        appearance={t => t.transparent}
        accent={t => t.grayBlueNight}
        onClick={onBackward}
      />
      <StyledWarning isCentered value={machine.current.context.error} />
      <StyledButton
        title={_.get(step, "right")}
        childrenLeft={
          _.get(step, "isFinal") === true && (
            <ButtonIconWrapper data-right="true">
              <IconLive style={{ fontSize: "14pt" }} />
            </ButtonIconWrapper>
          )
        }
        type={t => t.button}
        appearance={t => t.solid}
        accent={t => t.secondary}
        onClick={onForward}
        isDisabled={!isForwardEnabled}
      />
    </Wrapper>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  onForward: PropTypes.func,
  onBackward: PropTypes.func,
  step: PropTypes.shape({
    index: PropTypes.number.isRequired,
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
  }).isRequired,
  isForwardEnabled: PropTypes.bool,
};

Footer.defaultProps = {
  className: null,
  onForward: () => {},
  onBackward: () => {},
  isForwardEnabled: false,
};

export default Footer;
