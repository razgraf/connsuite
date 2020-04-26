export const pages = {};

export const subpages = {};

export const vendors = {};

export const actions = {
  SET: "SET",
};

export const types = {
  nav: {
    platform: "platform",
    presentation: "presentation",
  },
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

const constants = {
  actions,
  pages,
  subpages,
  types,
  vendors,
};

export default constants;
