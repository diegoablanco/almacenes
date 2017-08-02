
const webpack = require('webpack'); // eslint-disable-line import/no-unresolved
const rucksack = require('rucksack-css');
const path = require('path');
const RewriteImportPlugin = require("less-plugin-rewrite-import")
const ROOT_DIR = path.resolve(__dirname);
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

// ********** Note require('config') is not used here. Any params must be set in process.env *******
var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {
  context: path.join(__dirname, './client'),
  devtool: 'eval-source-map',
  entry: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './index.js'],
  output: {
    path: path.join(__dirname, './public/dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // When require'd, these /client/../*.inject.css files are injected into the DOM as is.
        test: /\.inject\.css$/,
        include: /client/,
        loader: 'style!css',
      },
      {
        // When required, the class names in these /client/../*.css are returned as an object.
        // after being made unique. The css with the modified class names is injected into the DOM.
        test: /^(?!.*\.inject\.css).*\.css$/,
        include: /client/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=' +
          '[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        // Standard processing for .css outside /client
        test: /\.css$/,
        exclude: /client/,
        use: [
          { loader: "style-loader" },
          {
            loader: 'css-loader',
            options: { 
              }
          }
        ]
      },     
      {
          test: /\.less/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "less-loader", options: 
              {
                paths: [ROOT_DIR, NODE_MODULES_DIR], // this will force less-loader to use its own resolver, both should be absolute path
                plugins: [
                  new RewriteImportPlugin({
                    paths: {
                      '../../theme.config':  __dirname + '/client/semantic-ui/theme.config',
                    },
                  }),
                ],
              }
          }]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: alias
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // Define replacements for global constants in the client code.
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }, // used by React, etc?
      __processEnvNODE_ENV__: JSON.stringify(process.env.NODE_ENV), // used by us
    }),
  ],
};
