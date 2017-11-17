const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const extractSass = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    main: './src/index',
    static_shape: './src/static_shape/index'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    extractSass,
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: 'index.html' },
      { from: './src/config.json', to: 'config.json' },
      { from: './src/basemaps.json', to: 'basemaps.json' },
      { from: './src/ext', to: 'ext' },
      {
        from: './src/data/baptisteries.geojson',
        to: 'data/baptisteries.geojson'
      }
    ])
  ]
};
