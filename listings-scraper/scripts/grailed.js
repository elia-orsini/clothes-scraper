const { chromium } = require("playwright-extra");
const fs = require("fs");
const stealth = require("puppeteer-extra-plugin-stealth");

const transformData = (receivedData) => {
  const item = receivedData;

  const transformedObject = {
    id: item.id || "",
    sellerId: item.user?.id || "",
    name: item.title || "",
    price: Math.ceil(item.price * 0.78) || 0,
    created: Math.floor(new Date(item.created_at).getTime() / 1000) || 0,
    thumbnails: [item.cover_photo?.url || ""],
    categoryId: item.category || "",
    href: `https://www.grailed.com/listings/${item.id}`,
    designer: item.designers?.map((designer) => designer.name).join(", ") || "",
    size: item.size || "",
    color: item.color || "",
    condition: item.condition || "",
    location: item.location || "",
    website: "grailed",
  };

  return transformedObject;
};

async function scrapeGrailed(pageURL, path, regex) {
  try {
    chromium.use(stealth());
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    let allResults = [];
    let allFilteredResults = [];
    let expectedResults = 1;
    let isComplete = false;

    const seenIds = new Set(); // To track unique IDs

    page.on("response", async (response) => {
      const url = new URL(response.url());

      if (
        url.href.includes(
          "https://mnrwefss2q-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent"
        )
      ) {
        const responseBody = await response.json();
        const resultList = responseBody.results[0].hits || [];

        expectedResults = responseBody.results[0].nbHits;

        const parsedResultList = resultList
          .map((item) => transformData(item))
          .filter((item) => {
            // Filter for unique items by ID
            if (!seenIds.has(item.id)) {
              seenIds.add(item.id);
              return true;
            }
            return false;
          });

        const filteredItems = parsedResultList.filter((item) =>
          regex.test(item.name)
        );

        allResults = [...allResults, ...parsedResultList];
        allFilteredResults = [...allFilteredResults, ...filteredItems];

        if (allResults.length >= expectedResults) {
          isComplete = true;
          fs.writeFileSync(
            path,
            JSON.stringify(allFilteredResults, null, 2),
            "utf8"
          );

          await browser.close();
        }
      }
    });

    await page.goto(pageURL, {
      referer: pageURL,
      timeout: 60000,
    });

    await page.waitForTimeout(2000);

    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const distance = 10000; // Scroll by 100px each time
        const delay = 30; // Delay between scrolls in ms

        const interval = setInterval(() => {
          window.scrollBy(0, distance);

          if (allResults.length >= expectedResults) {
            clearInterval(interval);
            resolve();
          }
        }, delay);
      });
    });

    await page.waitForTimeout(8000);

    if (!isComplete && allResults.length > 0) {
      fs.writeFileSync(
        path,
        JSON.stringify(allFilteredResults, null, 2),
        "utf8"
      );
      console.log("Partial results written. Exiting...");
    }

    await browser.close();
  } catch (error) {
    console.log("GRAILED ✅");
  }
}

module.exports = { scrapeGrailed };
