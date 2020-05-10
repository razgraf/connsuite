import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

import { rgba } from "polished";

import LogoAsset from "../../../assets/logo/logo_horiz_white.png";
import { links, footer } from "../../../constants";
import { components } from "../../../themes";
import { Button } from "../../atoms";

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.grayBlueBlack};
`;
const Canvas = styled(components.Canvas)`
  display: flex;
  flex-direction: column;
  padding-top: calc(${props => props.theme.sizes.edge} * 4);
  padding-bottom: calc(${props => props.theme.sizes.edge} * 3);
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 3);
`;

const LogoWrapper = styled.div``;

const Logo = styled.img`
  height: 30px;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Grid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: calc(${props => props.theme.sizes.edge} * 2);
`;

const Column = styled.div`
  grid-column: span 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: calc(${props => props.theme.sizes.edge} * 1.5);
`;

const Item = styled.a`
  grid-column: span 1;
  display: flex;

  & > p {
    cursor: pointer;
    font-size: 9pt;
    font-weight: 500;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.white};
    opacity: 0.5;
    margin: 0;
    &:hover,
    &:active {
      opacity: 1;
    }
  }
`;

const Shill = styled.div`
  width: 250px;
  padding-left: calc(${props => props.theme.sizes.edge} * 2);
`;

const ShillBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1.5);
  border: 1px solid ${props => rgba(props.theme.colors.white, 0.2)};
  background: ${props => rgba(props.theme.colors.white, 0.1)};
  border-radius: calc(${props => props.theme.sizes.edge} * 1.5);
`;

const ShillText = styled.p`
  font-size: 9pt;
  color: ${props => rgba(props.theme.colors.white, 0.5)};
  font-weight: 400;
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 1.5) 0;
`;

function Footer({ reference }) {
  return (
    <Wrapper ref={reference}>
      <Canvas>
        <Header>
          <LogoWrapper>
            <Logo src={LogoAsset} alt="ConnSuite" />
          </LogoWrapper>
        </Header>
        <Content>
          <Grid>
            {footer.map(column => (
              <Column key={`col-${column[0].title}`}>
                {column.map(({ title, url }) => (
                  <Link href={url} key={title}>
                    <Item>
                      <p>{title}</p>
                    </Item>
                  </Link>
                ))}
              </Column>
            ))}
          </Grid>
          <Shill>
            <ShillBox>
              <ShillText>Want to build something together? Let&apos;s have a chat!</ShillText>
              <Button
                accent={t => t.whiteTransparent}
                appearance={t => t.solid}
                type={t => t.link}
                to={links.van.account}
                title="@vansoftware"
                isFullWidth
              />
            </ShillBox>
          </Shill>
        </Content>
      </Canvas>
    </Wrapper>
  );
}

Footer.propTypes = {
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape]),
};

Footer.defaultProps = {
  reference: null,
};

export default Footer;
