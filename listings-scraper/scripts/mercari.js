const axios = require("axios");
const fs = require("fs");
const { translate } = require("./translate");
const { chromium } = require("playwright");

async function getDpop() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let dpop;

  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.pathname === "/v2/entities:search") {
      const headers = request.headers();

      if (headers["dpop"]) {
        dpop = headers["dpop"];
      }
    }
  });

  await page.goto(
    "https://jp.mercari.com/search?search_condition_id=1cx0zHGJpZB03NjE3"
  );

  await page.waitForTimeout(25000);

  await browser.close();

  return dpop;
}

async function scrapeMercari(brandId, saveLocation, regex, keyword = "") {
  const dpop = await getDpop();

  const config = {
    method: "post",
    url: "https://api.mercari.jp/v2/entities:search",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "ja",
      "content-type": "application/json",
      dnt: "1",
      dpop: dpop,
      origin: "https://jp.mercari.com",
      priority: "u=1, i",
      referer: "https://jp.mercari.com/",
      "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "x-country-code": "GB",
      "x-platform": "web",
    },
    data: {
      userId: "",
      pageSize: 560,
      pageToken: "",
      searchSessionId: "181b4d6ca32c72f2b5e6061202b4ebc1",
      indexRouting: "INDEX_ROUTING_UNSPECIFIED",
      thumbnailTypes: [],
      searchCondition: {
        keyword: keyword,
        excludeKeyword: "",
        sort: "SORT_SCORE",
        order: "ORDER_DESC",
        status: [],
        sizeId: [],
        categoryId: [],
        brandId: brandId,
        sellerId: [],
        priceMin: 0,
        priceMax: 0,
        itemConditionId: [],
        shippingPayerId: [],
        shippingFromArea: [],
        shippingMethod: [],
        colorId: [],
        hasCoupon: false,
        attributes: [],
        itemTypes: ["ITEM_TYPE_MERCARI"],
        skuIds: [],
        shopIds: [],
      },
      defaultDatasets: ["DATASET_TYPE_MERCARI", "DATASET_TYPE_BEYOND"],
      serviceFrom: "suruga",
      withItemBrand: true,
      withItemSize: false,
      withItemPromotions: true,
      withItemSizes: true,
      withShopname: false,
      useDynamicAttribute: true,
      withSuggestedItems: true,
      withOfferPricePromotion: true,
      withProductSuggest: true,
      withParentProducts: false,
      withProductArticles: true,
      withSearchConditionId: true,
    },
  };

  axios(config)
    .then(async (response) => {
      const filteredItems = response.data.items.filter(
        (item) => regex.test(item.name) && item.status === "ITEM_STATUS_ON_SALE"
      );

      const sortedItems = filteredItems.sort((a, b) => b.created - a.created);

      for (const item of sortedItems) {
        item.href = `https://jp.mercari.com/item/${item.id}`;
        item.name = await translate(item.name);
        item.price = Math.ceil(item.price * 0.0052);
        item.website = "mercari";
        item.location = "japan";
        item.thumbnails[0] = item.thumbnails[0].replace(
          "https://static.mercdn.net/c!/w=240,f=webp/thumb",
          "https://static.mercdn.net/item/detail/orig"
        );
      }

      fs.writeFileSync(
        saveLocation,
        JSON.stringify(sortedItems, null, 2),
        "utf-8"
      );
      console.log("MERCARI ✅");
    })
    .catch((error) => {
      console.error("Error during the request:", error);
    });
}

module.exports = { scrapeMercari };
