const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['build/**/*', 'src/**/*'],
    port: 3000,
  },
  devtool: 'inline-source-map',
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['yarn spritesheet-bg', 'yarn spritesheet-fg'],
        blocking: true,
      }
    }),
    new HTMLWebpackPlugin({
      template: 'build/index.html',
      filename: 'index.html'
    })
  ],
};
