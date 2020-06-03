import _ from "lodash";
import React, { useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import IconContact from "@material-ui/icons/WhatshotRounded";
import Asset from "../../../../assets/projects/project-2.png";
import Skill from "./Skill";
import { useDefaultSkills } from "../../../../hooks";
import { Button } from "../../../atoms";

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
  align-items: flex-start;
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
  padding-left: calc(${props => props.theme.sizes.edge} * 3);
  padding-top: calc(${props => props.theme.sizes.edge} * 2);
`;

const Title = styled.p`
  max-width: 800px;
  width: auto;
  margin: 0 0 15px 0;
  text-align: left;
  font-size: 32pt;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  font-weight: 700;
`;

const Identification = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Name = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  font-size: 15pt;
  font-weight: 600;
  margin: 0 5px 0 0;
`;
const Username = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.secondary};
  font-size: 15pt;
  font-weight: 600;
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.grayBlueLight};
  margin: calc(${props => props.theme.sizes.edge} * 2) 0;
`;

const Description = styled.p`
  font-weight: 300;
  line-height: 1.7;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 11pt;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: calc(${props => props.theme.sizes.edge} * 2);
  & > * {
    margin-right: ${props => props.theme.sizes.edge};
    &:last-child {
      margin-right: 0;
    }
  }
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-left: -4px;
`;

function interpret(description, list) {
  if (_.isNil(list) || _.isNil(description)) return [];
  const sorted = list.map(s => s.title).sort((a, b) => b.length - a.length);
  let parts = [{ text: description }];

  sorted.forEach(skill => {
    let result = [];
    parts.forEach(({ text, isSkill }) => {
      if (isSkill) result.push({ text, isSkill });
      else {
        const split = text.split(skill);
        if (split.length === 1) result.push({ text });
        if (split.length > 1) {
          const found = split.reduce((acc, val) => acc.concat({ text: val }, { text: skill, isSkill: true }), []).slice(0, -1);
          result = result.concat(found);
        }
      }
    });
    parts = [...result].map((part, index) => ({ ...part, key: index }));
  });

  return parts;
}

const source =
  "Hi! Lorem ipsum dolor sit amet React consectetur adipiscing elit. Nunc React Native varius nulla ut tortor accumsan faucibus. Donec semper eget justo sit amet fermentum. Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.  Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. Node Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci. <br/> Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.  Vivamus sed tellus fermentum, convallis nisi eget, imperdiet orci.";

function Header({ className }) {
  const skills = useDefaultSkills();
  const parts = useMemo(() => interpret(source, skills.list), [skills]);

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
        <Description>
          {parts.map(({ text, isSkill, index }) => (
            <Fragment key={`${index}-${text}`}>{isSkill ? <Skill title={text} /> : <span>{text}</span>}</Fragment>
          ))}
        </Description>
        <Actions>
          <Button
            appearance={t => t.solid}
            accent={t => t.secondary}
            childrenLeft={
              <ButtonIconWrapper>
                <IconContact style={{ fontSize: "14pt" }} />
              </ButtonIconWrapper>
            }
            title="Get in touch"
            type={t => t.button}
            onClick={() => console.log("click")}
          />
        </Actions>
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
