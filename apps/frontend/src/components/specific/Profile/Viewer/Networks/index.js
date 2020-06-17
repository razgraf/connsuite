import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import Network, { NetworkMissing } from "../../../../shared/Network";
import Placeholder from "../../../../shared/Placeholder";
import { useProfileIntersection } from "../../../../../hooks";
import { types } from "../../../../../constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: calc(${props => props.theme.sizes.edge} * 1) calc(${props => props.theme.sizes.edge} * 2)
    calc(${props => props.theme.sizes.edge} * 3);
  background: ${props => props.theme.colors.white};
  transition: border 200ms;
  @media ${props => props.theme.medias.medium} {
    padding-left: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
    padding-right: calc(${props => props.theme.sizes.sectionEdgeMobile} * 1);
  }
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  min-height: 280px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column-gap: ${props => props.theme.sizes.edge};
  grid-row-gap: calc(${props => props.theme.sizes.edge} * 1.5);
  grid-auto-rows: 1fr;
  z-index: 100;
  & > * {
    grid-column: span 1;
    flex-grow: 0;
  }

  @media ${props => props.theme.medias.medium} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${props => props.theme.medias.small} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: ${props => props.theme.sizes.sectionEdgeMobile};
    grid-row-gap: calc(${props => props.theme.sizes.edge} * 1);
  }
`;

function Networks({ className, networks, isLoading, onIntersect }) {
  const { ref, isObserved } = useProfileIntersection(payload => onIntersect(types.profile.section.networks, payload));

  return (
    <Wrapper className={className} ref={ref} id={types.profile.section.networks}>
      <SectionHeader title="Networks" isLoading={isLoading} isObserved={isObserved} />
      <Content>
        <Grid>
          {!isLoading && !networks.length ? <NetworkMissing /> : null}
          {networks.map(network => (
            <Network key={network._id} {...network} />
          ))}
        </Grid>
        <Placeholder isActive={isLoading} type={t => t.networks} />
      </Content>
    </Wrapper>
  );
}

Networks.propTypes = {
  reference: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
  className: PropTypes.string,
  networks: PropTypes.arrayOf(PropTypes.shape({})),
  isLoading: PropTypes.bool,
  onIntersect: PropTypes.func,
};

Networks.defaultProps = {
  reference: null,
  className: null,
  networks: [],
  isLoading: false,
  onIntersect: () => {},
};

export default Networks;
