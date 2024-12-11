import Image from "next/image";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="text-white z-20 mt-10 sm:mt-14 ml-2 absolute opacity-80">
        <p className="text-sm sm:text-lg">scraping: {`{`}</p>
        <ul className="ml-10 text-[0.7em] sm:text-base">
          <li>mercari</li>
          <li>yahoo auctions</li>
          <li>xianyu</li>
          <li>grailed</li>
        </ul>
        <p className="text-sm sm:text-lg">{`}`}</p>

        <p className="text-sm sm:text-lg mt-2 sm:mt-4">brands: {`{`}</p>
        <ul className="ml-10 text-[0.7em] sm:text-base">
          <li>m.a+</li>
          <li>layer-0</li>
          <li>taichimurakami</li>
        </ul>
        <p className="text-sm sm:text-lg">{`}`}</p>
      </div>

      <div className="m-auto w-max flex flex-col overflow-hidden">
        <div className="relative -ml-4 sm:ml-0 w-[60vh] h-[60vh] sm:w-[90vh] sm:h-[90vh] mx-auto">
          <Image
            className="absolute m-auto"
            alt="clothes scraper logo"
            fill
            src="/icons/clothes-scraper.png"
          />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link
          className="text-4xl font-semibold border-4 px-4 py-2 border-white text-white bg-black hover:cursor-pointer"
          href="/all"
        >
          enter
        </Link>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link
          className="text-4xl animate-ping font-semibold border-4 px-4 py-2 border-white text-white bg-white z-40 hover:cursor-pointer"
          href="/all"
        >
          enter
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
