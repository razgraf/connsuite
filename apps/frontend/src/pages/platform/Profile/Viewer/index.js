import _ from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { rgba } from "polished";

import { components } from "../../../../themes";
import { modals, pages, types } from "../../../../constants";
import { useNetworksMachine, useArticlesMachine, useProfileMachine, useCover, useModal } from "../../../../hooks";
import { parseFullName, getPrimaryUsername } from "../../../../utils";

import Nav from "../../../../components/shared/Nav";
import Footer from "../../../../components/shared/Footer";
import Cover from "../../../../components/shared/Cover";
import { ModalNetworkRemove, ModalArticleRemove } from "../../../../components/specific/Modals";
import { Articles, Business, Header, Networks } from "../../../../components/specific/Profile/Viewer";
import Missing from "../Missing";
import * as Head from "../../../../components/specific/Head";

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
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.grayBlueGhost};
  border-top: none;
  border-bottom: 0;
  padding: 0;
  padding-bottom: ${props => props.theme.sizes.profileBusinessDistance};

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
    box-shadow: 0 0 50px -10px ${props => rgba(props.theme.colors.dark, 0.1)};
  }
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    top: 10%;
    right: 0;
    width: 10%;
    height: 80%;
    box-shadow: 0 0 50px -10px ${props => rgba(props.theme.colors.dark, 0.1)};
  }
`;

function replaceUsername({ username, identifier, router }) {
  if (_.isNil(username)) return;
  if (_.isNil(identifier)) return;

  if (String(username) !== String(identifier) && _.get(Router, "query.id") !== String(username)) {
    router.push(pages.profile.view.route, pages.profile.view.builder(username), { shallow: true });
  }
}

function Profile({ data, identifier, isSelf }) {
  const auth = useSelector(state => state.auth);
  const router = useRouter();
  const machineNetworks = useNetworksMachine();
  const machineArticles = useArticlesMachine();
  const machineProfile = useProfileMachine();
  const username = useMemo(() => getPrimaryUsername(data), [data]);
  const name = useMemo(() => parseFullName({ user: data }), [data]);

  const active = useState(null);
  const controller = useMemo(() => ({ get: () => active[0], set: value => active[1](value) }), [active]);

  const [articleRemove, setArticleRemove] = useState(null);
  const { setOpen: setArticleRemoveModalOpen } = useModal(modals.articleRemove);
  const { network: networkCover, setOpen: setOpenCover } = useCover();

  const onArticleRemoveClick = useCallback(
    article => {
      setArticleRemove(article);
      setArticleRemoveModalOpen(true);
    },
    [setArticleRemove, setArticleRemoveModalOpen],
  );

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

  const person = useMemo(() => {
    return {
      data,
      isSelf,
      username,
      profile: _.get(machineProfile, "current.context.data"),
      skills: _.get(machineProfile, "current.context.data.skills"),
      categories: _.get(machineProfile, "current.context.data.categories"),
      networks: _.get(machineNetworks, "current.context.list"),
      articles: _.get(machineArticles, "current.context.list"),
      isLoadingProfile: _.get(machineProfile, "current.context.isLoading"),
      isLoadingNetworks: _.get(machineNetworks, "current.context.isLoading"),
      isLoadingArticles: _.get(machineArticles, "current.context.isLoading"),
    };
  }, [data, isSelf, username, machineProfile, machineNetworks, machineArticles]);

  if (_.isNil(data)) return <Missing />;

  return (
    <Page>
      <Head.ProfileViewer
        username={username}
        first={_.get(person, "data.name.first")}
        last={_.get(person, "data.name.last")}
        name={name}
        descripton={_.get(person, "data.description")}
      />
      <Nav
        appearance={types.nav.appearance.profile}
        title={`${parseFullName({ user: data }) || "ConnSuite"}'s`}
        networks={person.networks}
      />
      <Main>
        <Canvas>
          <Header isLoading={person.isLoadingProfile} controller={controller} profile={person.profile} />
          <Networks isLoading={person.isLoadingNetworks} networks={person.networks} />
          <Articles person={person} controller={controller} onArticleRemoveClick={onArticleRemoveClick} />
        </Canvas>
        <Business person={person} />
      </Main>
      <Cover isSelf={person.isSelf} />
      {isSelf && (
        <>
          <ModalNetworkRemove network={networkCover} onSuccess={() => setOpenCover(false)} />
          <ModalArticleRemove article={articleRemove} onSuccess={() => setArticleRemove(null)} />
        </>
      )}
      <Footer />
    </Page>
  );
}

Profile.propTypes = {
  data: PropTypes.shape({}),
  identifier: PropTypes.string,
  isSelf: PropTypes.bool,
};

Profile.defaultProps = {
  data: null,
  identifier: null,
  isSelf: false,
};

export default Profile;
