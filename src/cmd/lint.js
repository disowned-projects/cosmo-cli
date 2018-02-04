const lint = require("../scripts/lint");

exports.command = "lint";

exports.description = "Code analysis using Eslint";

exports.builder = yargs =>
  yargs.options({
    f: {
      alias: "files",
      describe: "Files to lint",
      default: "src/"
    }
  });

exports.handler = argv => {
  const result = lint(argv);
  process.exit(result.status);
};
