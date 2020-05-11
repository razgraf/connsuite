import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../../components/shared/Nav";
import { Button } from "../../../components/atoms";
import { types } from "../../../constants";
import { logout } from "../../../utils";

const Page = styled.div`
  width: 100%;
`;

function Profile() {
  // useAuth("shared");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const { user } = auth;
  return (
    <Page>
      <Nav type={types.nav.platform} />
      <p>Profile</p>
      {user && (
        <>
          <p>{JSON.stringify(user)}</p>
          <Button
            type={t => t.button}
            accent={t => t.red}
            appearance={t => t.solid}
            title="Logout"
            onClick={() => logout({ auth, dispatch })}
          />
        </>
      )}
    </Page>
  );
}

export default Profile;
