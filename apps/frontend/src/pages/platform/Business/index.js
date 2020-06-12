import React from "react";
import styled from "styled-components";
import { Area } from "../../../components/shared";
import * as Head from "../../../components/specific/Head";

const Page = styled.div``;

function Business() {
  return (
    <Page>
      <Head.Business />
      <Area>
        <p>Business</p>
      </Area>
    </Page>
  );
}

export default Business;
