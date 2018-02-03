const fs = require("fs");
const spawn = require("cross-spawn");
const chalk = require("chalk");

const paths = require("../utils/paths");

const useDefaultConfig = !fs.existsSync(paths.prettierrc);

const buildArgs = argv => {
  const args = [];
  args.push("--write", ...argv.files.split(" "));

  if (argv.noConfig) {
    return args;
  }

  useDefaultConfig
    ? args.push("--config", paths.defaultPrettierConfig)
    : console.log(
        chalk.green("Using .prettierrc from project root for config")
      );

  return args;
};

const format = argv => {
  const args = buildArgs(argv);

  const result = spawn.sync(require.resolve("prettier/bin-prettier"), args, {
    stdio: "inherit"
  });

  if (result.status === 0 && !result.error) {
    console.log(chalk.green("Format Successfull!"));
  }
  if (result.error) {
    console.log(chalk.red("An error has occured"));
    console.log(chalk.red(result.error));
  }

  return result;
};

module.exports = format;
