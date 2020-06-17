import _ from "lodash";
import React, { Fragment, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useRouter } from "next/router";
import IconContact from "@material-ui/icons/WhatshotRounded";
import IconCalendly from "@material-ui/icons/EventAvailableRounded";
import ProfilePictureFallback from "../../../../../assets/images/profile_fallback.jpg";
import Skill from "./Skill";
import { parseFullName, getPrimaryUsername, parseSkilledDescription } from "../../../../../utils";
import { types } from "../../../../../constants";
import { Button } from "../../../../atoms";
import { useIntersection } from "../../../../../hooks";

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
  @media ${props => props.theme.medias.medium} {
    padding-top: calc(${props => props.theme.sizes.sectionEdgeMobile} * 2);
    padding-left: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    padding-right: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    padding-bottom: 0;
  }
  @media ${props => props.theme.medias.medium} {
    flex-direction: column;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      height: 120px;
      width: 100%;
      content: "";
      background-color: ${props => props.theme.colors.grayBlueGhost};
      z-index: -1;
    }
  }
`;

const Left = styled.div`
  position: relative;
  width: ${props => props.theme.sizes.profileBlob};
  height: ${props => props.theme.sizes.profileBlob};
  @media ${props => props.theme.medias.medium} {
    width: 100%;
    height: auto;
    padding: 0;
    margin-top: calc(${props => props.theme.sizes.sectionEdgeMobile} * 2);
    margin-bottom: calc(${props => props.theme.sizes.sectionEdgeMobile} * 2);
  }
`;

const LeftFloater = styled.div`
  position: absolute;
  left: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  @media ${props => props.theme.medias.medium} {
    position: relative;
    left: auto;
    right: auto;
    align-items: flex-start;
    justify-content: flex-start;
  }
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
  @media ${props => props.theme.medias.medium} {
    display: none;
  }
`;

const LeftContent = styled.div`
  position: relative;
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  @media ${props => props.theme.medias.medium} {
    justify-content: flex-start;
  }
`;

const LeftImageWrapper = styled.div`
  height: calc(${props => props.theme.sizes.profileBlob} - 80px);
  width: calc(${props => props.theme.sizes.profileBlob} - 80px);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 5px 40px -6px ${props => rgba(props.theme.colors.dark, 0.2)};

  @media ${props => props.theme.medias.medium} {
    height: calc(${props => props.theme.sizes.profileBlobMobile} - 80px);
    width: calc(${props => props.theme.sizes.profileBlobMobile} - 80px);
    border-radius: 6px;
    background-color: ${props => props.theme.colors.white};
    box-shadow: 0 5px 30px -6px ${props => rgba(props.theme.colors.dark, 0.15)};
  }
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
  @media ${props => props.theme.medias.medium} {
    padding: 0;
    margin-right: auto;
  }
`;

const RightContent = styled.div`
  width: 100%;
  opacity: 0;
  padding-right: calc(${props => props.theme.sizes.edge} * 1);
  transform: translateX(50px);

  &[data-ready="true"] {
    opacity: 1;
    transform: translateX(0);
    transition: transform 300ms, opacity 150ms;
  }

  @media ${props => props.theme.medias.medium} {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
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
  @media ${props => props.theme.medias.medium} {
    text-align: left;
    max-width: 100%;
    font-size: 24pt;
    margin: 0 0 15px 0;
    order: 0;
  }
`;

const Identification = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media ${props => props.theme.medias.medium} {
    flex-direction: column;
    align-items: flex-start;
    order: 1;
  }
`;

const Name = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  font-size: 18pt;
  font-weight: 600;
  margin: 0 5px 0 0;
  @media ${props => props.theme.medias.medium} {
    margin: 0 0 8px 0;
    font-size: 12pt;
    font-weight: 400;
  }
`;
const Username = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.secondary};
  font-size: 15pt;
  font-weight: 600;
  margin: 0;
  @media ${props => props.theme.medias.medium} {
    font-size: 12pt;
    font-weight: 400;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.grayBlueLight};
  margin: calc(${props => props.theme.sizes.edge} * 2) 0;
  @media ${props => props.theme.medias.medium} {
    margin: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1.5) 0;
    order: 4;
  }
`;

const Description = styled.p`
  font-weight: 300;
  line-height: 1.7;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 11pt;
  @media ${props => props.theme.medias.medium} {
    text-align: left;
    margin: 0;
    order: 5;
  }
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
  @media ${props => props.theme.medias.medium} {
    width: 100%;
    position: relative;
    text-align: left;
    margin: 0;
    order: 3;
    justify-content: flex-end;
    max-width: 600px;
  }
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-left: -4px;
`;

const ButtonGetInTouch = styled(Button)`
  @media ${props => props.theme.medias.medium} {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    ${ButtonIconWrapper} {
      margin: 0;
      padding: 3px;
      width: auto;
    }
    *[data-component="title"] {
      display: none;
    }
  }
`;

const ButtonCalendly = styled(Button)`
  @media ${props => props.theme.medias.medium} {
    position: absolute;
    right: 64px;
    bottom: 0;
    ${ButtonIconWrapper} {
      margin: 0;
      padding: 3px;
      width: auto;
    }
    *[data-component="title"] {
      display: none;
    }
  }
`;

function Header({ className, controller, profile, description, isLoading, onGetInTouchClick }) {
  const skills = useMemo(() => _.toArray(_.get(profile, "skills")), [profile]);
  const tagline = useMemo(() => _.toString(_.get(profile, "user.tagline")), [profile]);
  const name = useMemo(() => parseFullName(profile), [profile]);
  const username = useMemo(() => getPrimaryUsername(_.get(profile, "user")), [profile]);
  const parts = useMemo(() => parseSkilledDescription(description, skills), [description, skills]);

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

  const picture = useMemo(() => (isLoading ? null : _.get(profile, "user.picture.url") || ProfilePictureFallback), [profile, isLoading]);

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
              <LeftImage src={picture} alt="" onLoad={() => setIsImageLoaded(true)} data-loaded={isImageLoaded} />
            </LeftImageWrapper>
          </LeftContent>
        </LeftFloater>
      </Left>
      <Right>
        <RightContent data-ready={!isLoading}>
          <Title>{tagline}</Title>
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
            <ButtonGetInTouch
              appearance={t => t.solid}
              accent={t => t.secondary}
              childrenLeft={
                <ButtonIconWrapper>
                  <IconContact style={{ fontSize: "14pt" }} />
                </ButtonIconWrapper>
              }
              title="Get in touch"
              titleShort=""
              type={t => t.button}
              onClick={onGetInTouchClick}
            />
            {_.get(profile, "user.calendly") && (
              <ButtonCalendly
                appearance={t => t.solid}
                accent={t => t.dark}
                childrenLeft={
                  <ButtonIconWrapper>
                    <IconCalendly style={{ fontSize: "14pt" }} />
                  </ButtonIconWrapper>
                }
                title="Book a meeting"
                titleShort=""
                type={t => t.link}
                to={_.get(profile, "user.calendly")}
              />
            )}
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
  onGetInTouchClick: PropTypes.func,
  description: PropTypes.string,
};

Header.defaultProps = {
  className: null,
  profile: {},
  isLoading: true,
  onGetInTouchClick: () => {},
  description: "",
};

export default Header;
