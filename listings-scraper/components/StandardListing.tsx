import Image from "next/image";
import { formatDate } from "utils/parseDate";

const Listing: React.FC<{ listing: any; key: any }> = ({ listing, key }) => {
  return (
    <div className="flex flex-col p-4" key={key}>
      <a href={listing.href} target="_blank" rel="noreferrer">
        <div className="relative w-40 h-44 bg-black mx-auto">
          <Image
            className="object-cover"
            fill
            src={listing.thumbnails[0]}
            alt="listing image"
          />
        </div>
      </a>

      <p className="text-sm h-10">{listing.translatedName}</p>

      <div className="flex flex-row justify-between mt-4">
        <p className="text-sm">{formatDate(listing.created)}</p>
        <p className="text-sm font-bold">
          {listing.price != "9999999"
            ? `${Math.floor(listing.price * 0.0052)}£`
            : "?"}
        </p>
      </div>
    </div>
  );
};

export default Listing;
