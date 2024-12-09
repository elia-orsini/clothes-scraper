import AuctionListing from "./AuctionListing";
import { useEffect, useState } from "react";
import StandardListing from "./StandardListing";
import sortStandardListings from "utils/sortStandardListings";
import getScrapedData from "utils/getScrapedData";

const AllListings: React.FC = () => {
  const [displayAuctions, setDisplayAuctions] = useState<boolean>(false);
  const [brand, setBrand] = useState("all");
  const [data, setData] = useState({ standard: [], auctions: [] });

  const sortedStandardListings = sortStandardListings(data.standard);

  useEffect(() => {
    setData(getScrapedData(brand));
  }, [brand]);

  return (
    <div className="flex flex-col mx-4">
      <div className="flex flex-row gap-x-4 sm:gap-x-10 h-max py-6 text-xs sm:text-base">
        <select
          onChange={(e) => setBrand(e.target.value)}
          className="bg-black text-white w-28 sm:w-40 h-max border-2 font-bold border-white focus:outline-none"
        >
          <option value="all">ALL BRANDS</option>
          <option value="ma">m.a+</option>
        </select>

        <button
          className="border border-white"
          onClick={() => setDisplayAuctions(!displayAuctions)}
        >
          <div className="flex">
            <span
              className={`border-r border-white px-3 py-1 ${
                !displayAuctions && "bg-white text-black"
              }`}
            >
              listings
            </span>
            <span
              className={`px-3 py-1 ${
                displayAuctions && "bg-white text-black"
              }`}
            >
              auctions
            </span>
          </div>
        </button>
      </div>

      <div className={`w-full ${displayAuctions ? "block" : "hidden"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm opacity-80">
          <span>{data.auctions.flat().length} listings</span>
          <span>ordered by most recent</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {data.auctions.flat().map((listing) => (
            <AuctionListing listing={listing} key={listing.href} />
          ))}
        </div>
      </div>

      <div className={`w-full ${displayAuctions ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm opacity-80">
          <span>{sortedStandardListings.length} listings</span>
          <span>ordered by most recent</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {sortedStandardListings.map((listing) => (
            <StandardListing listing={listing} key={listing.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllListings;
