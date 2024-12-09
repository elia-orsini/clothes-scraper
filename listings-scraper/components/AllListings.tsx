import AuctionListing from "./AuctionListing";
import { useState } from "react";
import StandardListing from "./StandardListing";
import sortStandardListings from "utils/sortStandardListings";

const AllListings: React.FC<{
  auctionlistings: any;
  standardListings: any;
}> = ({ auctionlistings, standardListings }) => {
  const [displayAuctions, setDisplayAuctions] = useState<boolean>(false);

  const sortedStandardListings = sortStandardListings(standardListings);

  return (
    <div className="flex flex-col mx-4">
      <button
        className="mx-auto my-6 border border-white"
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
            className={`px-3 py-1 ${displayAuctions && "bg-white text-black"}`}
          >
            auctions
          </span>
        </div>
      </button>

      <div className={`w-full ${displayAuctions ? "block" : "hidden"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm">
          <span>{auctionlistings.flat().length} listings</span>
          <span>ordered by most recent</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {auctionlistings.flat().map((listing) => (
            <AuctionListing listing={listing} key={listing.href} />
          ))}
        </div>
      </div>

      <div className={`w-full ${displayAuctions ? "hidden" : "block"}`}>
        <div className="flex flex-row justify-between text-xs sm:text-sm">
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
