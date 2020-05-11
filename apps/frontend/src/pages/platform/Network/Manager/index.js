import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { components } from "../../../../themes";

const Page = styled.div``;

function NetworkManager({ query }) {
  return (
    <Page>
      <p>Network {JSON.stringify(query)}</p>
    </Page>
  );
}

NetworkManager.propTypes = {
  query: PropTypes.shape({}),
};

NetworkManager.defaultProps = {
  query: {},
};

export default NetworkManager;
