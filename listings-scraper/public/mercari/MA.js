const axios = require("axios");
const fs = require("fs");

async function translateText(text) {
  const apiKey = "AIzaSyDMqhDG6LO7v9AUmDo3gRyjG6p2uRmkPHs";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await axios.post(url, {
    q: text,
    target: "en",
  });

  return response.data.data.translations[0].translatedText;
}

const config = {
  method: "post",
  url: "https://api.mercari.jp/v2/entities:search",
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "ja",
    "content-type": "application/json",
    dnt: "1",
    dpop: "eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4Ijoid0V1TlFvVmJKRlppV1g5NnpQRkxSdHdyanZqNWMtb1dya044MzBjU0xHMCIsInkiOiJWRTVFbjlPYVkzQUF0T0c2eEVnVk9NZml6bVBFSVd6SWp5aE5TRDBOR0N3In19.eyJpYXQiOjE3MzM0MTczNTAsImp0aSI6ImY2ZGY0ZDYyLTdmMTQtNDk5Yi05YzUzLTY2YmI5NjljMDFjNCIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvdjIvZW50aXRpZXM6c2VhcmNoIiwiaHRtIjoiUE9TVCIsInV1aWQiOiJmNDg4NmQ2OC03ZmM1LTQzOTEtYjA0ZS03MTAzOWIyMTE4ZGYifQ.VEMxGVVxMC48FkLSpx9PCxpFk1DrZvNEeBYkTMLnssczVnp0m_oMyuTfAJfx_SgZSbfyymadu5ReJ3fM5hk8jA",
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
      keyword: "",
      excludeKeyword: "",
      sort: "SORT_SCORE",
      order: "ORDER_DESC",
      status: [],
      sizeId: [],
      categoryId: [],
      brandId: [7617],
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
      itemTypes: [],
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

// Send the POST request
axios(config)
  .then(async (response) => {
    const filePath = "../data/MA/mercari.json";

    const filteredItems = response.data.items.filter(
      (item) =>
        /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+/i.test(item.name) &&
        item.status === "ITEM_STATUS_ON_SALE" &&
        item.itemType === "ITEM_TYPE_MERCARI"
    );

    const sortedItems = filteredItems.sort((a, b) => b.created - a.created);

    for (const item of sortedItems) {
      item.href = `https://jp.mercari.com/item/${item.id}`;
      item.translatedName = await translateText(item.name);
    }

    fs.writeFileSync(filePath, JSON.stringify(sortedItems, null, 2), "utf-8");
    console.log(`Results saved to ${filePath}`);
  })
  .catch((error) => {
    console.error("Error during the request:", error);
  });
