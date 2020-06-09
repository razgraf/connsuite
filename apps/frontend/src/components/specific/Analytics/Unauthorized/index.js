import React from "react";
import styled from "styled-components";
import IconAnalytics from "@material-ui/icons/MultilineChartRounded";
import { rgba } from "polished";
import { Line } from "react-chartjs-2";
import { components, colors, fonts } from "../../../../themes";

const Wrapper = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  overflow-x: hidden;
  margin-bottom: ${props => props.theme.sizes.edge};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.sizes.edge};

  & > svg {
    color: ${props => props.theme.colors.orange};
  }
`;

const Title = styled.p`
  font-size: 30pt;
  text-align: left;
  color: ${props => props.theme.colors.dark};
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 300;
  margin-right: 15px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 4px;
  padding: 30px 30px 20px 20px;
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
      <Header>
        <Title>Analytics</Title>
        <IconAnalytics style={{ fontSize: "20pt" }} />
      </Header>
      <ChartWrapper>
        <Line height={150} data={data} options={options} />
      </ChartWrapper>
    </Wrapper>
  );
}

export default Unauthorized;
