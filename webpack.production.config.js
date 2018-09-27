
/* eslint-env node */
/* eslint no-console: 0, no-var: 0 */

// Webpack config for PRODUCTION and DEVELOPMENT modes.
// Changes needed if used for devserver mode.

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const envalid = require('envalid');
const path = require('path');
const RewriteImportPlugin = require('less-plugin-rewrite-import')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


// Validate environment variables
function validateEnvironmentVariables() {
  const strPropType = envalid.str;

  // valid NODE_ENV values.
  const nodeEnv = {
    production: 'production',
    prod: 'production',
    development: 'development',
    dev: 'development',
    devserver: 'devserver',
    testing: 'devserver',
    test: 'devserver'
  };

  const cleanEnv = envalid.cleanEnv(
    process.env,
    {
      NODE_ENV: strPropType({
        choices: Object.keys(nodeEnv),
        default: 'developmwent',
        desc: 'processing environment'
      })
    }
  );

  process.env.NODE_ENV = nodeEnv[cleanEnv.NODE_ENV];
}

const extractLess = new ExtractTextPlugin({
  filename: '[name].[contenthash].css'
  // disable: process.env.NODE_ENV === 'development'
})
const ROOT_DIR = path.resolve(__dirname);
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules');

// Validate environment variables
validateEnvironmentVariables();

const config = require('config');

if (config.NODE_ENV === 'devserver') {
  throw new Error('This webpack config does not work as is with the web-dev-server.')
}

const { isProduction } = config

const outputPublicPaths = {
  production: '/almacenes/server/public/dist/',
  development: '/dist/',
  devserver: 'http://localhost:8080/' // we don't use this config for webpack-dev-server
};

console.log(`----- ${config.NODE_ENV.toUpperCase()} build.`); // eslint-disable-line no-console

