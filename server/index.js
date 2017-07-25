/* Borrowed some code from
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/scripts/start.js */

// Do this as the first thing so that any code reading it knows the right env.

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

let address = require("address");
let fs = require("fs");
let url = require("url");
let chalk = require("chalk");
let detect = require("detect-port");
let paths = require("../webpack/config/paths");
let webpack = require("webpack");
let webpackConfig = require("../webpack/development");
let WebpackDevServer = require("webpack-dev-server");
let clearConsole = require("react-dev-utils/clearConsole");
let formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
let openBrowser = require("react-dev-utils/openBrowser");

const IS_INTERACTIVE = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

function run(port) {
  const protocol = process.env.HTTPS === "true" ? "https" : "http";
  const formatUrl = hostname =>
    url.format({protocol, hostname, port, pathname: "/"});
  const formattedUrl = formatUrl(HOST);
  const isUnspecifiedAddress = HOST === "0.0.0.0" || HOST === "::";

  let prettyHost;
  let lanAddress;

  if (isUnspecifiedAddress) {
    prettyHost = "localhost";

    try {
      lanAddress = address.ip();
    } catch (e) {}
  } else {
    prettyHost = HOST;
  }

  const compiler = createWebpackCompiler(webpackConfig, showInstructions => {
    if (!showInstructions) {
      return;
    }

    console.log();
    console.log("The app is running at:");
    console.log();

    if (isUnspecifiedAddress && lanAddress) {
      console.log(`  Local: ${chalk.cyan(formattedUrl)}`);
      console.log(`  Network: ${chalk.cyan(formatUrl(lanAddress))}`);
    } else {
      console.log(`  ${chalk.cyan(formattedUrl)}`);
    }

    console.log();
    console.log("Note that the development build is not optimized.");
    console.log(
      `To create a production build, use ${chalk.cyan(`npm run build`)}.`
    );
    console.log();
  });

  const devServer = new WebpackDevServer(
    compiler,
    createWebpackDevServer(lanAddress, protocol)
  );

  devServer.listen(port, HOST, err => {
    if (err) {
      return console.log(err);
    }

    if (IS_INTERACTIVE) {
      clearConsole();
    }

    console.log(chalk.cyan("Starting the development server..."));
    console.log();

    openBrowser(formatUrl(prettyHost));
  });
}

function createWebpackCompiler(config, cb) {
  let compiler;

  try {
    compiler = webpack(config);
  } catch (error) {
    console.log(chalk.red("Failed to compile."));
    console.log();
    console.log(error.message || error);
    console.log();
    process.exit(1);
  }

  compiler.plugin("invalid", () => {
    if (IS_INTERACTIVE) {
      clearConsole();
    }

    console.log("Compiling...");
  });

  let isFirstCompile = true;

  compiler.plugin("done", stats => {
    if (IS_INTERACTIVE) {
      clearConsole();
    }

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful && (IS_INTERACTIVE || isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green("Compiled successfully!"));
    }

    if (typeof cb === "function") {
      cb(showInstructions);
    }

    isFirstCompile = false;

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
      console.log(
        chalk.dim(
          "Search for the " +
            chalk.cyan("rule keywords") +
            " to learn more about each warning."
        )
      );
      console.log(
        chalk.dim(
          "To ignore, add " +
            chalk.yellow("// eslint-disable-next-line") +
            " to the previous line."
        )
      );
      console.log();
    }
  });

  return compiler;
}

function createWebpackDevServer(allowedHost, protocol) {
  return {
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: "none",
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.public,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: webpackConfig.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === "https",
    host: HOST,
    overlay: false,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    },
    public: allowedHost,
  };
}

detect(DEFAULT_PORT).then(port => run(port));
