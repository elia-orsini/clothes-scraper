const { scrapeGrailed } = require("./grailed");
const { scrapeMercari } = require("./mercari");
const { scrapeXianyu } = require("./xianyu");
const { scrapeYahoo } = require("./yahoo");

async function runner() {
  // MA
  await scrapeMercari(
    [7617],
    "listings-scraper/public/data/MA/mercari.json",
    /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
  );
  await scrapeXianyu(
    "m.a+",
    "listings-scraper/public/data/MA/xianyu.json",
    /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
  );
  await scrapeGrailed(
    "https://www.grailed.com/designers/ma",
    "listings-scraper/public/data/MA/grailed.json",
    /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
  );
  // scrapeYahoo(
  //   "https://buyee.jp/item/search/category/2084199118",
  //   "listings-scraper/public/data/MA/yahoo.json",
  //   /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
  // );

  // LAYER-0
  await scrapeMercari(
    [53417],
    "listings-scraper/public/data/Layer-0/mercari.json",
    /LAYER-0|layer-0|Layer-0/i
  );
  await scrapeXianyu(
    "layer-0",
    "listings-scraper/public/data/Layer-0/xianyu.json",
    /LAYER-0|layer-0|Layer-0/i
  );
  await scrapeGrailed(
    "https://www.grailed.com/designers/layer-0",
    "listings-scraper/public/data/Layer-0/grailed.json",
    /LAYER-0|layer-0|Layer-0/i
  );
  // scrapeYahoo(
  //   "https://buyee.jp/item/search/category/2084199118",
  //   "listings-scraper/public/data/Layer-0/yahoo.json",
  //   /LAYER-0|layer-0|Layer-0/i
  // );

  // TAICHIMURAKAMI
  await scrapeMercari(
    [],
    "listings-scraper/public/data/taichimurakami/mercari.json",
    /taichi murakami|taichimurakami|タイチムラカミ|タイチ ムラカミ/i,
    "taichi murakami taichimurakami タイチムラカミ"
  );
  await scrapeXianyu(
    "taichimurakami",
    "listings-scraper/public/data/taichimurakami/xianyu.json",
    /taichi murakami|taichimurakami|タイチムラカミ|タイチ ムラカミ/i
  );
  await scrapeGrailed(
    "https://www.grailed.com/designers/taichi-murakami",
    "listings-scraper/public/data/taichimurakami/grailed.json",
    /taichi murakami|taichimurakami|タイチムラカミ|タイチ ムラカミ/i
  );
  // scrapeYahoo(
  //   "https://buyee.jp/item/search/category/2084199118",
  //   "listings-scraper/public/data/taichimurakami/yahoo.json",
  //   /taichi murakami|taichimurakami|タイチムラカミ|タイチ ムラカミ/i
  // );
}

runner();
