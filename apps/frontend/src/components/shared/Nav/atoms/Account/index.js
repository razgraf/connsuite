import React, { useMemo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import IconArrowDown from "@material-ui/icons/KeyboardArrowDownRounded";
import AssetLogoCircle from "../../../../../assets/logo/logo.png";
import { pages } from "../../../../../constants";
import { useOnClickOutside } from "../../../../../hooks";
import { parseFullName } from "../../../../../utils";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(${props => props.theme.sizes.navHeight} - ${props => props.theme.sizes.navVerticalEdge} * 2);
`;

const Content = styled.div`
  position: relative;
  z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: auto;
  min-width: 160px;
  padding: 6px;
  background: #ffffff;
  border-radius: 100px;
  border: 1px solid transparent;
`;

const ImageWrapper = styled.div`
  height: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge} - 6px * 2);
  width: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge} - 6px * 2);
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.grayLight};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  &:not([src]),
  &[src=""] {
    visibility: hidden;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  height: 100%;
  flex: 1;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2 / 3);
`;

const Label = styled.p`
  font-weight: 700;
  font-size: 8.5pt;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.secondary};
  margin: 0 0 1px 0;
`;

const Name = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 11pt;
  line-height: 1.4;
  color: ${props => props.theme.colors.grayBlueBlack};
  font-weight: 400;
  margin: 0;
`;

const Action = styled.div`
  margin: 0 calc(${props => props.theme.sizes.edge} * 1 / 3) 0 0;
`;

const ActionDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: ${props => props.theme.colors.white};
  transform: rotate(0deg);
  transition: background 200ms, transform 200ms;

  &:hover,
  &:active {
    background: ${props => props.theme.colors.grayBlueLight};
    transition: background 200ms, transform 200ms;
  }

  &[data-active="true"] {
    transform: rotate(180deg);
    transition: transform 200ms;
  }

  & > * {
    color: ${props => props.theme.colors.grayBlueBlack};
    user-select: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc((${props => props.theme.sizes.navHeight} - ${props => props.theme.sizes.navVerticalEdge} * 1) + 5px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 180px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueLight};
  box-shadow: 0 12px 48px -15px rgba(0, 0, 0, 0.3);

  pointer-events: none;
  opacity: 0;
  overflow: hidden;
  transform: translateY(-20px);
  transition: opacity 100ms, transform 100ms;

  &[data-active="true"] {
    pointer-events: all;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 100ms, transform 100ms;
  }
`;

const DropdownItemWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: ${props => props.theme.sizes.edge};
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.grayLight};
  }
  &[data-active="true"] {
    & > * {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const DropdownItemTitle = styled.p`
  margin: 0;
  flex: 1;
  font-size: 10pt;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.colors.grayBlueBlack};
`;

function DropdownItem({ root, title, isActive }) {
  return (
    <Link href={root}>
      <DropdownItemWrapper data-active={isActive}>
        <DropdownItemTitle>{title}</DropdownItemTitle>
      </DropdownItemWrapper>
    </Link>
  );
}

function Account({ className }) {
  const router = useRouter();
  const auth = useSelector(state => state.auth);

  const [isDown, setIsDown] = useState(false);
  const [ref] = useOnClickOutside(() => setIsDown(false));

  const name = useMemo(() => parseFullName(auth), [auth]);

  return (
    <Wrapper className={className}>
      <Content data-component="pill">
        <ImageWrapper>
          <Image src={AssetLogoCircle} alt="" />
        </ImageWrapper>
        <Main>
          <Label>ConnSuite</Label>
          <Name>{name}</Name>
        </Main>
        <Action>
          <ActionDropdown data-active={isDown} onClick={() => setIsDown(!isDown)}>
            <IconArrowDown style={{ fontSize: "11pt" }} />
          </ActionDropdown>
        </Action>
      </Content>
      <Dropdown ref={ref} data-active={isDown}>
        {[pages.profile, pages.dashboard, pages.about].map(item => (
          <DropdownItem {...item} key={item.title} isActive={router.pathname === item.root} />
        ))}
      </Dropdown>
    </Wrapper>
  );
}

export default Account;

Account.propTypes = {
  className: PropTypes.string,
};
Account.defaultProps = {
  className: null,
};

DropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  root: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
DropdownItem.defaultProps = {
  isActive: false,
};
