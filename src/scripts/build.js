process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");
const rimraf = require("rimraf");
const chalk = require("chalk");

const paths = require("../utils/paths");

const useDefaultConfig = !fs.existsSync(paths.babelrc);

const build = argv => {
  process.on("unhandledRejection", err => {
    console.log(
      chalk.red("You should not have any unhandled rejections in promises")
    );
    console.log(err);
  });

  console.log(chalk.green("Cleaning up"));
  rimraf.sync(paths.dist);

  const args = [];
  args.push(paths.src);
  args.push("-d", paths.dist);
  useDefaultConfig
    ? args.push("--presets", paths.babelPreset)
    : console.log(chalk.green("Using .babelrc from project root for config"));

  const result = spawn.sync(require.resolve("@babel/cli/bin/babel"), args, {
    stdio: "inherit"
  });

  if (result.status === 0 && !result.error) {
    console.log(chalk.green("Build Successfull!"));
  }
  if (result.error) {
    console.log(chalk.red("An error has occured"));
    console.log(chalk.red(result.error));
  }

  return result;
};

module.exports = build;
