const colors = {
  primary: "#04BEFE", // "#FF1010",
  secondary: "#4481EB", // "#020D4F",
  white: "#ffffff",
  black: "#000000",
  dark: "#1f2133",

  grayGhost: "#fcfcfc",
  grayLight: "#f5f5f5",
  grayAccent: "#eeeeee",
  grayClear: "#dddddd",
  grayBlueBlack: "#40474f",
  grayBlueNight: "#6d8097",
  grayBlueDark: "#8B9AAC",
  grayBlueMedium: "#b3bed5",
  grayBlueNormal: "#d5dbe1",
  grayBlueLight: "#e4e8f0",
  grayBlueGhost: "#F6F9FE",

  transparent: "transparent",
  background: "#f3f8fa",

  blue: "#2979FF",
  blueSuite: "#04BEFE",
  blueFaded: "#03A0DC",
  purple: "#7F00FF",
  pink: "#E100FF",
  red: "#F44336",
  green: "#4CAF50",
  yellow: "#FFEB3B",
  orange: "#FF9800",

  google: "#E13F2A",
};

export const gradients = {
  primary: `linear-gradient(25deg, ${colors.secondary} 30%, ${colors.primary})`,
  gold: `linear-gradient(25deg, ${colors.orange} 30%, ${colors.yellow})`,
};

export default colors;
