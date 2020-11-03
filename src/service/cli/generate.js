'use strict';

const fs = require(`fs`);
const path = require(`path`);
const utils = require(`../../utils`);

const APP_ROOT = path.dirname(path.dirname(path.dirname(__dirname)));
const OFFERS_DEFAULT_COUNT = 1;
const OFFER_DESCRIPTIONS_COUNT = 5;
const OFFER_CATEGORIES_COUNT = 3;
const OFFERS_FILE_NAME = `${APP_ROOT}/mocks.json`;

const OFFER_TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const OFFER_DESCRIPTIONS = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

const OFFER_CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferPictureFilenameAddonsRange = {
  MIN: 1,
  MAX: 16,
};

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const OfferPicture = {
  FILENAME_START: `item`,
  EXTENSION: `.jpg`,
};

const OfferPriceRange = {
  MIN: 1000,
  MAX: 100000,
};

const getPictureFileName = () => {
  const filenameStart = OfferPicture.FILENAME_START;
  const filenameAddon = utils.getRandomInt(OfferPictureFilenameAddonsRange.MIN, OfferPictureFilenameAddonsRange.MAX);
  const fileExtension = OfferPicture.EXTENSION;

  return `${filenameStart}${filenameAddon}${fileExtension}`;
};

const generateOffers = (count) => {
  const offersCount = parseInt(count, 10) ? parseInt(count, 10) : OFFERS_DEFAULT_COUNT;

  return JSON.stringify(Array(offersCount).fill(1).map(() => ({
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    title: OFFER_TITLES[utils.getRandomInt(0, OFFER_TITLES.length - 1)],
    description: utils.shuffle(OFFER_DESCRIPTIONS).slice(1, OFFER_DESCRIPTIONS_COUNT).join(` `),
    sum: utils.getRandomInt(OfferPriceRange.MIN, OfferPriceRange.MAX),
    picture: getPictureFileName(),
    category: utils.shuffle(OFFER_CATEGORIES).slice(0, utils.getRandomInt(1, OFFER_CATEGORIES_COUNT)),
  })));
};

const createFile = (content) => {
  fs.writeFile(OFFERS_FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(count) {
    createFile(generateOffers(count));
  },
};
