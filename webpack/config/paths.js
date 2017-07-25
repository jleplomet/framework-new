const path = require("path");
const fs = require("fs");
const url = require("url");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

let paths = {
  build: resolveApp("build"),
  public: resolveApp("public"),
  src: resolveApp("src"),
  packageJson: resolveApp("package.json"),
  nodeModules: resolveApp("node_modules"),
};

module.exports = paths;
