import _ from "lodash";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useRouter } from "next/router";
import IconContact from "@material-ui/icons/WhatshotRounded";
import Asset from "../../../../assets/projects/project-2.png";
import Skill from "./Skill";
import { parseFullName, getPrimaryUsername } from "../../../../utils";
import { types } from "../../../../constants";
import { Button } from "../../../atoms";
import { useIntersection } from "../../../../hooks";

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
  transform: translateX(0);
  height: calc(100% - 30px);
  width: calc(100% - 30px);
  transition: transform 600ms;

  &:after {
    content: "";
    position: absolute;
    border-radius: 30%;
    background-color: ${props => props.theme.colors.secondary};
    height: calc(100%);
    width: calc(100%);
    transform: rotate(45deg);
    transition: transform 600ms;
  }

  &[data-observed="false"] {
    transform: translateX(-60px);
    transition: transform 1100px;
    &:after {
      transform: rotate(60deg);
      transition: transform 600ms;
    }
  }

  &:nth-child(2) {
    right: -20px;
    top: 10px;
    height: 70px;
    width: 70px;
    border-radius: 25px;
    transition: transform 600ms;
    &[data-observed="false"] {
      transform: translateX(-50px);
      transition: transform 1000ms;
    }
  }

  &:nth-child(3) {
    right: -30px;
    bottom: 20px;
    height: 60px;
    width: 60px;
    border-radius: 20px;
    transition: transform 600ms;
    &[data-observed="false"] {
      transform: translateX(-20px);
      transition: transform 1000ms;
    }
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
  box-shadow: 0 5px 40px -6px ${props => rgba(props.theme.colors.dark, 0.2)};
`;

const LeftImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  user-select: none;
  opacity: 0;

  &:not([src]),
  &[src=""] {
    visibility: hidden;
  }
  &[data-loaded="true"] {
    opacity: 1;
    transition: opacity 300ms;
  }
`;

const Right = styled.div`
  flex: 1;
  padding-left: calc(${props => props.theme.sizes.edge} * 3);
  padding-top: calc(${props => props.theme.sizes.edge} * 2);
`;

const RightContent = styled.div`
  width: 100%;
  opacity: 0;
  padding-right: calc(${props => props.theme.sizes.edge} * 1);
  transform: translateX(50px);

  &[data-ready="true"] {
    opacity: 1;
    transform: translateX(0);
    transition: transform 300ms, opacity 300ms 100ms;
  }
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

function Header({ className, controller, profile, isLoading }) {
  const skills = useMemo(() => _.toArray(_.get(profile, "skills")), [profile]);
  const description = useMemo(() => _.toString(_.get(profile, "user.description")), [profile]);
  const name = useMemo(() => parseFullName(profile), [profile]);
  const username = useMemo(() => getPrimaryUsername(_.get(profile, "user")), [profile]);
  const parts = useMemo(() => interpret(description, skills), [description, skills]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [ref, entry] = useIntersection({
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.9,
  });

  const router = useRouter();

  const isObserved = useMemo(() => entry.intersectionRatio >= 0.9, [entry.intersectionRatio]);
  const onSkillClick = useCallback(
    skill => {
      controller.set({ ...skill, isSkill: true });
      router.push(router.pathname, `${router.asPath}#${types.profile.section.articles}`, { shallow: true });
    },
    [controller, router],
  );

  return (
    <Wrapper className={className} ref={ref}>
      <Left>
        <LeftFloater>
          <LeftUnderlay>
            <LeftUnderlayShape data-observed={isObserved} />
            <LeftUnderlayShape data-observed={isObserved} />
            <LeftUnderlayShape data-observed={isObserved} />
          </LeftUnderlay>
          <LeftContent>
            <LeftImageWrapper>
              <LeftImage src={Asset} alt="" onLoad={() => setIsImageLoaded(true)} data-loaded={isImageLoaded} />
            </LeftImageWrapper>
          </LeftContent>
        </LeftFloater>
      </Left>
      <Right>
        <RightContent data-ready={!isLoading}>
          <Title>Designer & Developer</Title>
          <Identification>
            <Name>{name}</Name>
            <Username>{`@${username}`}</Username>
          </Identification>
          <Divider />
          <Description>
            {parts.map(({ text, isSkill, index }) => (
              <Fragment key={`${index}-${text}`}>
                {isSkill ? <Skill title={text} onClick={() => onSkillClick({ title: text })} /> : <span>{text}</span>}
              </Fragment>
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
        </RightContent>
      </Right>
    </Wrapper>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  controller: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func,
  }).isRequired,
  profile: PropTypes.shape({
    skills: PropTypes.arrayOf(PropTypes.shape),
    user: PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.shape({
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      usernames: PropTypes.arrayOf(PropTypes.shape),
    }),
  }),
  isLoading: PropTypes.bool,
};

Header.defaultProps = {
  className: null,
  profile: {},
  isLoading: true,
};

export default Header;
