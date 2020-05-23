import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area, Modal } from "../../../components/shared";
import { logout } from "../../../utils";
import { useModal } from "../../../hooks";

const Page = styled.div``;

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const modal = useModal("test");

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
        <Button
          type={t => t.button}
          accent={t => t.secondary}
          appearance={t => t.outline}
          title="Modal"
          onClick={() => modal.setOpen(true)}
        />
      </Area>
      <Modal title="Test" id="test">
        <p>Salut</p>
      </Modal>
    </Page>
  );
}

export default Dashboard;
