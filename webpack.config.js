var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './client.js',
  mode: "production",
  output: {
    publicPath: "/dist/",
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] }
    ]
  },
  plugins: [new ExtractTextPlugin("main.css")]
};