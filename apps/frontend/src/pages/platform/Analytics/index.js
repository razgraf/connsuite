import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Area } from "../../../components/shared";

import { Articles, Networks, Unauthorized } from "../../../components/specific/Analytics";

const Page = styled.div``;

const Authorized = styled.div`
  padding-bottom: 80px;
  width: 100%;
`;

function Analytics({ elite }) {
  return (
    <Page>
      <Area>
        {!elite ? (
          <Unauthorized />
        ) : (
          <Authorized>
            <Networks />
            <Articles />
          </Authorized>
        )}
      </Area>
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
