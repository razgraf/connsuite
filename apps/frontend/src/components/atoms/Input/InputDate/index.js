import _ from "lodash";
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import { rgba } from "polished";
import useOnClickOutside from "use-onclickoutside";
import ArrowRight from "@material-ui/icons/KeyboardArrowRightRounded";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeftRounded";
import ArrowDown from "@material-ui/icons/KeyboardArrowDownRounded";

import { useMachine } from "@xstate/react";
import { descriptor, Frame } from "../atoms";
import Machine from "./machine";

import { StateInputDate as initalState } from "../state";

const DATE_FORMAT = "MMMM DD, YYYY";

const Holder = styled.p`
  max-width: calc(100% - 80px);
  ${props => props.theme.extensions.ellipsis};
  &[data-purpose="holder"]:empty {
    &:after {
      content: "${props => props.placeholder}" !important;
    }
  }
  &[data-purpose="holder"][data-warning="true"]{
    color: ${props => props.theme.colors.red};
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  display: ${props => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 20px 40px 08px ${props => rgba(props.theme.colors.dark, 0.15)};
  left: 0;
  right: 0;
  max-height: 240px;
  min-width: 260px;
  width: 100%;
  position: absolute;
  top: 40px;
  z-index: 100;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.dark};
  border-radius: 2px 2px 0 0;
  height: 48px;
  justify-content: center;
  padding: 2px 6px;
  width: 100%;
  z-index: 100;
`;

const DropdownContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 8px 6px;
  width: 100%;
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0.8rem;
  cursor: pointer;
  height: 1.6rem;
  justify-content: center;
  transition: background-color 200ms;
  width: 1.6rem;
  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.3);
    transition: background-color 200ms;
  }

  ${props =>
    !props.isEnabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`;
const DropdownArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowRightWrapper = styled.div`
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;
const ArrowLeftWrapper = styled.div`
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;
const ArrowDownWrapper = styled.div`
  & > * {
    color: ${props => props.theme.colors.white};
  }
`;
const MonthPicker = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  position: relative;
`;

const MonthTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 0.1rem;
  cursor: pointer;
  padding: 0.25rem 0.2rem 0.2rem 0.7rem;
  transition: background-color 200ms;
  z-index: 100;
  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color 200ms;
  }

  & > p {
    color: ${props => props.theme.colors.white};
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0rem 0.3rem 0rem 0rem;
    text-align: center;
    user-select: none;
  }
`;

const MonthDropdown = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 0.1rem;
  box-shadow: 0 16px 30px -12px rgba(0, 0, 0, 0.3);
  display: none;
  height: 8rem;
  opacity: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.4rem;
  transition: opacity 200ms 2ms;
  width: 10rem;
  z-index: 200;

  ${props =>
    props.isOpen &&
    css`
      display: block;
      opacity: 1;
      transition: opacity 200ms 2ms;
    `}
`;

const MonthRow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.grayLight};
  cursor: pointer;
  justify-content: center;
  padding: 12px 10px;
  position: relative;
  text-align: center;
  width: 100%;
  & > p {
    color: ${props => props.theme.colors.dark};
    flex: 1;
    font-family: ${props => props.theme.fonts.primary};
    font-size: 9pt;
    font-weight: 400;
    margin: 0;
    text-align: center;
  }

  &:last-child {
    border-bottom: none;
  }
  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.grayLight};
  }

  ${props =>
    props.isActive &&
    css`
      &:after {
        background-color: ${props.theme.colors.dark};
        border-radius: 3px;
        content: "";
        flex-shrink: 0;
        height: 6px;
        position: absolute;
        left: 8px;
        width: 6px;
      }
    `}
`;

const DayPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 10rem;
  width: 100%;
`;

const DayCell = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  grid-column: 1fr;
  justify-content: center;

  & > p {
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.white};
    border-radius: 50%;
    color: ${props => props.theme.colors.dark};
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 9pt;
    font-weight: 600;
    height: 32px;
    justify-content: center;
    margin: 0;
    width: 32px;
    &:hover,
    &:active {
      background-color: ${props => props.theme.colors.grayLight};
    }
    ${props =>
      props.isActive &&
      css`
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.dark};

        &:hover,
        &:active {
          background-color: ${props.theme.colors.dark};
        }
      `}
  }
