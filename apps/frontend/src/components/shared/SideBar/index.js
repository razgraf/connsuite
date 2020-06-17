import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Element from "./Element";
import { pages } from "../../../constants";
import { getPrimaryUsername } from "../../../utils";

const Wrapper = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: calc(${props => props.theme.sizes.navHeight} + ${props => props.theme.sizes.edge});

  @media ${props => props.theme.medias.small} {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-content: center;
    padding-top: 0;
    background-color: ${props => props.theme.colors.white};
    box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.05);
  }
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.2);
  background: ${props => props.theme.colors.grayBlueLight};
  @media ${props => props.theme.medias.small} {
    display: none;
  }
`;

function SideBar({ className, reference }) {
  const router = useRouter();
  const auth = useSelector(state => state.auth);
  const username = useMemo(() => getPrimaryUsername(auth.user), [auth]);
  return (
    <Wrapper className={className} ref={reference}>
      <Content>
        {[pages.dashboard, pages.portfolio, pages.analytics].map(page => (
          <Element {...page} key={page.title} isActive={router.pathname === page.root} href={page.route} />
        ))}
        <Divider />
        {[pages.profile.view].map(page => (
          <Element
            {...page}
            key={page.title}
            isActive={router.pathname === page.root}
            href={page.route}
            as={page.builder(username)}
            title="Your Profile"
          />
        ))}
      </Content>
    </Wrapper>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
};

SideBar.defaultProps = {
  className: null,
  reference: null,
};

export default SideBar;
