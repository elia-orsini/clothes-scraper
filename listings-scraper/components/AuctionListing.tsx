import Image from "next/image";

const AuctionListing: React.FC<{ listing: any }> = ({ listing }) => {
  return (
    <div className="flex flex-col p-4 ">
      <a href={listing.href} target="_blank" rel="noreferrer">
        <div className="relative w-40 h-44 bg-black mx-auto">
          <Image
            className="object-cover"
            fill
            src={listing.imageUrl}
            alt="listing image"
          />
        </div>
      </a>

      <p className="text-sm h-20">{listing.title}</p>

      <div className="flex flex-row justify-between mt-4">
        <p className="text-sm font-bold">{listing.price}</p>
        <p className="text-sm">{listing.timeRemaining}</p>
      </div>
    </div>
  );
};

export default AuctionListing;
