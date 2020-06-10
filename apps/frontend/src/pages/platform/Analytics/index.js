import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import IconStatistics from "@material-ui/icons/MultilineChartRounded";
import IconPortfolio from "@material-ui/icons/StarBorderRounded";

import { components } from "../../../themes";
import { Articles, Networks, Profile, Unauthorized } from "../../../components/specific/Analytics";
import { Area } from "../../../components/shared";
import { Button } from "../../../components/atoms";
import { pages } from "../../../constants";

const Page = styled.div``;

const Authorized = styled(components.Section)`
  margin-bottom: 80px;
  width: 100%;
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
`;

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)`
  & > p {
    color: ${props => props.theme.colors.grayBlueBlack};
    margin-left: 6px;
  }

  & > svg {
    color: ${props => props.theme.colors.grayBlueBlack};
  }
`;

const SectionActions = styled(components.SectionActions)``;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  margin-top: 0.5px;
`;

function Analytics({ elite }) {
  return (
    <Page>
      <Area>
        {!elite ? (
          <Unauthorized />
        ) : (
          <Authorized>
            <SectionHeader>
              <SectionTitle>
                <IconStatistics style={{ fontSize: "15pt" }} />
                <p>Analytics and Audience</p>
              </SectionTitle>
              <SectionActions>
                <Button
                  appearance={t => t.outline}
                  accent={t => t.grayBlueBlack}
                  childrenLeft={
                    <ButtonIconWrapper>
                      <IconPortfolio style={{ fontSize: "12pt" }} />
                    </ButtonIconWrapper>
                  }
                  isMini
                  title="View Protfolio"
                  to={pages.portfolio.route}
                  type={t => t.router}
                />
              </SectionActions>
            </SectionHeader>
            <Profile />
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
