process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const path = require("path");
const fs = require("fs");
const nodemon = require("nodemon");
const chalk = require("chalk");

const paths = require("../utils/paths");

const useDefaultConfig = !fs.existsSync(paths.babelrc);

const start = argv => {
  process.on("unhandledRejection", err => {
    console.log(
      chalk.red("You should not have any unhandled rejections in promises")
    );
    console.log(err);
  });

  const args = [require.resolve("@babel/node/bin/babel-node")];

  useDefaultConfig
    ? args.push("--presets", paths.babelPreset)
    : console.log(chalk.green("Using .babelrc from project root for config"));

  nodemon({
    script: path.resolve("src"),
    exec: args.join(" ")
  });
};

module.exports = start;
