#!/usr/bin/env node

const yargs = require("yargs");
const chalk = require("chalk");

yargs
  .version()
  .alias("v", "version")
  .alias("h", "help");

yargs
  .commandDir("cmd")
  .demandCommand(1, chalk.red("Please provide a command!"));

yargs.parse();
