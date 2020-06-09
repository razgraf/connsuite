import _ from "lodash";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import IconStatistics from "@material-ui/icons/DescriptionOutlined";
import { useSelector } from "react-redux";
import { components } from "../../../../themes";
import { useVisitListMachine, useSelfArticles } from "../../../../hooks";
import { Spinner } from "../../../atoms";
import { types } from "../../../../constants";
import Range from "../Range";
import ArticleCard from "./ArticleCard";

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
`;

function Articles() {
  const [timeQuery, setTimeQuery] = useState({ from: null, to: null });

  const articles = useSelfArticles();
  const machine = useVisitListMachine();
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

  useEffect(() => console.log(dataset), [dataset]);

  return (
    <Section>
      <Range onPickRange={onPickRange} isLoading={machine.current.value === machine.states.request} title="Article Events" />
      <ChartWrapper>
        {dataset.map(item => (
          <ArticleCard key={item._id} {...item} />
        ))}
      </ChartWrapper>
    </Section>
  );
}

export default Articles;
