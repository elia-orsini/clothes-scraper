const { scrapeMercari } = require("./mercari");
const { scrapeYahoo } = require("./yahoo");

scrapeMercari(
  7617,
  "listings-scraper/public/data/MA/mercari.json",
  /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+/i
);

scrapeYahoo(
  "https://buyee.jp/item/search/category/2084199118",
  "listings-scraper/public/data/MA/yahoo.json",
  /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+/i
);
