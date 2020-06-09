import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import IconStatistics from "@material-ui/icons/MultilineChartRounded";
import IconPortfolio from "@material-ui/icons/StarBorderRounded";
import { useSelector } from "react-redux";
import { rgba } from "polished";
import { Bar } from "react-chartjs-2";
import { components, colors, fonts } from "../../../../themes";
import { useSelfNetworks, useVisitListMachine } from "../../../../hooks";
import { Button, Spinner } from "../../../atoms";
import { types, pages } from "../../../../constants";
import Range from "../Range";

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

const Section = styled(components.Section)`
  padding: 0 ${props => props.theme.sizes.sectionEdge};
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1);
  overflow-x: hidden;
`;

const SectionActions = styled(components.SectionActions)``;

const ButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  margin-top: 0.5px;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 0 0 4px 4px;
  padding: 30px 30px 20px 20px;

  &[data-empty="true"] {
    &:after {
      content: "No activity registered for this time slot";
      position: absolute;
      z-index: 200;
      color: ${props => props.theme.colors.white};
      font-size: 11pt;
      font-weight: 500;
    }
  }
`;

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
  },
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "#ffffff",
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
          fontColor: "#ffffff",
          fontFamily: fonts.primary,
          fontSize: 10,
          beginAtZero: true,
          stepSize: 2,
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

function Networks() {
  const [timeQuery, setTimeQuery] = useState({ from: null, to: null });

  const networks = useSelfNetworks();
  const machine = useVisitListMachine();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    machine.send(machine.events.request, {
      payload: {
        auth,
        type: types.visit.type.network,
        ...timeQuery,
      },
    });
  }, [timeQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const statistics = useMemo(() => {
    if (machine.current.value !== machine.states.success) return [];
    return _.get(machine, "current.context.data.result.statistics");
  }, [machine]);

  const dataset = useMemo(() => {
    if (_.isNil(networks) || _.isEmpty(networks.list) || [machine.states.request].includes(machine.current.value)) return [];

    return _.toArray(_.get(networks, "list")).map(item => {
      const value = _.get(
        statistics.find(s => s._id === item._id),
        "count",
      );
      return {
        _id: item._id,
        title: item.title,
        value: value || 0,
      };
    });
  }, [networks, statistics, machine]);

  const data = useCallback(() => {
    return {
      labels: dataset.length ? dataset.map(item => item.title) : [""],
      datasets: [
        {
          label: "Visits",
          backgroundColor: dataset.map((item, index) => (index % 2 ? rgba(colors.orange, 0.1) : rgba(colors.secondary, 0.1))),
          borderColor: dataset.map((item, index) => (index % 2 ? colors.orange : colors.primary)),
          borderWidth: 1,
          data: dataset.length ? dataset.map(item => item.value) : [0],
        },
      ],
    };
  }, [dataset]);

  const onPickRange = useCallback(
    query => {
      setTimeQuery(query);
      machine.send({ type: machine.events.reset });
    },
    [setTimeQuery, machine],
  );
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <IconStatistics style={{ fontSize: "15pt" }} />
          <p>Analytics and Audience</p>
          <Spinner color={c => c.orange} isVisible={networks.isLoading} />
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
      <Range onPickRange={onPickRange} isLoading={machine.current.value === machine.states.request} title="Network Events" />
      <ChartWrapper data-empty={_.toArray(statistics).length === 0}>
        <Bar data={data} options={options} />
      </ChartWrapper>
    </Section>
  );
}

export default Networks;
