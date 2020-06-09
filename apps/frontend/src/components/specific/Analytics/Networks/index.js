import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import IconStatistics from "@material-ui/icons/GraphicEqRounded";
import { useSelector } from "react-redux";
import { rgba } from "polished";
import { Bar } from "react-chartjs-2";
import { components, colors, fonts } from "../../../../themes";
import { useSelfNetworks, useVisitListMachine } from "../../../../hooks";
import { Spinner } from "../../../atoms";
import { types } from "../../../../constants";

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
  overflow-x: hidden;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);
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
  margin-bottom: calc(${props => props.theme.sizes.edge} * 2);

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

const Timeline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1);
  margin-bottom: calc(${props => props.theme.sizes.edge} * 0);
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 4px 4px 0 0;
  border-bottom: 2px inset rgba(255, 255, 255, 0.1);

  & > * {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const TimelineTitle = styled.div`
  flex: 1;
  display: flex;

  align-items: center;
  & > p {
    font-size: 11pt;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
    margin: 0 6px 0 0;
  }
  margin: 0 10px 0 0;
`;

const TimelineItem = styled.div`
  padding: 8px 12px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);

  & > p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 9pt;
    font-weight: 600;
    margin: 0;
  }
  &[data-active="false"] {
    cursor: pointer;
  }
  &[data-active="true"] {
    background: ${props => props.theme.gradients.gold};
    & > p {
      color: ${props => props.theme.colors.white};
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
        },
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const timeSlots = {
  all: "All Time",
  day: "Last 24h",
  week: "Last Week",
  month: "Last Month",
  //   custom: "Custom",
};

function Networks() {
  const [timeSlot, setTimeSlot] = useState(timeSlots.all);
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

    return _.toArray(_.get(networks, "list")).map(item => ({
      _id: item._id,
      title: item.title,
      value:
        _.attempt(() =>
          _.get(
            statistics.find(s => s._id === item._id),
            "count",
          ),
        ) || 0,
    }));
  }, [networks, statistics, machine]);

  const data = useCallback(() => {
    return {
      labels: dataset.map(item => item.title),
      datasets: [
        {
          label: "Visits",
          backgroundColor: dataset.map((item, index) => (index % 2 ? rgba(colors.orange, 0.1) : rgba(colors.secondary, 0.1))),
          borderColor: dataset.map((item, index) => (index % 2 ? colors.orange : colors.primary)),
          borderWidth: 1,
          data: dataset.map(item => item.value),
        },
      ],
    };
  }, [dataset]);

  const pickTimeSlot = useCallback(
    slot => {
      setTimeSlot(slot);
      machine.send({ type: machine.events.reset });
      switch (slot) {
        case timeSlots.day: {
          const today = dayjs();
          const yersterday = dayjs().subtract(1, "day");
          setTimeQuery({ from: today.toISOString(), to: yersterday.toISOString() });
          break;
        }
        case timeSlots.all:
        default:
          setTimeQuery({ from: null, to: null });
          break;
      }
    },
    [setTimeSlot, setTimeQuery, machine],
  );

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>
          <IconStatistics style={{ fontSize: "15pt" }} />
          <p>Network Analytics</p>
          <Spinner color={c => c.orange} isVisible={networks.isLoading} />
        </SectionTitle>
      </SectionHeader>
      <Timeline>
        <TimelineTitle>
          <p>Time Range</p>
          <Spinner color={c => c.orange} isVisible={machine.current.value === machine.states.request} />
        </TimelineTitle>
        {Object.keys(timeSlots).map(key => {
          const slot = timeSlots[key];
          return (
            <TimelineItem key={key} data-active={slot === timeSlot} onClick={() => pickTimeSlot(slot)}>
              <p>{slot}</p>
            </TimelineItem>
          );
        })}
      </Timeline>
      <ChartWrapper data-empty={_.toArray(statistics).length === 0}>
        <Bar data={data} options={options} />
      </ChartWrapper>
    </Section>
  );
}

export default Networks;

/**
 *   const reducer = useAnalyticsTimelineReducer();
 *     <InputDate
          id="optionsNetworksFrom"
          label="From"
          onUpdate={payload => {
            reducer.dispatch({ type: reducer.actions.UPDATE_FROM_VALUE, payload });
          }}
          placeholder="Beginning of time"
          value={reducer.state.from.value}
          warning={reducer.state.from.error}
        />

        <InputDate
          id="optionsNetworksTo"
          label="To"
          onUpdate={payload => {
            reducer.dispatch({ type: reducer.actions.UPDATE_TO_VALUE, payload });
          }}
          placeholder="Now"
          value={reducer.state.to.value}
          warning={reducer.state.to.error}
        />
 */
