import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { lighten } from "polished";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Element from "./Element";
import { pages } from "../../../constants";

const Wrapper = styled.div`
  /* position: fixed;
  left: calc((100vw - ${props => props.theme.sizes.canvasMaxWidth} - 2 * ${props => props.theme.sizes.edge}) / 2); */
  /* height: 100vh; */
  border-right: 1px solid ${props => lighten(0.04, props.theme.colors.grayBlueLight)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: calc(${props => props.theme.sizes.navHeight} + ${props => props.theme.sizes.edge});
`;

const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1.2);
  background: ${props => props.theme.colors.grayBlueLight};
`;

function SideBar({ className, reference }) {
  const router = useRouter();
  const user = useSelector(state => state.auth.user);
  const username = useMemo(
    () =>
      _.get(
        _.toArray(_.get(user, "usernames")).find(item => item.isPrimary),
        "value",
      ),
    [user],
  );

  return (
    <Wrapper className={className} ref={reference}>
      <Content>
        {[pages.dashboard, pages.portfolio, pages.business, pages.statistics].map(page => (
          <Element key={page.title} {...page} isActive={router.pathname === page.root} href={page.route} />
        ))}
        <Divider />
        {[pages.profile].map(page => (
          <Element key={page.title} {...page} isActive={router.pathname === page.root} href={page.route} as={page.builder(username)} />
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
