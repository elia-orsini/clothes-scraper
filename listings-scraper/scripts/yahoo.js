const { chromium } = require("playwright-extra");
const fs = require("fs");
const { translate } = require("./translate");
const stealth = require("puppeteer-extra-plugin-stealth");

function scrapeYahoo(url, saveLocation, regex) {
  (async () => {
    chromium.use(stealth());
    const browser = await chromium.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    let currentPage = 0;
    let hasMorePages = true;
    const allItems = [];
    const seenUrls = new Set();

    // Function to navigate to a page and scrape data
    const scrapePage = async (pageUrl) => {
      try {
        await page.goto(pageUrl, {
          referer: pageUrl,
          timeout: 60000,
        });

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 10000)
        );

        // Scroll to load all items
        await page.evaluate(async () => {
          // Function to scroll down and check if reached the end
          await new Promise((resolve) => {
            const distance = 10000; // Scroll by 100px each time
            const delay = 30; // Delay between scrolls in ms

            const interval = setInterval(() => {
              window.scrollBy(0, distance);

              // Check if we're at the end of the page
              if (
                window.innerHeight + window.scrollY >=
                document.body.scrollHeight
              ) {
                clearInterval(interval);
                resolve();
              }
            }, delay);
          });
        });

        // Extract data
        const items = await page.$$eval(".itemCard__item", (elements) => {
          return elements.map((el) => {
            const linkElement = el.querySelector("a");
            const imgElement = el.querySelector(".g-thumbnail__image");
            const titleElement = el.querySelector(".itemCard__itemName a");
            const priceElement = el.querySelector(".g-price");
            const timeRemainingElement = el.querySelector(
              ".itemCard__infoItem:nth-child(1) .g-text--attention"
            );

            const priceAsString = priceElement?.textContent?.trim() || null;
            const price = priceAsString
              ? Math.ceil(
                  parseInt(
                    priceAsString.replace(/,/g, "").replace(" yen", ""),
                    10
                  ) * 0.0052
                )
              : "?";

            return {
              href:
                `https://buyee.jp${linkElement?.getAttribute("href")}` || null,
              imageUrl: imgElement?.getAttribute("src") || null,
              title: titleElement?.textContent?.trim() || null,
              price: price,
              timeRemaining: timeRemainingElement?.textContent?.trim() || null,
            };
          });
        });

        // Check if no items are found
        if (items.length === 0) {
          console.log("No items found on the page. Terminating script.");
          return false; // Stop further page navigation
        }

        // Filter out duplicate items based on href
        for (const item of items) {
          if (item.href && !seenUrls.has(item.href)) {
            allItems.push(item);
            seenUrls.add(item.href); // Add the item's href to the set
          }
        }

        await new Promise((resolve) =>
          setTimeout(() => {
            resolve();
          }, 5000)
        );

        return true; // Page was scraped successfully
      } catch (error) {
        console.error(`Error scraping page ${pageUrl}:`, error);
        return false; // Stop if there's an error
      }
    };

    while (hasMorePages) {
      console.log(`scraping yahoo.jp page: ${currentPage}`);

      const pageUrl = `${url}?sort=end&order=a&translationType=1&page=${currentPage}`;
      hasMorePages = await scrapePage(pageUrl);

      if (hasMorePages) {
        currentPage += 1;
      }
    }

    const filteredItems = allItems.filter((item) => regex.test(item.title));
    const sortedItems = filteredItems.sort((a, b) => b.created - a.created);

    try {
      for (const item of sortedItems) {
        if (item.title) {
          item.name = item.title;
        }
      }
    } catch (error) {
      console.log("error translating");
    }

    if (sortedItems.length) {
      fs.writeFileSync(
        saveLocation,
        JSON.stringify(sortedItems, null, 2),
        "utf-8"
      );
      console.log(`Results saved to ${saveLocation}`);
    } else {
      console.log("Nothing to write on JSON!");
    }

    await browser.close();
  })();
}

module.exports = { scrapeYahoo };
