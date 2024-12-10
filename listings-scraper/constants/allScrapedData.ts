// MA
import MercariMaData from "../public/data/MA/mercari.json";
import XianyuMaData from "../public/data/MA/xianyu.json";
import GrailedMaData from "../public/data/MA/grailed.json";
import YahooMaData from "../public/data/MA/yahoo.json";
// LAYER-0
import MercariLayer0Data from "../public/data/Layer-0/mercari.json";
import XianyuLayer0Data from "../public/data/Layer-0/xianyu.json";
import GrailedLayer0Data from "../public/data/Layer-0/grailed.json";
import YahooLayer0Data from "../public/data/Layer-0/yahoo.json";
// taichimurakami
import MercariTaichiData from "../public/data/taichimurakami/mercari.json";
import XianyuTaichiData from "../public/data/taichimurakami/xianyu.json";
import GrailedTaichiData from "../public/data/taichimurakami/grailed.json";
import YahooTaichiData from "../public/data/taichimurakami/yahoo.json";

export const allScrapedData = {
  ma: {
    auctions: [YahooMaData],
    standard: [MercariMaData, XianyuMaData, GrailedMaData],
  },
  layer0: {
    auctions: [YahooLayer0Data],
    standard: [MercariLayer0Data, XianyuLayer0Data, GrailedLayer0Data],
  },
  taichimurakami: {
    auctions: [YahooTaichiData],
    standard: [MercariTaichiData, XianyuTaichiData, GrailedTaichiData],
  },
};
