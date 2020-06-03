import _ from "lodash";
import { useMemo } from "react";
import { rgba, lighten, darken } from "polished";
import { colors, gradients } from "../../../themes";

const interpret = source => {
  const r = {};
  Object.keys(source).forEach(key => {
    r[key] = key;
  });
  return r;
};

const types = {
  button: {
    appearance: {
      solid: "solid",
      outline: "outline",
      gradient: "gradient",
      transparent: "transparent",
    },
    accent: {
      ...interpret(colors),
      ...interpret(gradients),
      white: "white",
      whiteToPrimary: "whiteToPrimary",
      whiteTransparent: "whiteTransparent",
      primary: "primary",
      secondary: "secondary",
      grayBlueDark: "grayBlueDark",
      grayBlueMedium: "grayBlueMedium",
      grayBlueNormal: "grayBlueNormal",
      grayBlueLight: "grayBlueLight",
      red: "red",
      remove: "remove",
      google: "google",
      cancel: "cancel",
    },
    type: {
      button: "button",
      link: "link",
      router: "router",
      routerDecorator: "router-decorator",
    },
  },
};

const baseSolid = (b = colors.dark, c = colors.white) => ({
  background: b,
  backgroundHover: lighten(0.05, b),
  appearance: types.button.appearance.solid,
  border: null,
  borderHover: null,
  color: c,
  colorHover: null,
  shadow: null,
  shadowHover: null,
});

const baseOutline = (b = colors.dark, c = colors.dark) => ({
  ...baseSolid,
  background: rgba(b, 0),
  backgroundHover: rgba(b, 0.05),
  appearance: types.button.appearance.outline,
  border: b,
  borderHover: null,
  color: c,
});

export const useDesigner = (accent, appearance) => {
  const result = useMemo(() => {
    if (appearance === types.button.appearance.solid) {
      switch (accent) {
        case types.button.accent.primary:
          return { ...baseSolid(colors.primary) };
        case types.button.accent.secondary:
          return { ...baseSolid(colors.secondary), backgroundHover: darken(0.1, colors.secondary) };
        case types.button.accent.dark:
          return { ...baseSolid(colors.dark) };
        case types.button.accent.white:
          return { ...baseSolid(colors.white, colors.dark) };
        case types.button.accent.remove:
        case types.button.accent.red:
          return { ...baseSolid(colors.red, colors.white), backgroundHover: darken(0.1, colors.red) };
        case types.button.accent.google:
          return { ...baseSolid(colors.google, colors.white) };
        case types.button.accent.whiteTransparent:
          return { ...baseSolid(rgba(colors.white, 0.1), rgba(colors.white, 0.5)), backgroundHover: rgba(colors.white, 0.3) };
        case types.button.accent.grayBlueDark:
          return { ...baseSolid(colors.grayBlueDark, colors.dark) };
        case types.button.accent.grayBlueMedium:
          return { ...baseSolid(colors.grayBlueMedium, colors.white) };
        case types.button.accent.grayBlueNormal:
          return { ...baseSolid(colors.grayBlueNormal, colors.grayBlueDark) };
        case types.button.accent.grayBlueLight:
          return { ...baseSolid(colors.grayBlueLight, colors.grayBlueDark) };
        case types.button.accent.transparentGrayBlueDark:
          return { ...baseSolid(colors.transparent, colors.grayBlueDark) };
        default:
          if (_.has(colors, accent)) return { ...baseSolid(colors[accent], colors.white) };
          break;
      }
    } else if (appearance === types.button.appearance.gradient) {
      switch (accent) {
        case types.button.accent.primary:
          return { ...baseSolid(), background: gradients.primary };
        default:
          if (_.has(gradients, accent)) return { ...baseSolid(), background: gradients[accent] };
          break;
      }
    } else if (appearance === types.button.appearance.outline) {
      switch (accent) {
        case types.button.accent.primary:
          return {
            ...baseOutline(),
            border: colors.primary,
            color: colors.primary,
            backgroundHover: colors.primary,
            colorHover: colors.white,
          };

        case types.button.accent.secondary:
          return {
            ...baseOutline(),
            border: colors.secondary,
            color: colors.secondary,
            backgroundHover: colors.secondary,
            colorHover: colors.white,
          };
        case types.button.accent.white:
          return { ...baseOutline(colors.white, colors.white) };
        case types.button.accent.whiteToPrimary:
          return {
            ...baseOutline(),
            border: colors.white,
            color: colors.white,
            background: colors.transparent,
            backgroundHover: colors.white,
            colorHover: colors.primary,
          };
        case types.button.accent.grayBlueDark:
          return {
            ...baseOutline(colors.grayBlueDark, colors.grayBlueDark),
            backgroundHover: rgba(colors.grayBlueDark, 0.2),
          };
        case types.button.accent.grayBlueMedium:
          return {
            ...baseOutline(colors.grayBlueMedium, colors.grayBlueDark),
            backgroundHover: rgba(colors.grayBlueDark, 0.2),
          };

        case types.button.accent.remove:
          return {
            ...baseOutline(),
            border: colors.red,
            color: colors.red,
            backgroundHover: colors.red,
            colorHover: colors.white,
          };
        case types.button.accent.cancel:
          return {
            ...baseOutline(colors.grayBlueLight, colors.dark),
            backgroundHover: rgba(colors.grayBlueDark, 0.2),
          };
        default:
          if (_.has(colors, accent)) return { ...baseOutline(colors[accent], colors[accent]) };
          break;
      }
    } else if (appearance === types.button.appearance.transparent) {
      switch (accent) {
        default:
          if (_.has(colors, accent))
            return { ...baseSolid(rgba(colors.dark, 0), colors[accent]), backgroundHover: rgba(colors.dark, 0.05) };
          break;
      }
    }

    return baseSolid();
  }, [accent, appearance]);

  return result;
};

export { types };
