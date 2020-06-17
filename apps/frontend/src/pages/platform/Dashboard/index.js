import React, { useEffect } from "react";
import styled from "styled-components";
import { Area } from "../../../components/shared";
import { scrollTop } from "../../../utils";
import { components } from "../../../themes";
import { Welcome } from "../../../components/specific/Dashboard";
import * as Head from "../../../components/specific/Head";

const Page = styled.div``;

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)``;

const Section = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: ${props => props.theme.sizes.edge};
  @media ${props => props.theme.medias.medium} {
    padding: 0 calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
  }
`;

function Dashboard() {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <Page>
      <Head.Dashboard />
      <Area>
        <Section>
          <SectionHeader>
            <SectionTitle>
              <p>Dashboard</p>
            </SectionTitle>
          </SectionHeader>
          <Welcome />
        </Section>
      </Area>
    </Page>
  );
}

export default Dashboard;
