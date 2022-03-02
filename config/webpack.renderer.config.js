const path = require("path");

console.log("[webpack] Loading electron main config");

module.exports = {
  entry: "./src/renderer/preload.ts",
  target: "electron-preload",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "preload.js",
    path: path.resolve(__dirname, "..", ".webpack")
  },
  watch: false
};
