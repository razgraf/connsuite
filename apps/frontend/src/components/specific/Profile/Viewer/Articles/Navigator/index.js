import _ from "lodash";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconArrowDown from "@material-ui/icons/KeyboardArrowDownRounded";
import { darken } from "polished";
import { useOnClickOutside } from "../../../../../../hooks";
import { Dropdown } from "../../../../../atoms";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 0.5) calc(${props => props.theme.sizes.edge} * 2);
  background-color: ${props => props.theme.colors.grayBlueGhost};
  border-top: 1px solid ${props => props.theme.colors.grayBlueLight};
  border-bottom: 1px solid ${props => props.theme.colors.grayBlueLight};
  z-index: 250;
  @media ${props => props.theme.medias.medium} {
    padding: 0 calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    justify-content: flex-start;
  }
`;

const Title = styled.p`
  font-size: 11pt;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  margin: 0 15px 0 0;
  @media ${props => props.theme.medias.small} {
    display: none;
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
  overflow-x: auto;

  & > * {
    margin-right: 10px;
  }
  @media ${props => props.theme.medias.medium} {
    justify-content: flex-start;
    flex: none;
  }
`;

const Pill = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  min-height: 40px;
  min-width: 60px;
  padding: 0 ${props => props.theme.sizes.edge};
  border: 1px solid transparent;
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: box-shadow 100ms, background-color 100ms;
  margin-top: calc(${props => props.theme.sizes.edge} * 0.5);
  margin-bottom: calc(${props => props.theme.sizes.edge} * 0.5);
  & > p {
    font-size: 9pt;
    font-weight: 600;
    color: ${props => darken(0.1, props.theme.colors.grayBlueDark)};
    transition: color 100ms;
    margin: 0;
  }

  &[data-active="true"] {
    background-color: ${props => props.theme.colors.secondary};
    transition: background-color 100ms;
    & > p {
      color: ${props => props.theme.colors.white};
      transition: color 100ms;
      @media ${props => props.theme.medias.medium} {
        & > span[data-purpose="tag"] {
          display: none;
        }
      }
    }
  }

  &[data-active="false"] {
    &:hover,
    &:active {
      box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.15);
      transition: box-shadow 100ms;
      & > p {
        color: ${props => props.theme.colors.grayBlueBlack};
        transition: color 100ms;
      }
    }
    & > p {
      @media ${props => props.theme.medias.medium} {
        & > span:not([data-purpose="tag"]) {
          display: none;
        }
      }
    }
  }
`;

const AllPill = styled(Pill)`
  &[data-active="true"] {
    background-color: ${props => props.theme.colors.dark};
    transition: background-color 100ms;
    & > p {
      color: ${props => props.theme.colors.white};
      transition: color 100ms;
    }
  }
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 24px;
  width: 24px;
  margin-left: 10px;
  margin-right: -10px;
  border-radius: 50%;
  background: ${props => props.theme.colors.white};
  transform: rotate(0deg);
  transition: background 200ms, transform 200ms;

  &[data-active="true"] {
    transform: rotate(180deg);
    transition: transform 200ms;
  }

  & > * {
    color: ${props => darken(0.2, props.theme.colors.grayBlueDark)};
    user-select: none;
  }
`;

const SkillDropdown = styled(Dropdown)`
  top: 55px;
  right: 0;
  min-width: 180px;
`;

const SkillPillWrapper = styled.div`
  position: relative;
  display: none;
  &[data-active="true"] {
    display: flex;
  }
`;

const SkillPill = styled(Pill)`
  &[data-active="true"] {
    background-color: ${props => props.theme.colors.orange};
    transition: background-color 100ms;
    & > p {
      color: ${props => props.theme.colors.white};
      transition: color 100ms;
    }
    ${Arrow} {
      background-color: rgba(255, 255, 255, 0.2) !important;
      background-color: color 100ms;
      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

const CategoryDropdown = styled(Dropdown)`
  top: 55px;
  right: 0;
  min-width: 180px;
`;

const CategoryPillWrapper = styled.div`
  position: relative;
  display: none;
  margin-right: 10px;
  &[data-active="true"] {
    display: flex;
  }
`;

const CategoryPill = styled(Pill)`
  &[data-active="true"] {
    background-color: ${props => props.theme.colors.secondary};
    transition: background-color 100ms;
    & > p {
      color: ${props => props.theme.colors.white};
      transition: color 100ms;
    }
    ${Arrow} {
      background-color: rgba(255, 255, 255, 0.2) !important;
      background-color: color 100ms;
      & > * {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`;

function unique(source) {
  return source.filter((item, index) => source.findIndex(i => i.title === item.title) === index);
}

function Navigator({ className, categories, skills, controller }) {
  const [isDown, setIsDown] = useState(false);
  const [isCategoryDown, setIsCategoryDown] = useState(false);
  const [ref] = useOnClickOutside(() => setIsDown(false));
  const [refCategory] = useOnClickOutside(() => setIsCategoryDown(false));

  const chosen = useMemo(() => controller.get(), [controller]);
  const title = useMemo(() => {
    if (_.isNil(chosen)) return "All";
    if (_.get(chosen, "isCategory"))
      return (
        <>
          <span>Category: </span>
          {_.get(chosen, "title")}
        </>
      );
    return (
      <>
        <span>Skill: </span>
        {_.get(chosen, "title")}
      </>
    );
  }, [chosen]);

  return (
    <Wrapper className={className}>
      <Title>{title}</Title>
      <List>
        <AllPill data-active={_.isNil(chosen)} onClick={() => controller.set(null)}>
          <p>All</p>
        </AllPill>
      </List>
      <CategoryPillWrapper ref={refCategory} data-active={categories.length > 0}>
        <CategoryPill data-active={_.has(chosen, "isCategory")} onClick={() => setIsCategoryDown(!isCategoryDown)}>
          <p>
            <span data-purpose="tag">Category: </span>
            <span>{chosen && _.get(chosen, "isCategory") ? _.get(chosen, "title") : "Browse"}</span>
          </p>
          <Arrow data-active={isCategoryDown}>
            <IconArrowDown style={{ fontSize: "11pt" }} />
          </Arrow>
        </CategoryPill>
        <CategoryDropdown
          isActive={isCategoryDown}
          items={unique(categories.sort((a, b) => a.title < b.title))}
          onItemClick={category => {
            controller.set({ ...category, isCategory: true });
            setIsDown(false);
            setIsCategoryDown(false);
          }}
        />
      </CategoryPillWrapper>
      <SkillPillWrapper ref={ref} data-active={skills.length > 0}>
        <SkillPill data-active={_.has(chosen, "isSkill")} onClick={() => setIsDown(!isDown)}>
          <p>
            <span data-purpose="tag">Skill: </span>
            <span>{chosen && _.get(chosen, "isSkill") ? _.get(chosen, "title") : "Browse"}</span>
          </p>
          <Arrow data-active={isDown}>
            <IconArrowDown style={{ fontSize: "11pt" }} />
          </Arrow>
        </SkillPill>
        <SkillDropdown
          isActive={isDown}
          items={unique(skills.sort((a, b) => a.title < b.title))}
          onItemClick={item => {
            controller.set({ ...item, isSkill: true });
            setIsDown(false);
          }}
        />
      </SkillPillWrapper>
    </Wrapper>
  );
}

Navigator.propTypes = {
  className: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.shape),
  categories: PropTypes.arrayOf(PropTypes.shape),
  controller: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func,
  }).isRequired,
};

Navigator.defaultProps = {
  className: null,
  skills: [],
  categories: [],
};

export default Navigator;