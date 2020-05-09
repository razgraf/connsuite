import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import Nav from "../../../components/shared/Nav";
import { Button } from "../../../components/atoms";
import { types } from "../../../constants";
import { logout } from "../../../utils";

const Page = styled.div`
  width: 100%;
`;

function Dashboard() {
  const store = useStore();

  return (
    <Page>
      <Nav type={types.nav.platform} />
      <p>Dashboard</p>
      <Button type={t => t.button} accent={t => t.red} appearance={t => t.solid} title="Logout" onClick={() => logout({ store })} />
    </Page>
  );
}

export default Dashboard;
