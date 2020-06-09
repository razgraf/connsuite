import React from "react";
import styled from "styled-components";
import IconAnalytics from "@material-ui/icons/MultilineChartRounded";
import IconUpgrade from "@material-ui/icons/FlashOnRounded";

import { rgba } from "polished";
import { Line } from "react-chartjs-2";
import { components, colors, fonts } from "../../../../themes";
import { Button } from "../../../atoms";

const SectionHeader = styled(components.SectionHeader)``;
const SectionTitle = styled(components.SectionTitle)`
  & > p {
    color: ${props => props.theme.colors.grayBlueBlack};
    margin-left: 6px;
  }

  & > svg {
    color: ${props => props.theme.colors.grayBlueBlack};
    margin-top: 1px;
  }
`;

const SectionActions = styled(components.SectionActions)``;

const Wrapper = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: ${props => props.theme.sizes.edge};
`;

const Info = styled.div`
  padding: calc(${props => props.theme.sizes.edge} * 2) 0;
  border-top: 1px solid ${props => props.theme.colors.grayBlueLight};
  width: 100%;
`;
const Title = styled.p`
  font-size: 13pt;
  text-align: left;
  color: ${props => props.theme.colors.grayBlueBlack};
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 400;
  margin: 0 0 30px 0;
`;

const Content = styled.p`
  font-size: 10pt;
  text-align: left;
  color: ${props => props.theme.colors.grayBlueBlack};
  font-weight: 400;
`;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 4px;
  padding: 30px 30px 20px 20px;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.sizes.edge};
  margin-top: calc(${props => props.theme.sizes.edge} * 2);
  grid-auto-rows: minmax(92px, 1fr);
`;

const Card = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 30px -10px rgba(0, 0, 0, 0.15);
  grid-column: span 1;
  background: #ffffff;

  transform: translate(0, 0);
  transition: transform 250ms;

  &:hover,
  &:active {
    transform: translate(5px, -5px);
    transition: transform 250ms;
  }
`;

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.orange};
  background-color: ${props => rgba(props.theme.colors.orange, 0.1)};
  & > * {
    color: ${props => props.theme.colors.orange};
  }
`;

const CardTitle = styled.div`
  flex: 1;
  font-size: 12pt;
  text-align: left;
  color: ${props => props.theme.colors.grayBlueBlack};
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 500;
  margin: 0;
`;

const FinalCard = styled(Card)`
  align-items: center;
  justify-content: center;
  &:hover,
  &:active {
    transform: translate(0, 0);
  }
  svg,
  p {
    color: ${props => props.theme.colors.orange};
  }
  ${ButtonIconWrapper} {
    margin-bottom: -2px;
    padding-top: 2px;
  }
`;

const data = canvas => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 120);

  gradient.addColorStop(0, rgba(colors.orange, 0.3));
  gradient.addColorStop(1, rgba(colors.orange, 0));

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Visits",
        backgroundColor: gradient,
        borderColor: colors.orange,
        data: [115, 120, 120, 110, 115, 130, 120, 110, 120, 105, 115, 120, 120],
      },
    ],
  };
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "rgba(255,255,255,0.3)",
          fontFamily: fonts.primary,
          fontSize: 11,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "transparent",
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

function Unauthorized() {
  return (
    <Wrapper>
      <SectionHeader>
        <SectionTitle>
          <IconAnalytics style={{ fontSize: "15pt" }} />
          <p>Analytics</p>
        </SectionTitle>
        <SectionActions>
          <Button
            appearance={t => t.outline}
            accent={t => t.grayBlueBlack}
            childrenLeft={
              <ButtonIconWrapper>
                <IconUpgrade style={{ fontSize: "11pt" }} />
              </ButtonIconWrapper>
            }
            isMini
            title="Upgrade"
            type={t => t.button}
          />
        </SectionActions>
      </SectionHeader>
      <ChartWrapper>
        <Line height={150} data={data} options={options} />
      </ChartWrapper>
      <Info>
        <Title>Learn more about your online presence</Title>
        <Content>
          Gain more insight into how the world is reaching your profile. Access statistics for each network or piece of content your linked
          to your ConnSuite account. Make decisions based on live data and check out where your audience is heading.
        </Content>
        <Grid>
          {["Profile Views", "Network Clicks", "Article Visitors", "Talent Insights", "Time-Driven"].map(item => (
            <Card>
              <CardTitle>{item}</CardTitle>
              <CardIcon>
                <IconAnalytics style={{ fontSize: "13pt" }} />
              </CardIcon>
            </Card>
          ))}
          <FinalCard>
            <Button
              isFullWidth
              appearance={t => t.solid}
              accent={t => t.grayBlueBlack}
              childrenLeft={
                <ButtonIconWrapper>
                  <IconUpgrade style={{ fontSize: "16pt" }} />
                </ButtonIconWrapper>
              }
              title="Upgrade"
              type={t => t.button}
            />
          </FinalCard>
        </Grid>
      </Info>
    </Wrapper>
  );
}

export default Unauthorized;
