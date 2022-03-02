const mainConfig = require("./webpack.main.config");
const uiConfig = require("./webpack.ui.config");
const preloadConfig = require("./webpack.renderer.config");

module.exports = [mainConfig, uiConfig, preloadConfig];
