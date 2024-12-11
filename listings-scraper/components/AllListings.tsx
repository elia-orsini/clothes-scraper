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
          className="bg-black text-white w-36 sm:w-52 h-max border-2 font-bold border-white focus:outline-none"
        >
          <option value="all">ALL BRANDS</option>
          <option value="ma">m.a+</option>
          <option value="layer0">layer-0</option>
          <option value="taichimurakami">taichimurakami</option>
        </select>

        <button
          className="border border-white h-max"
          onClick={() => setDisplayAuctions(!displayAuctions)}
        >
          <div className="h-full flex">
            <span
              className={`border-r border-white px-3 py-1 bg-black ${
                !displayAuctions && "bg-white text-black"
              }`}
            >
              listings
            </span>
            <span
              className={`px-3 py-1 bg-black ${
                displayAuctions && "bg-white text-black"
              }`}
            >
              auctions
            </span>
          </div>
        </button>
      </div>

      <div className={`w-full ${displayAuctions ? "block" : "hidden"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm">
          <span className="bg-black p-1">
            <span className="font-bold">{data.auctions.flat().length}</span>
            <span className="opacity-80"> listings</span>
          </span>
          <span className="opacity-80 bg-black p-1">ordered by most recent</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {data.auctions.flat().map((listing) => (
            <AuctionListing listing={listing} key={listing.href} />
          ))}
        </div>
      </div>

      <div className={`w-full ${displayAuctions ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm">
          <span className="bg-black p-1">
            <span className="font-bold">
              {sortedStandardListings.flat().length}
            </span>
            <span className="opacity-80"> listings</span>
          </span>
          <span className="opacity-80 bg-black p-1">ordered by most recent</span>
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
