import sizes from "./sizes";

const medias = {
  canvas: "1200px",

  mobile: "all and (max-width: 480px)",
  tablet: "all and (max-width: 600px)",

  small: "all and (max-width: 640px)",
  medium: "all and (max-width: 960px)",

  small_w_sidebar: `all and (max-width: calc(640px + ${sizes.sideBarWidth}))`,
};

export default medias;
