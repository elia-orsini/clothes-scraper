const axios = require("axios");
const fs = require("fs");

const CLIENT_ID = "eo-grailedh-PRD-1b6b95e65-615e1ae9";
const CLIENT_SECRET = "PRD-b6b95e65af6f-7690-45c8-906f-9c71";

const TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token";
const SEARCH_URL = "https://api.ebay.com/buy/browse/v1/item_summary/search";

const getOAuthToken = async () => {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      TOKEN_URL,
      "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching OAuth token:", error.response.data);
    throw error;
  }
};

// Transform eBay data into the required format
const transformData = (receivedData) => {
  const item = receivedData;

  const transformedObject = {
    id: item.itemId || "",
    sellerId: item.seller?.username || "",
    name: item.title || "",
    price: item.price?.value || 0,
    created: Math.floor(new Date(item.itemCreationDate).getTime() / 1000),
    thumbnails: [item.image?.imageUrl || ""],
    categoryId: item.categoryId || "",
    href: item.itemWebUrl || "",
    designer: "",
    size: item.itemSpecifics?.find((spec) => spec.name === "Size")?.value || "",
    color:
      item.itemSpecifics?.find((spec) => spec.name === "Color")?.value || "",
    condition: item.condition || "",
    location: item.itemLocation.country || "",
    website: "ebay",
  };

  return transformedObject;
};

const scrapeEbay = async (keyword, outputPath, regex) => {
  console.log("starting ebay...");

  try {
    const token = await getOAuthToken();

    const params = {
      q: keyword,
      filter: `conditionIds:{3000}`,
      limit: 200,
    };

    const response = await axios.get(SEARCH_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params,
    });

    const items = response.data.itemSummaries || [];

    const transformedItems = items.map(transformData);

    const filteredItems = transformedItems.filter((item) =>
      regex.test(item.name)
    );

    fs.writeFileSync(
      outputPath,
      JSON.stringify(filteredItems, null, 2),
      "utf8"
    );
    console.log("EBAY ✅");
    
  } catch (error) {
    console.error("Error fetching listings:", error.response?.data || error);
  }
};

module.exports = { scrapeEbay };
