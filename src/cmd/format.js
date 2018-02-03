const format = require("../scripts/format");

exports.command = "format";

exports.description = "Format files using Prettier";

exports.builder = yargs =>
  yargs.options({
    f: {
      alias: "files",
      describe: "Files to format",
      default: "src/**/*.js flow-typed/**/*.js"
    },
    n: {
      alias: "no-config",
      describe: "Use prettier without config"
    }
  });

exports.handler = argv => {
  const result = format(argv);
  process.exit(result.status);
};
