import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { logout, scrollTop } from "../../../utils";
import { components } from "../../../themes";
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
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

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
          <Button
            type={t => t.button}
            accent={t => t.red}
            appearance={t => t.solid}
            title="Logout"
            onClick={() => logout({ auth, dispatch })}
          />
        </Section>
      </Area>
    </Page>
  );
}

export default Dashboard;
