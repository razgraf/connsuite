import React from "react";
import styled from "styled-components";
import { useStore } from "react-redux";
import IconAdd from "@material-ui/icons/Add";
import { components } from "../../../themes";
import { Button } from "../../../components/atoms";
import { Area } from "../../../components/shared";
import { pages } from "../../../constants";

const Section = styled(components.Section)``;
const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)``;
const SectionActions = styled(components.SectionActions)``;

const Add = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

function Portfolio() {
  const store = useStore();

  return (
    <Area>
      <Section>
        <SectionHeader>
          <SectionTitle>My Networks</SectionTitle>
          <SectionActions>
            <Button
              appearance={t => t.outline}
              accent={t => t.grayBlueDark}
              childrenLeft={
                <Add>
                  <IconAdd style={{ fontSize: "11pt" }} />
                </Add>
              }
              isMini
              title="Create Network"
              to={pages.network.create.root}
              type={t => t.router}
            />
          </SectionActions>
        </SectionHeader>
      </Section>
    </Area>
  );
}

export default Portfolio;
