import AuctionListing from "./AuctionListing";
import { useState } from "react";
import StandardListing from "./StandardListing";

const AllListings: React.FC<{ yahoo: any; mercari: any }> = ({
  yahoo,
  mercari,
}) => {
  const [displayAuctions, setDisplayAuctions] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <button
        className="mx-auto my-8"
        onClick={() => setDisplayAuctions(!displayAuctions)}
      >
        switch items type
      </button>

      {displayAuctions ? (
        <div>
          <h1 className="text-lg font-bold">Auctions</h1>
          <div className="grid grid-cols-4">
            {yahoo.map((listing) => (
              <AuctionListing listing={listing} key={listing.href} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold">Listings</h1>
          <div className="grid grid-cols-4">
            {mercari.map((listing) => (
              <StandardListing listing={listing} key={listing.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllListings;
