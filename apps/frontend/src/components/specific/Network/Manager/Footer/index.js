import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconArrowBack from "@material-ui/icons/ArrowBackRounded";
import IconLive from "@material-ui/icons/FlashOnRounded";
import { Button } from "../../../../atoms";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 2.5);
  padding-top: 40px;
  margin-top: 0;
  border-top: 1px solid ${props => props.theme.colors.grayAccent};
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

function Footer({ className, step }) {
  return (
    <Wrapper className={className}>
      <Button
        title={_.get(step, "left")}
        childrenLeft={
          <ButtonIconWrapper>
            <IconArrowBack style={{ fontSize: "14pt" }} />
          </ButtonIconWrapper>
        }
        type={t => t.button}
        appearance={t => t.transparent}
        accent={t => t.grayBlueNight}
        onClick={_.get(step, "leftClick")}
        isDisabled={_.get(step, "leftDisabled")}
      />

      <Button
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
        onClick={_.get(step, "rightClick")}
        isDisabled={_.get(step, "rightDisabled")}
      />
    </Wrapper>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  step: PropTypes.shape({
    index: PropTypes.number.isRequired,
    left: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    leftClick: PropTypes.func.isRequired,
    rightClick: PropTypes.func.isRequired,
    leftDisabled: PropTypes.bool,
    rightDisabled: PropTypes.bool,
  }),
};

Footer.defaultProps = {
  className: null,
  step: {
    leftDisabled: false,
    rightDisabled: false,
  },
};

export default Footer;
