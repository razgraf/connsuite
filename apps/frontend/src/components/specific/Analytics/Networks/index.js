import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { rgba } from "polished";
import { Bar } from "react-chartjs-2";
import { colors, fonts } from "../../../../themes";
import { useSelfNetworks, useVisitMachine } from "../../../../hooks";
import { Spinner } from "../../../atoms";
import { types } from "../../../../constants";
import Range from "../Range";

const Wrapper = styled.div`
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1);
  width: 100%;
  overflow-x: hidden;
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
`;

const ChartEmpty = styled.div`
  position: absolute;
  z-index: 200;
  opacity: 0;
  &[data-active="true"] {
    opacity: 1;
  }
  & > p {
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-size: 11pt;
    font-weight: 500;
  }
`;

const ChartLoading = styled.div`
  position: absolute;
  z-index: 200;
  opacity: 0;
  &[data-active="true"] {
    opacity: 1;
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
  const machine = useVisitMachine();
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
    <Wrapper>
      <Range onPickRange={onPickRange} isLoading={machine.current.value === machine.states.request} title="Network Events" />
      <ChartWrapper data-empty={_.toArray(statistics).length === 0}>
        <ChartEmpty data-active={!networks.isLoading && _.toArray(statistics).length === 0}>
          <p>No activity registered for this time slot</p>
        </ChartEmpty>
        <ChartLoading data-active={networks.isLoading}>
          <Spinner color={c => c.orange} />
        </ChartLoading>
        <Bar data={data} options={options} />
      </ChartWrapper>
    </Wrapper>
  );
}

export default Networks;
