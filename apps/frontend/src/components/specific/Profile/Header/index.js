import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import Asset from "../../../../assets/projects/project-2.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 3) calc(${props => props.theme.sizes.edge} * 2);
  background: ${props => props.theme.colors.white};
  transition: border 200ms;
`;

const Left = styled.div`
  position: relative;
  width: ${props => props.theme.sizes.profileBlob};
  height: ${props => props.theme.sizes.profileBlob};
`;

const LeftFloater = styled.div`
  position: absolute;
  left: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const LeftUnderlay = styled.div`
  z-index: 100;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const LeftUnderlayShape = styled.div`
  position: absolute;
  border-radius: 30%;
  background-color: ${props => props.theme.colors.secondary};
  transform: rotate(45deg);
  height: calc(100% - 50px);
  width: calc(100% - 50px);

  &:nth-child(2) {
    right: -10px;
    top: 10px;
    height: 70px;
    width: 70px;
    border-radius: 25px;
  }

  &:nth-child(3) {
    right: -10px;
    bottom: 20px;
    height: 50px;
    width: 50px;
    border-radius: 20px;
  }
`;

const LeftContent = styled.div`
  position: relative;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LeftImageWrapper = styled.div`
  height: calc(${props => props.theme.sizes.profileBlob} - 80px);
  width: calc(${props => props.theme.sizes.profileBlob} - 80px);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 5px 28px -6px ${props => rgba(props.theme.colors.dark, 0.2)};
`;

const LeftImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Right = styled.div`
  flex: 1;
`;

const Title = styled.p``;

const Identification = styled.div``;

const Name = styled.p``;
const Username = styled.p``;

const Divider = styled.div``;

const Description = styled.p``;

const Actions = styled.div``;

function Header({ className }) {
  return (
    <Wrapper className={className}>
      <Left>
        <LeftFloater>
          <LeftUnderlay>
            <LeftUnderlayShape />
            <LeftUnderlayShape />
            <LeftUnderlayShape />
          </LeftUnderlay>
          <LeftContent>
            <LeftImageWrapper>
              <LeftImage src={Asset} alt="" />
            </LeftImageWrapper>
          </LeftContent>
        </LeftFloater>
      </Left>
      <Right>
        <Title>Designer & Developer</Title>
        <Identification>
          <Name>Razvan Apostu</Name>
          <Username>@razgraf</Username>
        </Identification>
        <Divider />
        <Description></Description>
        <Actions></Actions>
      </Right>
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
