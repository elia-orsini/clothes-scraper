import { allScrapedData } from "constants/allScrapedData";

export default function getScrapedData(brand: string): {
  auctions: any;
  standard: any;
} {
  if (brand === "all") {
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

  return allScrapedData[brand];
}
