import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { types } from "../../../../../constants";
import { Button } from "../../../../atoms;

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


function Footer({ step}) {
  return (
    <Wrapper>
        <Button

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
  })
};

Footer.defaultProps = {
  className: null,
}

export default Footer;
