import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stateIndex, setStateIndex] = useState([0, 0]);

  const actions = [
    "scraping",
    "harvesting",
    "refreshing",
    "extracting",
    "crawling",
    "indexing",
    "parsing",
    "aggregating",
    "monitoring",
    "mining",
    "fetching",
    "analyzing",
    "collecting",
    "tracking",
  ];

  const targets = ["grailed", "mercari", "xianyu", "yahoo.jp"];

  useEffect(() => {
    setInterval(() => {
      setStateIndex([
        Math.floor(Math.random() * actions.length),
        Math.floor(Math.random() * targets.length),
      ]);
    }, 1500);
  }, []);

  return (
    <div className="flex flex-col w-full h-max bg-black text-white font-mono">
      <div className="flex z-40 fixed w-screen h-[5vh] flex-row gap-x-3 sm:gap-x-10 z-10 bg-black text-white p-2 border-b border-white justify-between">
        <div className="flex flex-row">
          <Link href="/" className="sm:pr-5 text-xs sm:text-base">
            {">"} clothes scraper
          </Link>
        </div>

        <div className="flex flex-row">
          <span className="text-xs my-auto">
            <Spinner />
            ...{actions[stateIndex[0]]} {targets[stateIndex[1]]}
          </span>
        </div>
      </div>

      <div className="w-screen h-screen fixed opacity-80">
        <Image
          fill
          alt=""
          src="/style/bg.jpg"
          className="fixed object-cover z-10"
        />
      </div>

      <main className="flex mx-auto w-full h-full min-h-screen z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
