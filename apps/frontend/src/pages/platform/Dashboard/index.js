import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { logout } from "../../../utils";

function Dashboard() {
  const store = useStore();

  return (
    <Area>
      <p>Dashboard</p>
      <Button type={t => t.button} accent={t => t.red} appearance={t => t.solid} title="Logout" onClick={() => logout({ store })} />
    </Area>
  );
}

export default Dashboard;