// Base Webpack configuration
const webpackConfig = {
  context: path.join(__dirname, 'client'),
  // re devtool: http://cheng.logdown.com/posts/2016/03/25/679045
  devtool: isProduction ? 'cheap-module-source-map' : 'source-map',
  entry: {
    main: ['./index.jsx']
  },
  output: {
    filename: '[name].bundle.[chunkhash].js',
    /* We'd need this if we had chunks
    chunkFilename: '[name].bundle.[chunkhash].js',
     */
    /*
      Let's try to clear up a topic some people may find confusing. (I did!)

      Webpack writes its bundles to folder output.path. Let's say we make that "/.../public/dist".
      The HTTP server will have routing like
        app.use('/', feathers.static('public')).use('/', feathers.static('public/dist')).
      The 'public' finds assets in /public not processed by Webpack, e.g. favicon.ico,
      while 'public/dist' finds assets written by Webpack into /public/dist because of output.path.

      So far so good, but that's not the whole story.
      There are likely relative URL strings inside CSS, HTML source files processed by Webpack.
      These are no longer correct when their directory locations have been changed by output.path.
      The original
        .image { background-image: url('./test.png'); }
      in CSS now residing in output.path now points to the wrong place.

      This is where output.publicPath comes in. It is used by several Webpack plugins
      to prepend the URLs inside CSS, HTML files when generating builds.

      Let's say:
        output.path  = "/.../public/dist"
        output.publicPath = "/public/"
        main.js contains
          import './main.css';
        which will cause Webpack to include ./main.css in a bundle.
        ./main.css contains
          .image { background-image: url('./test.png'); }
        which is intended to refer to a file located in /public. Note that such a reference does not
        make Webpack place test.png in a bundle. The file will remain in /public.

      Because of output.publicPath, Webpack's url-loader will translate
        .image { background-image: url('./test.png'); }
      to
        .image { background-image: url('/public/test.png'); }
      and the server's routing will correctly find test.png in /public
      tl;dr: '/public/' + './test.png' = '/public/test.png'.

      You can do something clever by letting
        output.publicPath = "//someCDN/"
      Now
        ./test.pgn
      is translated to
        //someCDN/test.pgn
      and all your assets are served by the CDN.

      A well known example is letting
        output.publicPath = "http://localhost:8080/"
      because 8080 is the default port used by the Webpack-dev-server.
      Now
        src="main.bundle.js"
      is translated to
        src="http://localhost:8080/main.bundle.js"
      You can now start your server on, say, 3030, while you start webpack-dev-server on 8080.
      Webpack-dev-server will serve the file on 8080, reading it quickly from its memory cache.
    */
    // Tell Webpack where it should store the resulting code.
    path: path.join(__dirname, 'server', 'public', 'dist'),
    // Give Webpack the URL that points the server to output.path
    publicPath: outputPublicPaths[config.NODE_ENV]
  },
  module: {
    rules: [
      {
        // File index.html is created by html-webpack-plugin. It should be a file webpack processes.
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        // When require'd, these /client/../*.inject.css files are injected into the DOM as is.
        test: /\.inject\.css$/,
        include: /client/,
        loader: 'style!css'
      },
      {
        // When required, the class names in these /client/../*.css are returned as an object.
        // after being made unique. The css with the modified class names is injected into the DOM.
        test: /^(?!.*\.inject\.css).*\.css$/,
        include: /client/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      },
      {
        // Standard processing for .css outside /client
        test: /\.css$/,
        exclude: /client/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/, // does anyone still use .jsx?
        exclude: /(node_modules|bower_components)/,
        loaders: [
          /*
          'react-hot',
          */
          'babel-loader'
        ]
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options:
              {
                paths: [ROOT_DIR, NODE_MODULES_DIR],
                plugins: [
                  new RewriteImportPlugin({
                    paths: {
                      '../../theme.config': `${__dirname}/client/semantic-ui/theme.config`
                    }
                  })
                ]
              }
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // Reroute import/require to specific files. 'react$' reroutes 'react' but not 'react/foo'.
    alias: {
      /*
       React docs used to strongly recommend you use their production builds in the
       production environment.

       Some number of developers were happy enough using the development version
       with NODE_ENV set to production. The React docs regarding npm, as of Sept. 2016,
       now also mention doing this as long as a minifier that performs dead-code elimination
       is also used.

       The following aliases route our import/require to use the development builds
       of React, Redux and React-Router. You can comment them out if you want to go the
       minification route as the DefinePlugin and UglifyJsPlugin below will minimize the
       packages as per React's npm documentation.

       You should however leave the 'react' alias enabled if you are using Redux-DevTools
       (instead of Redux-DevTools-extension). That alias will sidestep a peculiar packaging bug,
       see http://stackoverflow.com/questions/28519287/what-does-only-a-reactowner-can-have-refs-mean/32444088#32444088

       After all this, we decided minify the npm source as that seems the more common approach.
       More info will be available on edge case, failure modes and workarounds.

       'react$': path.join(__dirname, 'node_modules', 'react','dist',
        (isProduction ? 'react.min.js' : 'react.js')),
       react: path.join(__dirname, 'node_modules', 'react'), // !!! IMPORTANT for Redux-DevTools
       'react-dom$': path.join(__dirname, 'node_modules', 'react-dom','dist',
         (isProduction ? 'react-dom.min.js' : 'react-dom.js')),
       redux$: path.join(__dirname, 'node_modules', 'redux', 'dist',
         (isProduction ? 'redux.min.js' : 'redux.js')),
       'react-redux$': path.join(__dirname, 'node_modules', 'react-redux', 'dist',
         (isProduction ? 'react-redux.min.js' : 'react-redux.js')),
       */
    }
  },
  // postcss: [
  // rucksack({
  // autoprefixer: true,
  // }),
  // ],
  plugins: [
    extractLess,
    // Webpack's default file watcher does not work with NFS file systems on VMs,
    // definitely not with Oracle VM, and likely not with other VMs.
    // OldWatchingPlugin is a slower alternative that works everywhere.
    // new webpack.OldWatchingPlugin(), // can use "webpack-dev-server --watch-poll" instead
    /*
     Build our HTML file.
     */
    // repeat new HtmlWebpackPlugin() for additional HTML files
    new HtmlWebpackPlugin({
      // Template based on https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs
      template: path.join(process.cwd(), 'server', 'utils', 'index.ejs'),
      filename: 'index.html',
      inject: false, // important
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: true // leave HTML readable
      },
      cache: false,
      /* We'd need this if we had a dynamically loaded user chunk
      excludeChunks: ['user'],
       */

      // Substitution values
      supportOldIE: false,
      meta: { description: config.client.appName },
      title: config.client.appName,
      faviconFile: '/favicon.ico',
      mobile: false,
      baseHref: null,
      unsupportedBrowserSupport: false,
      appMountId: 'root',
      appMountIds: {},
      addRobotoFont: true, // See //www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500
      copyWindowVars: {},
      devServer: false,
      googleAnalytics: false
    }),
    // Define replacements for global constants in the client code.
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(config.NODE_ENV) }, // used by React, etc
      __processEnvNODE_ENV__: JSON.stringify(config.NODE_ENV) // used by us
    })
  ]
  /* Trying to get a stable chunk hash
   recordsPath: path.join(__dirname, 'webpack.records.json'),
   */
  /*
  devServer: {
    contentBase: './public',
    // Sometimes placing the inline & hot options here does not work. Best to include them in CLI.
    hot: true
  },
  */
}

module.exports = webpackConfig
