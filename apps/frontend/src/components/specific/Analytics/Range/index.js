import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";
import { Spinner } from "../../../atoms";

const Timeline = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1);
  margin-bottom: calc(${props => props.theme.sizes.edge} * 0);
  background-color: ${props => props.theme.colors.grayBlueBlack};
  border-radius: 4px 4px 0 0;
  border-bottom: 2px inset rgba(255, 255, 255, 0.1);

  & > * {
    margin-right: 8px;
    &:first-child {
      margin-right: 0;
    }
  }
  @media ${props => props.theme.medias.medium} {
    flex-wrap: wrap;
  }
`;

const TimelineTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  & > p {
    font-size: 11pt;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
    margin: 0 6px 0 0;
  }
  margin: 0 10px 0 0;
  @media ${props => props.theme.medias.medium} {
    margin-right: calc(100% - 140px) !important;
    flex: auto;
  }
`;

const TimelineItem = styled.div`
  padding: 8px 12px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  @media ${props => props.theme.medias.medium} {
    margin-top: 10px;
  }

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
    background: ${props => props.theme.gradients.primary};
    & > p {
      color: ${props => props.theme.colors.white};
    }
  }
`;

const timeSlots = {
  all: "All Time",
  day: "Last 24h",
  yesterday: "Yesterday",
  week: "Last Week",
  month: "Last Month",
  //   custom: "Custom",
};

function Range({ className, onPickRange, isLoading, title, defaultSlot }) {
  const [timeSlot, setTimeSlot] = useState(defaultSlot || timeSlots.all);

  const onTimeSlotPick = useCallback(
    slot => {
      setTimeSlot(slot);
      switch (slot) {
        case timeSlots.day: {
          const today = dayjs();
          const yersterday = dayjs().subtract(1, "day");
          onPickRange({ from: yersterday.toISOString(), to: today.toISOString() });
          break;
        }
        case timeSlots.yesterday: {
          const yesterday = dayjs().subtract(1, "day");
          const theDayBefore = dayjs().subtract(2, "day");
          onPickRange({ from: theDayBefore.toISOString(), to: yesterday.toISOString() });
          break;
        }
        case timeSlots.week: {
          const today = dayjs();
          const lastWeek = dayjs().subtract(1, "week").add(1, "day");
          onPickRange({ from: lastWeek.toISOString(), to: today.toISOString() });
          break;
        }
        case timeSlots.month: {
          const today = dayjs();
          const lastMonth = dayjs().subtract(1, "month").add(1, "day");
          onPickRange({ from: lastMonth.toISOString(), to: today.toISOString() });
          break;
        }
        case timeSlots.all:
        default:
          onPickRange({ from: null, to: null });
          break;
      }
    },
    [onPickRange],
  );

  return (
    <Timeline className={className}>
      <TimelineTitle>
        <p>{title}</p>
        <Spinner color={c => c.orange} isVisible={isLoading} />
      </TimelineTitle>
      {Object.keys(timeSlots).map(key => {
        const slot = timeSlots[key];
        return (
          <TimelineItem
            key={key}
            data-active={slot === timeSlot}
            onClick={() => {
              if (slot !== timeSlot) onTimeSlotPick(slot);
            }}
          >
            <p>{slot}</p>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

Range.propTypes = {
  className: PropTypes.string,
  onPickRange: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  defaultSlot: PropTypes.string,
};

Range.defaultProps = {
  className: null,
  onPickRange: () => {},
  isLoading: true,
  title: "Events",
  defaultSlot: null,
};

export default Range;

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
