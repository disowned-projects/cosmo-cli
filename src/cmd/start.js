const start = require("../scripts/start");

exports.command = "start";

exports.description = "Start the development environment";

exports.handler = argv => {
  start(argv);
};
