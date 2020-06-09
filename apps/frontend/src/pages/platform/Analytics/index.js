import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Area } from "../../../components/shared";

import { Networks, Unauthorized } from "../../../components/specific/Analytics";

const Page = styled.div``;

function Analytics({ elite }) {
  return (
    <Page>
      <Area>{!elite ? <Unauthorized /> : <Networks />}</Area>
    </Page>
  );
}

Analytics.propTypes = {
  elite: PropTypes.bool,
};

Analytics.defaultProps = {
  elite: false,
};

export default Analytics;
