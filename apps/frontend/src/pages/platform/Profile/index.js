import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { rgba } from "polished";
import { parseFullName } from "../../../utils";
import { Button } from "../../../components/atoms";
import { types, pages } from "../../../constants";
import { Header } from "../../../components/specific/Profile";
import { components } from "../../../themes";
import Nav from "../../../components/shared/Nav";

const Page = styled.div`
  position: relative;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-top: ${props => props.theme.sizes.navHeight};
`;

const Canvas = styled(components.Canvas)`
  position: relative;
  z-index: 100;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueGhost};
  border-top: none;
  border-bottom: 0;
  padding: 0;
  margin-bottom: calc(calc(${props => props.theme.sizes.edge}) * 2.5);

  & > * {
    z-index: 10;
  }

  &:before {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    left: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px ${props => rgba(props.theme.colors.grayBlueDark, 0.2)};
  }
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px ${props => rgba(props.theme.colors.grayBlueDark, 0.2)};
  }
`;

function replaceUsername({ profile, identifier, router }) {
  if (_.isNil(profile) || !_.has(profile, "usernames")) return;
  const usernames = _.toArray(_.get(profile, "usernames"));
  const primary = usernames.find(item => item.isPrimary);
  if (_.isNil(primary)) return;
  if (String(primary.value) !== String(identifier) && _.get(Router, "query.id") !== String(primary.value)) {
    router.push(pages.profile.route, pages.profile.builder(primary.value), { shallow: true });
  }
}

function Profile({ profile, identifier }) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => replaceUsername({ profile, identifier, router }));

  return (
    <Page>
      <Nav appearance={types.nav.appearance.profile} title={`${parseFullName({ user: profile }) || "ConnSuite"}'s`} />
      <Main>
        <Canvas>
          <Header />
        </Canvas>
      </Main>
    </Page>
  );
}

Profile.propTypes = {
  profile: PropTypes.shape({}),
  identifier: PropTypes.string,
};

Profile.defaultProps = {
  profile: null,
  identifier: null,
};

export default Profile;
