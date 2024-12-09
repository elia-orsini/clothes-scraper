import { allScrapedData } from "constants/allScrapedData";

export default function getAllData(): {
  auctions: any;
  standard: any;
} {
  const allData = {
    auctions: [],
    standard: [],
  };

  for (const key in allScrapedData) {
    if (allScrapedData[key].auctions) {
      allData.auctions.push(...allScrapedData[key].auctions);
    }
    if (allScrapedData[key].standard) {
      allData.standard.push(...allScrapedData[key].standard);
    }
  }

  return allData;
}
