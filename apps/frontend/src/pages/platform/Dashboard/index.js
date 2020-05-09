import React from "react";
import styled from "styled-components";
import Nav from "../../../components/shared/Nav";
import { Button } from "../../../components/atoms";
import { types } from "../../../constants";
import { logout } from "../../../utils";
import { useAuth } from "../../../hooks/auth";

const Page = styled.div`
  width: 100%;
`;

function Dashboard() {
  useAuth("private");

  return (
    <Page>
      <Nav type={types.nav.platform} />
      <p>Dashboard</p>
      <Button type={t => t.button} accent={t => t.red} appearance={t => t.solid} title="Logout" onClick={() => logout({ store })} />
    </Page>
  );
}

export default Dashboard;
