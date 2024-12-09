import { allScrapedData } from "constants/allScrapedData";

export default function getScrapedData(brand: string): {
  auctions: any;
  standard: any;
} {
  return allScrapedData[brand];
}
