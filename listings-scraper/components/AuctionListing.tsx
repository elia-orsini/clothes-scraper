import Image from "next/image";

const AuctionListing: React.FC<{ listing: any }> = ({ listing }) => {
  return (
    <div className="flex flex-col p-2 sm:p-4 border border-black">
      <a href={listing.href} target="_blank" rel="noreferrer">
        <div className="relative w-32 h-28 sm:w-40 sm:h-40 bg-black mx-auto">
          <Image
            className="object-cover"
            fill
            src={listing.imageUrl}
            alt="listing image"
          />
        </div>
      </a>

      <p className="text-xs sm:text-sm h-20 sm:h-14 font-bold">
        {listing.translatedName.slice(0,60)}
      </p>

      <p className="text-xs">{listing.timeRemaining} remaining</p>

      <div className="flex flex-row justify-between mt-2">
        <p className="font-bold">
          {listing.price != "9999999" ? `${listing.price}£` : "?"}
        </p>
        <Image
          alt="website icon"
          src={`/icons/yahoo.png`}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default AuctionListing;
