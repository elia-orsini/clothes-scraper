import Image from "next/image";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="text-white z-20 mt-20 ml-2 absolute opacity-80">
        <p className="text-xl">scraping: {`{`}</p>
        <ul className="ml-10">
          <li>mercari</li>
          <li>yahoo auctions</li>
          <li>xianyu</li>
          <li>grailed</li>
        </ul>
        <p className="text-xl">{`}`}</p>

        <p className="text-xl mt-4">brands: {`{`}</p>
        <ul className="ml-10">m.a+</ul>
        <p className="text-xl">{`}`}</p>
      </div>

      <div className="m-auto w-max flex flex-col">
        <div className="relative w-[90vh] h-[90vh] mx-auto opacity-80">
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
