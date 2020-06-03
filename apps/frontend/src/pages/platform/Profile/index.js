import _ from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { rgba } from "polished";

import { types, pages } from "../../../constants";
import { useNetworksMachine, useArticlesMachine, useProfileMachine } from "../../../hooks";
import { parseFullName, getPrimaryUsername } from "../../../utils";

import { components } from "../../../themes";
import Nav from "../../../components/shared/Nav";
import { Header, Articles, Networks } from "../../../components/specific/Profile";

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

function replaceUsername({ username, identifier, router }) {
  if (_.isNil(username)) return;
  if (_.isNil(identifier)) return;

  if (String(username) !== String(identifier) && _.get(Router, "query.id") !== String(username)) {
    router.push(pages.profile.route, pages.profile.builder(username), { shallow: true });
  }
}

function Profile({ profile, identifier }) {
  const auth = useSelector(state => state.auth);
  const router = useRouter();
  const machineNetworks = useNetworksMachine();
  const machineArticles = useArticlesMachine();
  const machineProfile = useProfileMachine();
  const username = useMemo(() => getPrimaryUsername(profile), [profile]);

  const active = useState(null);
  const controller = useMemo(() => ({ get: () => active[0], set: value => active[1](value) }), [active]);

  useEffect(() => {
    replaceUsername({ username, identifier, router });
    machineNetworks.send(machineNetworks.events.request, {
      payload: {
        auth,
        user: { username },
      },
    });
    machineArticles.send(machineArticles.events.request, {
      payload: {
        auth,
        user: { username },
      },
    });

    machineProfile.send(machineProfile.events.request, {
      payload: {
        auth,
        identifier: username,
      },
    });
  }, []); /* componentDidMount */ // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page>
      <Nav appearance={types.nav.appearance.profile} title={`${parseFullName({ user: profile }) || "ConnSuite"}'s`} hasParent />
      <Main>
        <Canvas>
          <Header isLoading={_.get(machineProfile, "current.context.isLoading")} profile={_.get(machineProfile, "current.context.data")} />
          <Networks
            isLoading={_.get(machineNetworks, "current.context.isLoading")}
            networks={_.get(machineNetworks, "current.context.list")}
          />
          <Articles
            isLoading={_.get(machineArticles, "current.context.isLoading") || _.get(machineProfile, "current.context.isLoading")}
            articles={_.get(machineArticles, "current.context.list")}
            skills={_.get(machineProfile, "current.context.data.skills")}
            categories={_.get(machineProfile, "current.context.data.categories")}
            controller={controller}
          />
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
