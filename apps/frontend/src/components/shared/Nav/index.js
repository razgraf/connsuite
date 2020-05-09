import React from "react";
import PropTypes from "prop-types";
import { types } from "../../../constants";

import NavPresentation from "./presentation";
import NavPlatform from "./platform";
import { NavProfile } from "./special";

export default function Nav({ appearance, ...otherProps }) {
  switch (appearance) {
    case types.nav.presentation:
      return <NavPresentation {...otherProps} />;
    case types.nav.profile:
      return <NavProfile {...otherProps} />;
    case types.nav.platform:
    default:
      return <NavPlatform {...otherProps} />;
  }
}

Nav.propTypes = {
  appearance: PropTypes.oneOf(Object.values(types.nav)),
};

Nav.defaultProps = {
  appearance: types.nav.platform,
};
