const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false
  },

  output: {
    publicPath: 'http://localhost:3001/'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')]
        }
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    new CopyPlugin([
      { from: 'fruit', to: 'fruit' },
    ]),
    new ModuleFederationPlugin({
      name: 'home',
      // library: { type: 'var', name: 'home' },
      filename: 'remoteEntry.js',
      remotes: {
        nav: 'nav@http://localhost:3003/remoteEntry.js',
        productImage: 'productImage@http://localhost:3002/remoteEntry.js',
        buyTools: 'buyTools@http://localhost:3004/remoteEntry.js',
      },
      exposes: {
        "./fruit": './src/fruit'
      },
      shared: []
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
};
