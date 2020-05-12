import React from "react";
import PropTypes from "prop-types";
import { types } from "../../../constants";

import NavPresentation from "./presentation";
import NavPlatform from "./platform";
import { NavProfile, NavSecondary } from "./special";

export default function Nav({ appearance, ...otherProps }) {
  switch (appearance) {
    case types.nav.appearance.presentation:
      return <NavPresentation {...otherProps} />;
    case types.nav.appearance.profile:
      return <NavProfile {...otherProps} />;
    case types.nav.appearance.secondary:
      return <NavSecondary {...otherProps} />;
    case types.nav.appearance.platform:
    default:
      return <NavPlatform {...otherProps} />;
  }
}

Nav.propTypes = {
  accent: PropTypes.oneOf(Object.values(types.nav.accent)),
  appearance: PropTypes.oneOf(Object.values(types.nav.appearance)),
  className: PropTypes.string,
};

Nav.defaultProps = {
  accent: types.nav.accent.transparent,
  appearance: types.nav.appearance.platform,
  className: null,
};
