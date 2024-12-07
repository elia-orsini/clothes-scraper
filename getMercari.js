const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto(
    "https://jp.mercari.com/search?search_condition_id=1cx0zHGJpZB03NjE3"
  );

  console.log("waiting for page to load");

  // Wait for the items to load
  await page.waitForSelector("#item-grid");

  console.log("scrolling");

  await page.evaluate(async () => {
    const distance = 300; // Scroll distance
    const delay = 200; // Delay between scrolls (ms)
    let lastHeight = 0;
    let reachedEnd = false;

    while (!reachedEnd) {
      window.scrollBy(0, distance);
      await new Promise((resolve) => setTimeout(resolve, delay));

      const newHeight = document.body.scrollHeight;
      if (newHeight === lastHeight) {
        reachedEnd = true; // No more new content
      }
      lastHeight = newHeight;
    }
  });

  // Extract data
  const items = await page.$$eval(
    "#item-grid li.sc-bcd1c877-2.cvAXgx",
    (elements) => {
      return elements.map((el) => {
        const linkElement = el.querySelector("a");
        const sourceElement = el.querySelector("source");
        const imgElement = el.querySelector("img");
        const titleElement = el.querySelector("[aria-label]");

        return {
          href: linkElement?.getAttribute("href") || null,
          imageUrl:
            sourceElement?.getAttribute("srcset") ||
            imgElement?.getAttribute("src") ||
            null,
          title: titleElement?.getAttribute("aria-label") || null,
        };
      });
    }
  );

  const getLastUpdatedDate = async (itemPageUrl) => {
    const itemPage = await browser.newPage();
    await itemPage.goto(`https://jp.mercari.com${itemPageUrl}`);
    await itemPage.waitForSelector("body"); // Wait for the page to load

    // Assuming the last updated date is within a specific element, change this selector accordingly
    const lastUpdatedDate = await itemPage.$eval(
      "div.itemDetail__header > span:last-child", // Adjust the selector for "last updated"
      (element) => element?.textContent || null
    );

    await itemPage.close();
    return lastUpdatedDate;
  };

  // Visit each item page to get the last updated date
  for (const item of items) {
    if (item.href) {
      const lastUpdated = await getLastUpdatedDate(item.href);
      item.lastUpdated = lastUpdated; // Add the last updated date to the item
    }
  }

  // Save results to a JSON file
  const filePath = "mercari.json";
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf-8");
  console.log(`Results saved to ${filePath}`);

  await browser.close();
})();
