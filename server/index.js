/* Borrowed some code from
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/scripts/start.js */

var chalk = require("chalk");
var detect = require("detect-port");
var ngrok = require("ngrok");
var ip = require("ip");
var webpack = require("webpack");
var webpackConfig = require("../webpack/development");
var webpackDevServer = require("webpack-dev-server");

var clearConsole = require("react-dev-utils/clearConsole");
var formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
var openBrowser = require("react-dev-utils/openBrowser");

var isInteractive = process.stdout.isTTY;

var defaultPort = process.env.PORT || 3000;
var compiler;

function setupCompiler(host, port, protocol) {
  compiler = webpack(webpackConfig);

  compiler.plugin("invalid", function() {
    if (isInteractive) {
      clearConsole();
    }

    console.log("Compiling...");
  });

  var isFirstCompile = true;

  compiler.plugin("done", function(stats) {
    if (isInteractive) {
      clearConsole();
    }

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && (isInteractive || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green("Compiled successfully!"));
    }

    if (showInstructions) {
      console.log();
      console.log("The app is running at:");
      console.log();
      console.log(
        "  " + chalk.cyan(protocol + "://" + host + ":" + port + "/")
      );
      console.log();
      console.log("Note that the development build is not optimized.");
      console.log(
        "To create a production build, use " + chalk.cyan("npm run build") + "."
      );
      console.log();
      isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red("Failed to compile."));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow("Compiled with warnings."));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log("You may use special comments to disable some warnings.");
      console.log(
        "Use " +
          chalk.yellow("// eslint-disable-next-line") +
          " to ignore the next line."
      );
      console.log(
        "Use " +
          chalk.yellow("/* eslint-disable */") +
          " to ignore all warnings in a file."
      );
    }
  });
}

function runDevServer(host, port, protocol) {
  var devServer = new webpackDevServer(compiler, {
    compress: true,

    clientLogLevel: "none",

    hot: true,

    publicPath: webpackConfig.output.publicPath,

    quiet: true,

    watchOptions: {
      ignored: /node_modules/,
    },
  });

  devServer.listen(port, (error, result) => {
    if (error) {
      return console.log(error);
    }

    if (isInteractive) {
      clearConsole();
    }

    console.log(chalk.cyan("Starting the development server...\n"));
    console.log();

    ngrok.connect(port, (innerErr, tunnelStarted) => {
      if (innerErr) {
        return console.log(innerErr);
      }

      let divider = chalk.gray("\n-----------------------------------");

      // console.log();
      console.log(
        chalk.bold("\nAccess URLs:") +
          divider +
          "\nLocalhost: " +
          chalk.magenta("http://localhost:" + port) +
          "\n      LAN: " +
          chalk.magenta("http://" + ip.address() + ":" + port) +
          (tunnelStarted
            ? "\n    Proxy: " + chalk.magenta(tunnelStarted)
            : "") +
          divider,
        chalk.blue("\nPress " + chalk.italic("CTRL-C") + " to stop\n")
      );

      openBrowser(protocol + "://" + host + ":" + port + "/");
    });
  });
}

function run(port) {
  var protocol = process.env.HTTPS === "true" ? "https" : "http";
  var host = process.env.HOST || "localhost";

  setupCompiler(host, port, protocol);
  runDevServer(host, port, protocol);
}

detect(defaultPort).then(port => run(port));
