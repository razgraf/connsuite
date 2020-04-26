const withPlugins = require("next-compose-plugins");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");
const withImages = require("next-images");
const withVideos = require("next-videos");

dotenvLoad();

const withNextEnv = nextEnv({
  staticPrefix: "REACT_APP",
  publicPrefix: "REACT_APP",
});

module.exports = withPlugins([withNextEnv, withVideos, withImages]);
