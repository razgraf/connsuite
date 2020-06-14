import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { components } from "../../../../themes";
import { useVisitMachine, useSelfArticles } from "../../../../hooks";
import { types } from "../../../../constants";
import Range from "../Range";
import ArticleCard from "./ArticleCard";

const Wrapper = styled(components.Section)`
  width: 100%;
  overflow-x: hidden;
`;

const ChartWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: ${props => props.theme.sizes.edge};
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  border-radius: 0 0 4px 4px;
  padding: 20px;
  min-height: 100px;

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

  @media ${props => props.theme.medias.medium} {
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
    grid-gap: 10px;
  }
  @media ${props => props.theme.medias.small} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function Articles() {
  const [timeQuery, setTimeQuery] = useState({ from: null, to: null });

  const articles = useSelfArticles();
  const machine = useVisitMachine();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    machine.send(machine.events.request, {
      payload: {
        auth,
        type: types.visit.type.article,
        ...timeQuery,
      },
    });
  }, [timeQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const statistics = useMemo(() => {
    if (machine.current.value !== machine.states.success) return [];
    return _.get(machine, "current.context.data.result.statistics");
  }, [machine]);

  const dataset = useMemo(
    () =>
      _.toArray(_.get(articles, "list")).map(item => {
        const value = _.get(
          statistics.find(s => s._id === item._id),
          "count",
        );
        return {
          ...item,
          value: value || 0,
        };
      }),
    [articles, statistics],
  );

  const onPickRange = useCallback(
    query => {
      setTimeQuery(query);
      machine.send({ type: machine.events.reset });
    },
    [setTimeQuery, machine],
  );

  return (
    <Wrapper>
      <Range onPickRange={onPickRange} isLoading={machine.current.value === machine.states.request} title="Article Events" />
      <ChartWrapper>
        {dataset.map(item => (
          <ArticleCard key={item._id} {...item} />
        ))}
      </ChartWrapper>
    </Wrapper>
  );
}

export default Articles;
