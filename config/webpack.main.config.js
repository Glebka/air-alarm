const path = require("path");

console.log("[webpack] Loading electron main config");

module.exports = {
  entry: "./src/main.ts",
  target: "electron-main",
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
    filename: "main.js",
    path: path.resolve(__dirname, "..", ".webpack")
  },
  watch: false
};
