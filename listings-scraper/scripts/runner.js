const { scrapeGrailed } = require("./grailed");
const { scrapeMercari } = require("./mercari");
const { scrapeXianyu } = require("./xianyu");
const { scrapeYahoo } = require("./yahoo");

async function scrapeBrand(
  mercariBrandId,
  grailedUrl,
  yahooUrl,
  keyword,
  path,
  regex,
  mercariKeyword
) {
  console.log(`📩 ${keyword}`);

  if (mercariKeyword) {
    await scrapeMercari([], `${path}/mercari.json`, regex, mercariKeyword);
  } else {
    await scrapeMercari([mercariBrandId], `${path}/mercari.json`, regex);
  }
  await scrapeXianyu(keyword, `${path}/xianyu.json`, regex);
  await scrapeGrailed(grailedUrl, `${path}/grailed.json`, regex);
  // await scrapeEbay(keyword, `${path}/ebay.json`, regex);
  // await scrapeVestiaire(keyword, `${path}/vestiaire.json`);
  // await scrapeVinted(keyword, `${path}/vinted.json`, regex);
  // await scrapeDepop(depopUrl, `${path}/depop.json`);
  // await scrapePoshmark(poshmarkUrl, `${path}/poshmark.json`, regex);
  // scrapeYahoo(yahooUrl, `${path}/yahoo.json`, regex);
}

async function runner() {
  await scrapeBrand(
    7617,
    "https://www.grailed.com/designers/ma",
    "https://buyee.jp/item/search/category/2084199118",
    "m.a+",
    "listings-scraper/public/data/MA",
    /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+|m\.a\＋|ma\＋|MA\＋|Ma\＋|m\.a\.\＋/i
  );

  await scrapeBrand(
    53417,
    "https://www.grailed.com/designers/layer-0",
    "https://buyee.jp/item/search/category/2084199118",
    "layer-0",
    "listings-scraper/public/data/Layer-0",
    /LAYER-0|layer-0|Layer-0/i
  );

  await scrapeBrand(
    0,
    "https://www.grailed.com/designers/taichi-murakami",
    "https://buyee.jp/item/search/category/2084199118",
    "taichimurakami",
    "listings-scraper/public/data/taichimurakami",
    /taichi murakami|taichimurakami|タイチムラカミ|タイチ ムラカミ/i
  );
}

runner();
