import Image from "next/image";
import { formatDate } from "utils/formatDate";

const Listing: React.FC<{ listing: any; key: any }> = ({ listing, key }) => {
  return (
    <div className="flex flex-col p-4 border border-black" key={key}>
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

      <p className="text-sm h-14 font-bold">
        {listing.translatedName.slice(0, 60)}
      </p>

      <p className="text-xs">{formatDate(listing.created)}</p>

      <div className="flex flex-row justify-between mt-2">
        <p className="font-bold">
          {listing.price != "9999999" ? `${listing.price}£` : "?"}
        </p>
        <Image
          alt="website icon"
          src={`/icons/${
            listing.href.includes("mercari") ? "mercari.jpg" : "xianyu.png"
          }`}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default Listing;
