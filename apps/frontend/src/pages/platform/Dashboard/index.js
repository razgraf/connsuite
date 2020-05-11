import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { logout } from "../../../utils";

const Page = styled.div``;

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <Page>
      <Area>
        <p>Dashboard</p>
        <Button
          type={t => t.button}
          accent={t => t.red}
          appearance={t => t.solid}
          title="Logout"
          onClick={() => logout({ auth, dispatch })}
        />
      </Area>
    </Page>
  );
}

export default Dashboard;
