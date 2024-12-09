import Image from "next/image";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="text-white z-20 mt-20 ml-2 absolute">
        <p className="text-xl">scraping: {`{`}</p>
        <ul className="ml-10">
          <li>mercari</li>
          <li>yahoo auctions</li>
          <li>xianyu</li>
        </ul>
        <p className="text-xl">{`}`}</p>

        <p className="text-xl mt-4">brands: {`{`}</p>
        <ul className="ml-10">
          <Link href="/brand/ma">m.a+</Link>
        </ul>
        <p className="text-xl">{`}`}</p>
      </div>
      <div className="m-auto w-max flex flex-col">
        <div className="relative w-[80vh] h-[80vh] mx-auto">
          <Image
            className="absolute m-auto"
            alt="clothes scraper logo"
            fill
            src="/icons/clothes-scraper.png"
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
