import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import IconArrow from "@material-ui/icons/ArrowBackRounded";
import AssetLogoCircle from "../../../../../assets/logo/logo.png";

const WrapperPartial = styled.a`
  height: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge});
  width: calc(${props => props.theme.sizes.navHeight} - 2 * ${props => props.theme.sizes.navVerticalEdge});
  border-radius: 50%;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid transparent;
  cursor: pointer;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  object-fit: contain;
  height: 100%;
  width: 100%;
  transform: translateX(0%);
  transition: transform 200ms;
`;

const Back = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.grayBlueGhost};
  border-radius: 50%;
  transform: translateX(100%);
  transition: transform 200ms;
  & > * {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Wrapper = styled(WrapperPartial)`
  &:hover,
  &:active {
    &[data-goingback="true"] {
      ${Image} {
        transform: translateX(-100%);
        transition: transform 200ms;
      }
      ${Back} {
        transform: translateX(0);
        transition: transform 200ms;
      }
    }
  }
`;

function Logo({ className, href, onClick, hasParent }) {
  const component = (
    <Wrapper className={className} as={_.isNil(href) ? "div" : "a"} onClick={onClick} data-goingback={hasParent}>
      <Container>
        <Image src={AssetLogoCircle} alt="" />
        {hasParent && (
          <Back>
            <IconArrow style={{ fontSize: "20pt" }} />
          </Back>
        )}
      </Container>
    </Wrapper>
  );
  return _.isNil(href) ? component : <Link href={href}>{component}</Link>;
}

Logo.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  hasParent: PropTypes.bool,
};

Logo.defaultProps = {
  className: null,
  href: null,
  onClick: () => {},
  hasParent: false,
};

export default Logo;
