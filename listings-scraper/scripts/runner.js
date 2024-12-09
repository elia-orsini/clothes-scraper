const { scrapeGrailed } = require("./grailed");
const { scrapeMercari } = require("./mercari");
const { scrapeXianyu } = require("./xianyu");
const { scrapeYahoo } = require("./yahoo");

scrapeMercari(
  7617,
  "listings-scraper/public/data/MA/mercari.json",
  /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
);

// scrapeYahoo(
//   "https://buyee.jp/item/search/category/2084199118",
//   "listings-scraper/public/data/MA/yahoo.json",
//   /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
// );

scrapeXianyu(
  "m.a+",
  "listings-scraper/public/data/MA/xianyu.json",
  /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
);

scrapeGrailed(
  "https://www.grailed.com/designers/ma",
  "listings-scraper/public/data/MA/grailed.json",
  /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
);
