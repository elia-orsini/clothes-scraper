import AllListings from "@components/AllListings";
import { useRouter } from "next/router";
import getAllData from "utils/getAllData";
import getScrapedData from "utils/getScrapedData";

const IndexPage: React.FC = () => {
  const router = useRouter();

  const data = getAllData();

  if (data) {
    return (
      <div className="my-10">
        <AllListings
          auctionlistings={data.auctions}
          standardListings={data.standard}
        />
      </div>
    );
  } else {
    return (
      <div className="flex w-full h-screen">
        <p className="m-auto">no brand found with that name!</p>
      </div>
    );
  }
};

export default IndexPage;