'use strict';

const packageJson = require(`../../../package.json`);

const getAppVersion = () => {
  console.info(packageJson.version);
};

module.exports = {
  name: `--version`,
  run: getAppVersion,
};
