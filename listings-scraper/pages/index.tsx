import Image from "next/image";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="text-white z-20 mt-10 sm:mt-14 ml-2 absolute opacity-80">
        <p className="text-base sm:text-lg">scraping: {`{`}</p>
        <ul className="ml-10 text-xs sm:text-base">
          <li>mercari</li>
          <li>yahoo auctions</li>
          <li>xianyu</li>
          <li>grailed</li>
        </ul>
        <p className="text-xl">{`}`}</p>

        <p className="text-base sm:text-lg mt-2 sm:mt-4">brands: {`{`}</p>
        <ul className="ml-10 text-xs sm:text-base">
          <li>m.a+</li>
          <li>layer-0</li>
          <li>taichimurakami</li>
        </ul>
        <p className="text-xl">{`}`}</p>
      </div>

      <div className="m-auto w-max flex flex-col overflow-hidden">
        <div className="relative w-[60vh] h-[60vh] sm:w-[90vh] sm:h-[90vh] mx-auto opacity-80">
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
          className="text-4xl border-2 px-2 border-white text-[#a3e635] border-[#a3e635] bg-black hover:cursor-pointer"
          href="/all"
        >
          enter
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
