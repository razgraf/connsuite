import { useMemo } from "react";
import { rgba, lighten } from "polished";
import { colors, gradients } from "../../../themes";

const types = {
  button: {
    appearance: {
      solid: "solid",
      outline: "outline",
      gradient: "gradient",
    },
    accent: {
      white: "white",
      whiteToPrimary: "whiteToPrimary",
      primary: "primary",
      secondary: "secondary",
      darkGray: "darkGray",
      google: "google",
    },
    type: {
      button: "button",
      lin: "link",
      router: "router",
      routerDecorator: "router-decorator",
      hashRouter: "hash-router",
    },
  },
};

const baseSolid = (b = colors.dark, c = colors.dark) => ({
  background: b,
  backgroundHover: lighten(0.05, b),
  appearance: types.button.appearance.solid,
  border: null,
  borderHover: null,
  color: colors.white,
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
          return { ...baseSolid(colors.secondary) };
        case types.button.accent.dark:
          return { ...baseSolid(colors.dark) };
        case types.button.accent.white:
          return { ...baseSolid(colors.white, colors.dark) };
        case types.button.accent.google:
          return { ...baseSolid(colors.google, colors.white) };
        default:
          break;
      }
    } else if (appearance === types.button.appearance.gradient) {
      switch (accent) {
        case types.button.accent.primary:
          return { ...baseSolid(), background: gradients.primary };
        default:
          break;
      }
    } else if (types.button.appearance.outline) {
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

        default:
          break;
      }
    }

    return baseSolid();
  }, [accent, appearance]);

  return result;
};

export { types };
