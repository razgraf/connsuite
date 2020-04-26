import { useMemo } from "react";
import { types } from "../../../constants";
import { colors, gradients } from "../../../themes";
import { rgba } from "polished";

const baseSolid = {
  background: colors.dark,
  backgroundHover: null,
  appearance: types.button.appearance.solid,
  border: null,
  borderHover: null,
  color: colors.white,
  colorHover: null,
  shadow: null,
  shadowHover: null,
};

const baseOutline = {
  ...baseSolid,
  background: rgba(colors.white, 0),
  backgroundHover: rgba(colors.white, 0.1),
  appearance: types.button.appearance.outline,
  border: colors.dark,
  borderHover: null,
  color: colors.dark,
};

export const useDesigner = (accent, appearance) => {
  const result = useMemo(() => {
    switch ([appearance, accent].join(".")) {
      /** SOLID */
      case [types.button.appearance.solid, types.button.accent.primary].join("."):
        return { ...baseSolid, background: colors.primary };
      case [types.button.appearance.solid, types.button.accent.secondary].join("."):
        return { ...baseSolid, background: colors.secondary };
      case [types.button.appearance.solid, types.button.accent.dark].join("."):
        return { ...baseSolid, background: colors.dark };
      case [types.button.appearance.solid, types.button.accent.white].join("."):
        return { ...baseSolid, background: colors.white, color: colors.dark };
      /** GRADIENT */
      case [types.button.appearance.gradient, types.button.accent.primary].join("."):
        return { ...baseSolid, background: gradients.primary };
      /** OUTLINE */
      case [types.button.appearance.outline, types.button.accent.primary].join("."):
        return { ...baseOutline, border: colors.primary, color: colors.primary };
      case [types.button.appearance.outline, types.button.accent.white].join("."):
        return { ...baseOutline, border: colors.white, color: colors.white };
      case [types.button.appearance.outline, types.button.accent.whiteToPrimary].join("."):
        return {
          ...baseOutline,
          border: colors.white,
          color: colors.white,
          background: colors.transparent,
          backgroundHover: colors.white,
          colorHover: colors.primary,
        };
      default:
        return baseSolid;
    }
  }, [accent, appearance]);

  return result;
};

export const { appearance } = types.button;
