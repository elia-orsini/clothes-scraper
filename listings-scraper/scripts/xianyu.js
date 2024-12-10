const { chromium } = require("playwright"); // Install Playwright via npm install playwright
const fs = require("fs");
const { translate } = require("./translate");

const transformData = (receivedData) => {
  const item = receivedData?.data?.item?.main;

  const transformedObject = {
    id: item?.clickParam?.args?.item_id || "",
    sellerId: item?.clickParam?.args?.seller_id || "",
    name: item?.exContent?.detailParams?.title || "",
    price: item?.clickParam?.args?.price || "",
    created:
      Math.floor(Number(item?.clickParam?.args?.publishTime) / 1000) || "",
    thumbnails: [item?.exContent?.picUrl || ""],
    categoryId: item?.clickParam?.args?.tbCatId || "",
    href: `https://2.taobao.com/item-detail?itemId=${item?.clickParam?.args?.item_id}&spm=a2170.xianyu_tbpc_search.0.0`,
    website: "xianyu",
    location: "china",
  };

  return transformedObject;
};

async function scrapeXianyu(keyword, path, regex) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let allResults = [];

  page.on("response", async (response) => {
    const url = new URL(response.url());

    if (
      url.href.includes(
        "https://h5api.m.goofish.com/h5/mtop.taobao.idlemtopsearch.wx.search"
      )
    ) {
      const responseBody = await response.json();

      const resultList = responseBody.data.resultList || [];
      const parsedResultList = resultList.map((item) => transformData(item));

      const filteredItems = parsedResultList.filter((item) =>
        regex.test(item.name)
      );

      for (const item of filteredItems) {
        item.name = await translate(item.name);
        item.price = Math.ceil(item.price * 0.11);
      }

      allResults = [...allResults, ...filteredItems];
    }
  });

  await page.goto(`https://2.taobao.com/search?word=${keyword}`);

  await page.waitForTimeout(10000);

  if (allResults.length) {
    fs.writeFileSync(path, JSON.stringify(allResults, null, 2), "utf8");
  }

  console.log("XIANYU ✅");

  // Close the browser after the desired actions
  await browser.close();
}

module.exports = { scrapeXianyu };
