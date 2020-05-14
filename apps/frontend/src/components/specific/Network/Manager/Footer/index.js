import _ from "lodash";
import React, { useMemo } from "react";
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
  &[data-loading="true"] {
    background: ${props => props.theme.gradients.gold};
  }
`;

const ButtonBox = styled.div`
  flex-shrink: 0;
  &[data-success="true"] {
    & > ${StyledButton} {
      background: ${props => props.theme.gradients.green};
    }
  }
`;

const StyledWarning = styled(Warning)`
  & > p {
    font-size: 11pt;
  }
`;

const ButtonIconWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  &[data-right="true"] {
    & > * {
      color: ${props => props.theme.colors.white};
    }
  }
  & > * {
    left: -5px;
    position: absolute;
    color: ${props => props.theme.colors.grayBlueDark};
    margin-top: 1px;
  }
`;

function Footer({ className, step, onForward, onBackward, machine, checkForward }) {
  const isForwardEnabled = useMemo(() => {
    return checkForward() && machine.current.value !== machine.states.create && machine.current.value !== machine.states.success;
  }, [checkForward, machine]);

  return (
    <Wrapper className={className}>
      <ButtonBox>
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
      </ButtonBox>
      <StyledWarning isCentered value={machine.current.context.error} />
      <ButtonBox
        data-success={machine.current.value === machine.states.success}
        onMouseEnter={() => {
          try {
            const list = document.getElementsByTagName("input");
            Array.prototype.forEach.call(list, item => item.blur());
          } catch (e) {
            console.error(e);
          }
        }}
      >
        <StyledButton
          title={_.get(step, "right")}
          childrenLeft={
            _.get(step, "isFinal") === true && (
              <ButtonIconWrapper data-right="true">
                <IconLive style={{ fontSize: "12pt" }} />
              </ButtonIconWrapper>
            )
          }
          isLoading={machine.current.value === machine.states.create}
          type={t => t.button}
          appearance={t => t.solid}
          accent={t => t.secondary}
          onClick={onForward}
          isDisabledSoft={!isForwardEnabled}
        />
      </ButtonBox>
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
  checkForward: PropTypes.func,
};

Footer.defaultProps = {
  className: null,
  onForward: () => {},
  onBackward: () => {},
  checkForward: () => false,
};

export default Footer;
