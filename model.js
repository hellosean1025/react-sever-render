import moox from "moox";
import user from "./models/user";
const isNode = typeof global == "object" && global.global === global;
const config = {};

if (!isNode) {
  config.preloadedState = window.__INITIAL_STATE__
}

module.exports =  moox(
  {
    user
  },
  config
);
