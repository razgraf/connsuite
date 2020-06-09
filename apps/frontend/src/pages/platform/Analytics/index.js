import _ from "lodash";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconAnalytics from "@material-ui/icons/MultilineChartRounded";
import { rgba } from "polished";
import { Line } from "react-chartjs-2";
import { Area } from "../../../components/shared";
import { components, colors, fonts } from "../../../themes";

import { Unauthorized } from "../../../components/specific/Analytics";

const Page = styled.div``;

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)`
  & > p {
    color: ${props => props.theme.colors.dark};
  }

  & > svg {
    color: ${props => props.theme.colors.dark};
  }
`;

const SectionActions = styled(components.SectionActions)``;

const SectionTop = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: ${props => props.theme.sizes.edge};
`;

function Analytics({ elite }) {
  return (
    <Page>
      <Area>
        <Unauthorized />
        {/* <SectionTop>
          <SectionHeader>
            <SectionTitle>
              <p>Analytics</p>
              <IconAnalytics style={{ fontSize: "18pt" }} />
            </SectionTitle>
          </SectionHeader>
        </SectionTop> */}
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
