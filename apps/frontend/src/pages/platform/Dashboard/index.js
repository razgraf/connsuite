import React from "react";
import styled from "styled-components";

import Nav from "../../../components/shared/Nav";
import { types } from "../../../constants";

const Page = styled.div`
  width: 100%;
`;

function Dashboard() {
  return (
    <Page>
      <Nav type={types.nav.platform} />
      <p>Dashboard</p>
    </Page>
  );
}

export default Dashboard;
