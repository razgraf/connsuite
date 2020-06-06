import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SectionHeader from "../SectionHeader";
import Network from "../../../shared/Network";
import Placeholder from "../../../shared/Placeholder";
import { useProfileIntersection } from "../../../../hooks";
import { types } from "../../../../constants";

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
  @media all and (max-width: ${props => props.theme.medias.medium}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media all and (max-width: ${props => props.theme.medias.small}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

function Networks({ className, networks, isLoading, onIntersect }) {
  const { ref, isObserved } = useProfileIntersection(payload => onIntersect(types.profile.section.networks, payload));

  return (
    <Wrapper className={className} ref={ref}>
      <SectionHeader title="Networks" isLoading={isLoading} isObserved={isObserved} />
      <Content>
        <Grid>
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
