import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rgba } from "polished";
import { useRouter } from "next/router";
import { components } from "../../../../themes";
import { Account, Logo, LogoType } from "../atoms";
import { pages } from "../../../../constants";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: ${props => props.theme.sizes.navElevation};
  order: 1;
  width: 100%;
  background: ${props => props.theme.gradients.primary};
  box-shadow: 0 -10px 30px 12px ${props => rgba(props.theme.colors.secondary, 0.3)};
`;
const Content = styled(components.Canvas)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.sizes.navHeight};
  padding: 0 ${props => props.theme.sizes.navHorizontalEdge};
  max-width: calc(${props => props.theme.sizes.canvasMaxWidth});

  @media ${props => props.theme.medias.small} {
    height: ${props => props.theme.sizes.navHeightMobile};
  }
`;

const Main = styled.div`
  height: 100%;
  flex: 1;
  padding: 0 calc(${props => props.theme.sizes.edge} * 2);
`;

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLogo = styled(Logo)`
  display: flex;
  @media ${props => props.theme.medias.small} {
    display: none;
  }
`;
const FullLogo = styled(LogoType)`
  display: none;
  @media ${props => props.theme.medias.small} {
    display: flex;
  }
`;

function NavPlatform({ className }) {
  const router = useRouter();
  return (
    <Wrapper className={className}>
      <Content>
        <IconLogo href={pages.dashboard.root} isBackEnabled={false} />
        <FullLogo onClick={() => router.push(pages.dashboard.root)} />
        <Main />
        <AccountWrapper>
          <Account />
        </AccountWrapper>
      </Content>
    </Wrapper>
  );
}

NavPlatform.propTypes = {
  className: PropTypes.string,
};

NavPlatform.defaultProps = {
  className: null,
};

export default NavPlatform;
