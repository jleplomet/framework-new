
var chalk   = require('chalk');
var detect  = require('detect-port');
var ngrok   = require('ngrok');
var ip      = require('ip');
var webpack = require('webpack');
var webpackConfig    = require('../webpack/development');
var webpackDevServer = require('webpack-dev-server');
var webpackDashboard = require('webpack-dashboard/plugin');

var defaultPort = process.env.PORT || 3000;
var compiler;

function setupCompiler(port) {
  compiler = webpack(webpackConfig);

  // add support for the cool webpack-dashboard
  compiler.apply(new webpackDashboard());
}

function runDevServer(port) {
  var devServer = new webpackDevServer(compiler, {
    hot: true,

    publicPath: webpackConfig.output.publicPath,

    quiet: true,

    watchOptions: {
      ignored: /node_modules/
    }
  });

  devServer.listen(port, (error, result) => {
    if (error) {
      return console.log(error);
    }

    console.log(chalk.cyan('Starting the development server...'));

    ngrok.connect(port, (innerErr, tunnelStarted) => {
      if (innerErr) {
        return console.log(innerErr);
      }

      var divider = chalk.gray('\n-----------------------------------');

      console.log();
      console.log(
        chalk.bold('\nAccess URLs:') +
        divider +
        '\nLocalhost: ' + chalk.magenta('http://localhost:' + port) +
        '\n      LAN: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
        (tunnelStarted ? '\n    Proxy: ' + chalk.magenta(tunnelStarted) : '') +
        divider,
        chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop\n')
      );
    });
  });
}

function run(port) {
  setupCompiler(port);
  runDevServer(port);
}

detect(defaultPort).then(port => run(port));
