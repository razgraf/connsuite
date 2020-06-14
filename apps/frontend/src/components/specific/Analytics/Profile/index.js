import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import dayjsFormat from "dayjs/plugin/advancedFormat";
import { useSelector } from "react-redux";
import { rgba } from "polished";
import { Line } from "react-chartjs-2";
import { components, colors, fonts } from "../../../../themes";
import { useVisitMachine } from "../../../../hooks";
import { types } from "../../../../constants";
import { Spinner } from "../../../atoms";
import Range from "../Range";

const Wrapper = styled(components.Section)`
  width: 100%;
  margin-bottom: calc(${props => props.theme.sizes.edge} * 1);
  overflow-x: hidden;
`;

const All = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  & > div {
    height: 120px;
    padding: 0 100px;
    width: calc(${props => props.size} * 30px);
    margin-right: auto;
    max-width: calc(100% - 150px);
    border: 1px solid ${props => props.theme.colors.orange};
    background: linear-gradient(45deg, ${props => rgba(props.theme.colors.orange, 0.1)}, ${props => rgba(props.theme.colors.orange, 0.25)});

    @media ${props => props.theme.medias.medium} {
      margin-right: 0;
    }
  }

  & > p {
    margin: 0 30px 0 30px;
    font-weight: 700;
    font-size: 28pt;
    color: ${props => props.theme.colors.orange};

    @media ${props => props.theme.medias.medium} {
      font-size: 14pt;
      text-align: center;
      margin: 0 auto 0 auto;
    }
  }
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 0 0 4px 4px;
  padding: 20px;
  min-height: 340px;
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
  maintainAspectRatio: false,
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

dayjs.extend(dayjsFormat);

function Profile() {
  const [timeQuery, setTimeQuery] = useState({ from: dayjs().subtract(1, "week").add(1, "day").toISOString(), to: dayjs().toISOString() });

  const machine = useVisitMachine();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    machine.send(machine.events.request, {
      payload: {
        auth,
        type: types.visit.type.profile,
        ...timeQuery,
      },
    });
  }, [timeQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const statistics = useMemo(() => {
    if (machine.current.value !== machine.states.success) return [];
    return _.get(machine, "current.context.data.result.statistics");
  }, [machine]);

  const onPickRange = useCallback(
    query => {
      setTimeQuery(query);
      machine.send({ type: machine.events.reset });
    },
    [setTimeQuery, machine],
  );

  const dataset = useMemo(() => {
    if (_.isNil(timeQuery.from) || _.isNil(timeQuery.to)) return statistics;
    const daysbetween = Math.abs(dayjs(timeQuery.to).add(60, "minute").diff(dayjs(timeQuery.from), "day"));
    return [...Array(daysbetween + 1).keys()].map(i => {
      const day = dayjs(timeQuery.from).add(i, "day");
      const stats = statistics.find(s => String(_.get(s, "_id")) === day.format("YYYY-MM-DD").toString());

      return {
        date: daysbetween > 6 ? day.format("Do") : day.format("MMM Do"),
        count: stats ? _.get(stats, "count") : 0,
      };
    });
  }, [statistics, timeQuery]);

  const data = useCallback(
    canvas => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);

      gradient.addColorStop(0, rgba(colors.orange, 0.3));
      gradient.addColorStop(1, rgba(colors.orange, 0));

      return {
        labels: dataset.map(item => _.get(item, "date")),
        datasets: [
          {
            label: "Visits",
            backgroundColor: gradient,
            borderColor: colors.orange,
            data: dataset.map(item => _.get(item, "count")),
          },
        ],
      };
    },
    [dataset],
  );

  const allCount = useMemo(() => _.get(dataset, "[0].count") || 0, [dataset]);

  return (
    <Wrapper>
      <Range
        defaultSlot="Last Week"
        onPickRange={onPickRange}
        isLoading={machine.current.value === machine.states.request}
        title="Profile Events"
      />
      <ChartWrapper>
        <ChartLoading data-active={machine.current.context.isLoading}>
          <Spinner color={c => c.orange} />
        </ChartLoading>
        {!machine.current.context.isLoading &&
          (_.isNil(timeQuery.from) || _.isNil(timeQuery.to) ? (
            <All>
              <div size={allCount} />
              <p>{`${allCount} ${allCount === 1 ? "view" : "views"}`}</p>
            </All>
          ) : (
            <Line height={300} data={data} options={options} />
          ))}
      </ChartWrapper>
    </Wrapper>
  );
}

export default Profile;
