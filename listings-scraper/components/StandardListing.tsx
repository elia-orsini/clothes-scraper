import Image from "next/image";
import { formatDate } from "utils/formatDate";

const Listing: React.FC<{ listing: any; key: any }> = ({ listing, key }) => {
  return (
    <div className="flex flex-col p-2 sm:p-4 border border-white/80" key={key}>
      <a href={listing.href} target="_blank" rel="noreferrer">
        <div className="relative w-32 h-28 sm:w-40 sm:h-40 bg-black mx-auto">
          <Image
            className="object-cover"
            fill
            src={listing.thumbnails[0]}
            alt="listing image"
          />
        </div>
      </a>

      <p className="text-xs my-2 h-14 font-bold">{listing.name.slice(0, 60)}</p>

      <div className="flex flex-row justify-between">
        <p className="text-xs opacity-80">{formatDate(listing.created)}</p>
        <p className="text-xs opacity-80 lowercase">{listing.location }</p>
      </div>

      <div className="flex flex-row justify-between mt-2">
        <p className="font-bold">
          {listing.price != 52000 ? `${listing.price}` : "?"}
          <span className="font-normal text-xs pl-1">£</span>
        </p>

        <Image
          alt="website icon"
          src={`/icons/${listing.website}.png`}
          width={28}
          height={28}
        />
      </div>
    </div>
  );
};

export default Listing;
