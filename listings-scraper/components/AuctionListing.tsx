import Image from "next/image";
import { useState } from "react";

import Spinner from "./Spinner";

const AuctionListing: React.FC<{ listing: any }> = ({ listing }) => {
  const [loading, setLoading] = useState(true);

  const urgent = ["1 hour(s)", "2 hour(s)", "3 hour(s)"].includes(
    listing.timeRemaining
  );

  return (
    <div className="flex flex-col p-2 sm:p-2 border border-white/80 bg-black">
      <a href={listing.href} target="_blank" rel="noreferrer">
        <div className="relative h-80 sm:w-full sm:h-52 bg-black mx-auto">
          {loading && (
            <div className="flex items-center text-xs justify-center h-full">
              <Spinner /> Loading...
            </div>
          )}
          <Image
            className="object-cover"
            fill
            src={listing.imageUrl}
            alt="listing image"
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </a>

      <p className="text-xs my-2 h-20 sm:h-14 font-bold">
        {listing.name.slice(0, 60)}
      </p>

      <p
        className={`text-xs w-max ${
          urgent ? "bg-red-800 px-1 text-white opacity-100" : "opacity-80"
        }`}
      >
        {listing.timeRemaining} remaining {urgent && "!"}
      </p>

      <div className="flex flex-row justify-between mt-2">
        <p className="font-bold">
          {listing.price != "9999999" ? `${listing.price}` : "??"}
          <span className="font-normal text-xs pl-1">£</span>
        </p>
        <Image
          alt="website icon"
          src={`/icons/yahoo.png`}
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default AuctionListing;
