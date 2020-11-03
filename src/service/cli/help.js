'use strict';

const getAppHelp = () => {
  console.info(`
    Программа запускает формирует файл mocks.json с данными обьявлений.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json
  `);
};

module.exports = {
  name: `--help`,
  run: getAppHelp,
};
