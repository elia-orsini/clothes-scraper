import MercariMaData from "../public/data/MA/mercari.json";
import XianyuMaData from "../public/data/MA/xianyu.json";
import YahooMaData from "../public/data/MA/yahoo.json";

export const allScrapedData = {
  ma: {
    auctions: [YahooMaData],
    standard: [MercariMaData, XianyuMaData],
  },
};
