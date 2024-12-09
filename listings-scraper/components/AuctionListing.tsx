import Image from "next/image";

const AuctionListing: React.FC<{ listing: any }> = ({ listing }) => {
  const urgent = ["1 hour(s)", "2 hour(s)", "3 hour(s)"].includes(
    listing.timeRemaining
  );

  console.log(urgent, listing.timeRemaining);

  return (
    <div className="flex flex-col p-2 sm:p-4 border border-white">
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

      <p className="text-xs my-2 h-20 sm:h-14 font-bold">
        {listing.translatedName.slice(0, 60)}
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
