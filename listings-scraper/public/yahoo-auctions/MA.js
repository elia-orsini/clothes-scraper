const { chromium } = require("playwright");
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

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let currentPage = 1;
  let hasMorePages = true;
  const allItems = [];

  // Function to navigate to a page and scrape data
  const scrapePage = async (pageUrl) => {
    try {
      await page.goto(pageUrl);
      console.log(`Scraping page: ${pageUrl}`);

      // Wait for the items to load
      await page.waitForSelector(".itemCard__item");

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 2500)
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

          return {
            href:
              `https://buyee.jp${linkElement?.getAttribute("href")}` || null,
            imageUrl: imgElement?.getAttribute("src") || null,
            title: titleElement?.textContent?.trim() || null,
            price: priceElement?.textContent?.trim() || null,
            timeRemaining: timeRemainingElement?.textContent?.trim() || null,
          };
        });
      });

      // Add the scraped items to the list
      allItems.push(...items);

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

  // Loop through all pages until an error is encountered
  while (hasMorePages) {
    const pageUrl = `https://buyee.jp/item/search/category/2084199118?sort=end&order=a&translationType=1&page=${currentPage}`;
    hasMorePages = await scrapePage(pageUrl);

    if (hasMorePages) {
      currentPage += 1; // Go to the next page if no error
    }
  }

  const filteredItems = allItems.filter((item) =>
    /m\.a\+|ma\+|MA\+|Ma\+|m\.a\.\+/i.test(item.title)
  );
  const sortedItems = filteredItems.sort((a, b) => b.created - a.created);

  for (const item of sortedItems) {
    item.translatedName = await translateText(item.name);
  }

  // Save results to a JSON file
  const filePath = "../data/MA/yahoo-jp.json";
  fs.writeFileSync(filePath, JSON.stringify(sortedItems, null, 2), "utf-8");
  console.log(`Results saved to ${filePath}`);

  await browser.close();
})();
