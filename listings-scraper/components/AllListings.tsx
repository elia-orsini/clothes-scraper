import AuctionListing from "./AuctionListing";
import { useState } from "react";
import StandardListing from "./StandardListing";
import sortStandardListings from "utils/sortStandardListings";

const AllListings: React.FC<{ yahoo: any; standardListings: any }> = ({
  yahoo,
  standardListings,
}) => {
  const [displayAuctions, setDisplayAuctions] = useState<boolean>(false);

  const sortedStandardListings = sortStandardListings(standardListings);

  return (
    <div className="flex flex-col mx-4">
      <button
        className="mx-auto my-6 border border-black"
        onClick={() => setDisplayAuctions(!displayAuctions)}
      >
        <div className="flex">
          <span
            className={`border-r border-black px-3 py-1 ${
              !displayAuctions && "bg-black text-white"
            }`}
          >
            listings
          </span>
          <span
            className={`px-3 py-1 ${displayAuctions && "bg-black text-white"}`}
          >
            auctions
          </span>
        </div>
      </button>

      <div className={`w-full ${displayAuctions ? "block" : "hidden"}`}>
        {yahoo.length} listings
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {yahoo.map((listing) => (
            <AuctionListing listing={listing} key={listing.href} />
          ))}
        </div>
      </div>

      <div className={`w-full ${displayAuctions ? "hidden" : "block"}`}>
        {sortedStandardListings.length} listings
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {sortedStandardListings.map((listing) => (
            <StandardListing listing={listing} key={listing.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllListings;
