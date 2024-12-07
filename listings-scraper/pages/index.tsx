import MercariData from "../public/data/MA/mercari.json";
import YahooData from "../public/data/MA/yahoo-jp.json";
import AllListings from "@components/AllListings";

const IndexPage: React.FC = () => {
  return (
    <div>
      <AllListings yahoo={YahooData} mercari={MercariData} />
    </div>
  );
};

export default IndexPage;
