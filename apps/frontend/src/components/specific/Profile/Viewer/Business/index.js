import _ from "lodash";
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconContact from "@material-ui/icons/WhatshotRounded";
import IconCalendly from "@material-ui/icons/EventAvailableRounded";
import { components } from "../../../../../themes";
import { useProfileIntersection, useModal } from "../../../../../hooks";
import { types, modals, root } from "../../../../../constants";

import SectionHeader from "../SectionHeader";
import { Button, Spinner } from "../../../../atoms";
import { BusinessCard } from "../../../../shared";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 200;
  width: 100%;
  margin-top: calc(${props => props.theme.sizes.profileBusinessDistance} * -1);
`;

const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: 200;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
  @media ${props => props.theme.medias.medium} {
    padding: 0 calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
  }
`;

const Underlay = styled.div`
  position: absolute;
  z-index: 50;
  height: calc(100% - ${props => props.theme.sizes.profileBusinessDistance});
  width: 100%;
  left: 0;
  bottom: 0;
  background: ${props => props.theme.gradients.primary};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 60px;
  @media ${props => props.theme.medias.medium} {
    padding: 0;
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 460px;
  @media ${props => props.theme.medias.medium} {
    width: 100%;
  }
`;

const Right = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: calc(${props => props.theme.sizes.edge} * 3);
  padding-left: calc(${props => props.theme.sizes.edge} * 3);
  @media ${props => props.theme.medias.medium} {
    width: 100%;
    margin-top: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    grid-gap: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    padding-bottom: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    padding-left: 0;
  }

  @media ${props => props.theme.medias.small} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  min-height: 160px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 12px 48px -15px rgba(0, 0, 0, 0.2);
  grid-column: span 1;
  background: #ffffff;
`;

const CardActions = styled(Card)`
  & > * {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CardStats = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;
  position: relative;
`;

const CardStatsUnderlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;

  & > div {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.colors.grayBlueLight};

    &:first-child {
      position: absolute;
      height: calc(100% - 2 * 20px);
      width: 1px;
    }
  }
`;

const CardStatsItem = styled.div`
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90px;
`;

const CardStatsItemTitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 30pt;
  line-height: 1;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.secondary};
  text-align: center;
`;

const CardStatsItemSubtitle = styled.p`
  margin: 0;
  font-weight: 300;
  font-size: 10pt;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.grayBlueBlack};
  text-align: center;
  padding: 5px;
`;

const CardActionsTitle = styled.p`
  font-size: 11pt;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  margin: 0 0 15px 0;
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-left: -4px;
`;

function unique(source) {
  return source.filter((item, index) => source.findIndex(i => i.title === item.title) === index);
}

function Business({ className, person, onIntersect, onGetInTouchClick }) {
  const { setOpen: setShareOpen } = useModal(modals.share);
  const { ref, isObserved } = useProfileIntersection(payload => onIntersect(types.profile.section.business, payload));

  const onShareClick = useCallback(
    () =>
      setShareOpen(true, {
        url: `${root}/${_.get(person, "username")}`,
        explainer: `You can share this profile using this unique custom url: ${root}${_.get(
          person,
          "username",
        )}. 🔥😲👍 Click below to copy it to your clipboard.`,
      }),
    [person, setShareOpen],
  );

  const skillCount = useMemo(() => unique(_.toArray(_.get(person, "skills"))).length, [person]);
  const categoryCount = useMemo(() => unique(_.toArray(_.get(person, "categories"))).length, [person]);

  return (
    <Wrapper className={className} ref={ref}>
      <Canvas>
        <SectionHeader title="Business" isObserved={isObserved} />
        <Content>
          <Left>
            <BusinessCard data={person.data} networks={person.networks} username={person.username} />
          </Left>
          <Right>
            <CardStats>
              <CardStatsItem>
                {_.get(person, "isLoadingNetworks") ? (
                  <Spinner color={c => c.secondary} />
                ) : (
                  <>
                    <CardStatsItemTitle>{_.toArray(_.get(person, "networks")).length}</CardStatsItemTitle>
                    <CardStatsItemSubtitle>Networks</CardStatsItemSubtitle>
                  </>
                )}
              </CardStatsItem>
              <CardStatsItem>
                {_.get(person, "isLoadingArticles") ? (
                  <Spinner color={c => c.secondary} />
                ) : (
                  <>
                    <CardStatsItemTitle>{_.toArray(_.get(person, "articles")).length}</CardStatsItemTitle>
                    <CardStatsItemSubtitle>Articles</CardStatsItemSubtitle>
                  </>
                )}
              </CardStatsItem>
              <CardStatsItem>
                {_.get(person, "isLoadingProfile") ? (
                  <Spinner color={c => c.secondary} />
                ) : (
                  <>
                    <CardStatsItemTitle>{skillCount}</CardStatsItemTitle>
                    <CardStatsItemSubtitle>Showcased Skills</CardStatsItemSubtitle>
                  </>
                )}
              </CardStatsItem>
              <CardStatsItem>
                {_.get(person, "isLoadingProfile") ? (
                  <Spinner color={c => c.secondary} />
                ) : (
                  <>
                    <CardStatsItemTitle>{categoryCount}</CardStatsItemTitle>
                    <CardStatsItemSubtitle>Categories</CardStatsItemSubtitle>
                  </>
                )}
              </CardStatsItem>
              <CardStatsUnderlay>
                <div />
                <div />
              </CardStatsUnderlay>
            </CardStats>
            <CardActions>
              <CardActionsTitle>Actions</CardActionsTitle>
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
                onClick={onGetInTouchClick}
                isFullWidth
              />
              <Button
                appearance={t => t.solid}
                accent={t => t.grayBlueNormal}
                title="Share business card"
                type={t => t.button}
                onClick={onShareClick}
                isFullWidth
              />
              {_.get(person, "profile.user.calendly") && (
                <Button
                  appearance={t => t.solid}
                  accent={t => t.dark}
                  childrenLeft={
                    <ButtonIconWrapper>
                      <IconCalendly style={{ fontSize: "14pt" }} />
                    </ButtonIconWrapper>
                  }
                  title="Book a Meeting"
                  type={t => t.link}
                  to={_.get(person, "profile.user.calendly")}
                  isFullWidth
                />
              )}
            </CardActions>
          </Right>
        </Content>
      </Canvas>
      <Underlay />
    </Wrapper>
  );
}

Business.propTypes = {
  className: PropTypes.string,
  person: PropTypes.shape({
    skills: PropTypes.arrayOf(PropTypes.shape),
    categories: PropTypes.arrayOf(PropTypes.shape),
    networks: PropTypes.arrayOf(PropTypes.shape),
    data: PropTypes.shape({}),
    username: PropTypes.string,

    isLoadingArticles: PropTypes.bool,
    isLoadingNetworks: PropTypes.bool,
    isLoadingProfile: PropTypes.bool,
  }),
  onIntersect: PropTypes.func,
  onGetInTouchClick: PropTypes.func,
};

Business.defaultProps = {
  className: null,
  onIntersect: () => {},
  person: {
    skills: [],
    categories: [],
    networks: [],
    data: {},
    username: null,

    isLoadingArticles: true,
    isLoadingNetworks: true,
    isLoadingProfile: true,
  },
  onGetInTouchClick: () => {},
};

export default Business;
