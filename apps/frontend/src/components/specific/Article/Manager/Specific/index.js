import React from "react";
import PropTypes from "prop-types";

import External from "./external";
import Internal from "./internal";
import { types } from "../../../../../constants";

function Specific({ className, reducer, setContentInstance }) {
  if (reducer.state.type.value === types.article.type.internal)
    return <Internal className={className} reducer={reducer} setContentInstance={setContentInstance} />;
  if (reducer.state.type.value === types.article.type.external) return <External className={className} reducer={reducer} />;
  return <></>;
}

Specific.propTypes = {
  className: PropTypes.string,
  reducer: PropTypes.shape({}).isRequired,
  setContentInstance: PropTypes.func.isRequired,
};

Specific.defaultProps = {
  className: null,
};

export default Specific;
