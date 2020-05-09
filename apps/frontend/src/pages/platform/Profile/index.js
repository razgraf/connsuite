import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import Nav from "../../../components/shared/Nav";
import { Button } from "../../../components/atoms";
import { types } from "../../../constants";
import { logout } from "../../../utils";
import { useAuth } from "../../../hooks";

const Page = styled.div`
  width: 100%;
`;

function Profile() {
  useAuth("shared");

  const store = useStore();

  const { user } = store.getState().auth;
  return (
    <Page>
      <Nav type={types.nav.platform} />
      <p>Profile</p>
      {user && (
        <>
          <p>{JSON.stringify(user)}</p>
          <Button type={t => t.button} accent={t => t.red} appearance={t => t.solid} title="Logout" onClick={() => logout({ store })} />
        </>
      )}
    </Page>
  );
}

export default Profile;
