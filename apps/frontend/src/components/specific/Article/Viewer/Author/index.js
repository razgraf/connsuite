import _ from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
import { parseFullName, getPrimaryUsername } from "../../../../../utils";
import { Button, Spinner } from "../../../../atoms";
import { pages } from "../../../../../constants";
import { useHistory } from "../../../../../hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: calc(${props => props.theme.sizes.edge} * 4) 0;
`;

const PictureWrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 6px;
  box-shadow: 0 12px 30px -15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 10;
  height: 100%;
  padding-bottom: 30px;
  width: 100%;
  top: 0;
  left: 0;
`;

const Picture = styled.img`
  z-index: 100;
  position: relative;
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: 0;
  /* transition: opacity 300ms; */
  &[data-active="true"] {
    opacity: 1;
    /* transition: opacity 300ms; */
  }
`;

const Name = styled.p`
  color: ${props => props.theme.colors.dark};
  font-size: 18pt;
  font-weight: 300;
  font-family: ${props => props.theme.fonts.primary};
  margin: calc(${props => props.theme.sizes.edge} * 2) 0 calc(${props => props.theme.sizes.edge} * 0.5) 0;
`;

const Username = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 12pt;
  font-weight: 600;
  margin: 0 0 calc(${props => props.theme.sizes.edge} * 1.5) 0;
`;

function Author({ className, user }) {
  const router = useRouter();
  const history = useHistory();

  const [isLoadingPicture, setIsLoadingPicture] = useState(true);
  const name = parseFullName({ user });
  const username = getPrimaryUsername(user);

  const picture = _.get(user, "thumbnail.url");

  return (
    <Wrapper className={className}>
      <PictureWrapper>
        <Loader>
          <Spinner color={c => c.grayBlueDark} />
        </Loader>
        <Picture src={picture} data-active={!isLoadingPicture} onLoad={() => setIsLoadingPicture(false)} />
      </PictureWrapper>
      <Name>{name}</Name>
      <Username>@{username}</Username>
      <Button
        title={`View ${_.get(user, "name.first")}'s profile`}
        type={t => t.button}
        appearance={a => a.outline}
        accent={a => a.secondary}
        onClick={() => {
          history.push();
          router.push(pages.profile.view.route, pages.profile.view.builder(username));
        }}
      />
    </Wrapper>
  );
}

Author.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
};
Author.defaultProps = {
  className: null,
};

export default Author;