`;

function buildMonthRowSource(month, year) {
  return {
    year,
    month,
    label: `${dayjs(`${year}-${month}`).format("MMMM")} ${year}`,
  };
}

function getParsedDate(date, isMin = false) {
  if (_.isNil(date)) {
    return isMin ? dayjs().subtract(3, "year") : dayjs().add(3, "year");
  } else if (date === "today") {
    return dayjs();
  } else {
    return dayjs(date, DATE_FORMAT);
  }
}

/**
 * 🚨 Because `dayjs` counts month indexes from 0 to 11 (instead of 1 to 12) there will be a correction
 * every time we convert from dayjs format to readable format (or the one stored inside the reducer)
 */

function InputDate({ className, id, help, label, onUpdate, placeholder, value, warning, minDate, maxDate, isReadOnly }) {
  const [viewedMonthIndex, setViewedMonthIndex] = useState(0);
  const wrapperRef = useRef(null);
  const monthPickerRef = useRef(null);
  const [currentMachine, sendToMachine] = useMachine(Machine);
  const parsedMinDate = useMemo(() => getParsedDate(minDate, true), [minDate]);
  const parsedMaxDate = useMemo(() => getParsedDate(maxDate, false), [maxDate]);

  const monthSource = useMemo(() => {
    const months = Math.abs(parsedMaxDate.diff(parsedMinDate, "month"));
    let m = parsedMinDate.month();
    let y = parsedMinDate.year();

    const result = [];

    [...Array(months + 1).keys()].forEach(() => {
      if (!(y === parsedMinDate.year() && m < parsedMinDate.month())) {
        result.push(buildMonthRowSource(m + 1, y));
      }

      if (m === 11) {
        m = 0;
        y += 1;
      } else {
        m += 1;
      }
    });

    return result;
  }, [parsedMinDate, parsedMaxDate]);

  const viewedMonth = useMemo(() => {
    return _.get(monthSource, `[${viewedMonthIndex}]`);
  }, [monthSource, viewedMonthIndex]);

  const daySource = useMemo(() => {
    if (_.isNil(viewedMonth, "month") || _.isNil(viewedMonth, "year")) {
      return 0;
    }

    return dayjs()
      .month(_.get(viewedMonth, "month") - 1)
      .year(_.get(viewedMonth, "year"))
      .daysInMonth();
  }, [viewedMonth]);

  /** Special Events **/

  useOnClickOutside(wrapperRef, () => {
    sendToMachine("IDLE");
  });

  useOnClickOutside(monthPickerRef, () => {
    if (currentMachine.matches("collapsed")) {
      sendToMachine("MONTH_IDLE");
    }
  });

  /** Callbacks **/

  const onClickWrapper = useCallback(() => {
    if (!isReadOnly) {
      if (currentMachine.matches("idle")) {
        sendToMachine("COLLAPSE");
      } else if (currentMachine.matches("collapsed")) {
        sendToMachine("IDLE");
      }
    }
  }, [currentMachine, isReadOnly, sendToMachine]);

  const onClickMonthPicker = useCallback(() => {
    if (!isReadOnly) {
      if (currentMachine.matches("collapsed.idle")) {
        sendToMachine("MONTH_COLLAPSE");
      } else if (currentMachine.matches("collapsed.collapsed")) {
        sendToMachine("MONTH_IDLE");
      }
    }
  }, [currentMachine, isReadOnly, sendToMachine]);

  const onClickArrow = useCallback(
    (left = true) => {
      if (!isReadOnly && !currentMachine.matches("collapsed.collapsed")) {
        let move = null;
        if (left && viewedMonthIndex > 0) {
          move = viewedMonthIndex - 1;
        } else if (!left && viewedMonthIndex < monthSource.length - 1) {
          move = viewedMonthIndex + 1;
        }

        if (move !== null) {
          setViewedMonthIndex(move);
        }
      }
    },
    [currentMachine, monthSource, isReadOnly, viewedMonthIndex],
  );

  const onClickArrowLeft = useCallback(() => {
    onClickArrow(true);
  }, [onClickArrow]);

  const onClickArrowRight = useCallback(() => {
    onClickArrow(false);
  }, [onClickArrow]);

  const onClickMonthRow = useCallback(
    (source, index) => {
      if (_.toNumber(_.get(viewedMonth, "month")) !== source.month || _.toNumber(_.get(viewedMonth, "year")).safeNumber !== source.year) {
        setViewedMonthIndex(index);
      }
      sendToMachine("MONTH_IDLE");
    },
    [sendToMachine, viewedMonth],
  );

  const onDatePick = useCallback(
    data => {
      if (isReadOnly) {
        return;
      }

      if (_.isNil(data)) {
        onUpdate({ ...initalState.value });
        sendToMachine("IDLE");
        return;
      }

      const { year, month, day } = data;
      const picked = dayjs()
        .year(year)
        .month(month - 1)
        .date(day)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);

      const payload = {
        day,
        month,
        year,
        label: picked.format("MMMM DD, YYYY"),
      };
      onUpdate({ ...payload });
      sendToMachine("IDLE");
    },
    [isReadOnly, onUpdate, sendToMachine],
  );

  const onResetViewedMonth = useCallback(() => {
    const index = monthSource.findIndex(
      ({ month, year }) => month === _.toNumber(_.get(value, "month")) && year === _.toNumber(_.get(value, "year")),
    );
    if (index !== viewedMonthIndex) {
      setViewedMonthIndex(index < 1 ? 0 : index);
    }
  }, [monthSource, value, viewedMonthIndex]);

  /** Effects */

  useEffect(() => {
    if (currentMachine.matches("idle")) {
      onResetViewedMonth();
    }
  }, [currentMachine, onResetViewedMonth]);

  /** When the dropdown is closed, revert viewed month to the chosen month */

  const monthPickerLabel = useMemo(() => {
    if (!_.isNil(viewedMonth)) {
      return dayjs()
        .year(_.toNumber(_.get(viewedMonth, "year")))
        .month(_.toNumber(_.get(viewedMonth, "month")) - 1)
        .format("MMMM YYYY");
    } else {
      return "";
    }
  }, [viewedMonth]);

  return (
    <Frame className={className} id={id} label={label} warning={warning} help={help}>
      <Wrapper ref={wrapperRef}>
        <Holder data-purpose="holder" placeholder={placeholder} onClick={onClickWrapper}>
          {_.get(value, "label")}
        </Holder>
        <DropdownWrapper isOpen={currentMachine.matches("collapsed")}>
          <DropdownHeader>
            <ArrowButton onClick={onClickArrowLeft} isEnabled={viewedMonthIndex > 0}>
              <ArrowLeftWrapper>
                <ArrowLeft style={{ fontSize: "11pt" }} />
              </ArrowLeftWrapper>
            </ArrowButton>

            <MonthPicker>
              <MonthTitle onClick={onClickMonthPicker}>
                <p>{monthPickerLabel}</p>
                <DropdownArrowButton>
                  <ArrowDownWrapper>
                    <ArrowDown style={{ fontSize: "11pt" }} />
                  </ArrowDownWrapper>
                </DropdownArrowButton>
              </MonthTitle>

              <MonthDropdown ref={monthPickerRef} isOpen={currentMachine.matches("collapsed.collapsed")}>
                {monthSource.map((month, index) => (
                  <MonthRow
                    key={month.label}
                    onClick={() => onClickMonthRow(month, index)}
                    isActive={_.toNumber(viewedMonthIndex) === index}
                  >
                    <p>{month.label}</p>
                  </MonthRow>
                ))}
              </MonthDropdown>
            </MonthPicker>
            <ArrowButton onClick={onClickArrowRight} isEnabled={viewedMonthIndex < monthSource.length - 1}>
              <ArrowRightWrapper>
                <ArrowRight style={{ fontSize: "11pt" }} />
              </ArrowRightWrapper>
            </ArrowButton>
          </DropdownHeader>
          <DropdownContent>
            <DayPicker>
              {[...Array(daySource).keys()].map(day => (
                <DayCell
                  key={day}
                  isActive={
                    _.get(value, "year") === _.get(viewedMonth, "year") &&
                    _.get(value, "month") === _.get(viewedMonth, "month") &&
                    _.get(value, "day") === day + 1
                  }
                  onClick={() => {
                    onDatePick({
                      year: _.toNumber(_.get(viewedMonth, "year")),
                      month: _.toNumber(_.get(viewedMonth, "month")),
                      day: day + 1,
                    });
                  }}
                >
                  <p>{day + 1}</p>
                </DayCell>
              ))}
              <DayCell onClick={() => onDatePick(null)}>
                <p>x</p>
              </DayCell>
            </DayPicker>
          </DropdownContent>
        </DropdownWrapper>
      </Wrapper>
    </Frame>
  );
}

InputDate.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  help: descriptor.Label.propTypes.help,
  label: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.shape({}),
  warning: PropTypes.string,

  minDate: PropTypes.string,
  maxDate: PropTypes.string,

  isReadOnly: PropTypes.bool,
};

InputDate.defaultProps = {
  className: null,
  label: null,
  help: null,
  placeholder: null,
  value: null,
  warning: null,

  minDate: null,
  maxDate: null,

  isReadOnly: false,
};

export default InputDate;
