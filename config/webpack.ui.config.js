const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.log("[webpack] Loading UI dev config");

module.exports = {
  entry: "./src/renderer/ui/index.tsx",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Air Alarm",
      inject: "body",
      template: __dirname + "/../src/renderer/ui/index.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|wav)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..",".webpack", "static")
  },
};