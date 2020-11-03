'use strict';

const {Cli} = require(`./cli`);

const DEFAULT_COMMAND = `--help`;
const OFFERS_MAX_COUNT = 1000;
const [userCommand, commandParam] = process.argv.slice(2);
const programExitCode = {
  success: 1,
  error: 0,
};

if (!Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(programExitCode.success);
}

if (parseInt(commandParam, 10) > OFFERS_MAX_COUNT) {
  console.info(`Не больше 1000 объявлений`);
  process.exit(programExitCode.error);
}

Cli[userCommand].run(commandParam);
