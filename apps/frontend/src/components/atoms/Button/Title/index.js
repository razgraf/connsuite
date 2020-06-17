import _ from "lodash";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TitleWrapperPartial = styled.div`
  z-index: 2;
`;

const TitleLabel = styled.p`
  font-size: ${props => props.theme.sizes.buttonTitle};
  font-weight: 600;
  margin: 0px 2px;
  text-align: center;

  @media ${props => props.theme.medias.small} {
    display: none;
    margin: 0px 4px;
  }
`;

const MediumTitleLabel = styled(TitleLabel)`
  display: none;

  @media ${props => props.theme.medias.small} {
    display: flex;
  }

  @media ${props => props.theme.medias.small} {
    display: none;
  }
`;

const ShortTitleLabel = styled(TitleLabel)`
  display: none;

  @media ${props => props.theme.medias.small} {
    display: flex !important;
  }
`;

const TitleWrapper = styled(TitleWrapperPartial)`
  color: currentColor;

  ${props => props.parent} > * {
    color: currentColor;
  }

  &[data-mini="true"] > ${TitleLabel} {
    font-size: ${props => props.theme.sizes.buttonTitleMini};
    font-weight: 600;
  }
`;

function Title({ design, isMini, parent, title, titleMedium, titleShort }) {
  const renderTitleSizes = useCallback(() => {
    const valueM = !_.isNil(titleMedium) ? titleMedium : title;
    const medium = !_.isNil(valueM) ? <MediumTitleLabel>{valueM}</MediumTitleLabel> : null;

    const valueS = !_.isNil(titleShort) ? titleShort : valueM;
    const short = !_.isNil(valueS) ? <ShortTitleLabel>{valueS}</ShortTitleLabel> : null;

    return (
      <>
        {medium}
        {short}
      </>
    );
  }, [title, titleMedium, titleShort]);

  return (
    <TitleWrapper design={design} parent={parent} data-component="title" data-mini={isMini}>
      <TitleLabel>{title}</TitleLabel>
      {renderTitleSizes()}
    </TitleWrapper>
  );
}

Title.propTypes = {
  design: PropTypes.shape({}).isRequired,
  isMini: PropTypes.bool,
  parent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  titleShort: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // empty string will hide the title on small screens
  titleMedium: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // empty string will hide the title on medium screens
};

Title.defaultProps = {
  isMini: false,
  titleShort: null,
  titleMedium: null,
};

export default Title;
