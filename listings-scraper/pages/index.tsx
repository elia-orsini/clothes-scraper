import MercariData from "../public/data/MA/mercari.json";
import XianyuData from "../public/data/MA/xianyu.json";
import YahooData from "../public/data/MA/yahoo.json";
import AllListings from "@components/AllListings";

const IndexPage: React.FC = () => {
  return (
    <AllListings
      yahoo={YahooData}
      standardListings={[MercariData, XianyuData]}
    />
  );
};

export default IndexPage;
