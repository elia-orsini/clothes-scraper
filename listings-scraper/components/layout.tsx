import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

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
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col w-full h-max bg-black text-white font-mono">
      <div className="flex fixed w-screen h-[5vh] flex-row gap-x-3 sm:gap-x-10 z-10 bg-black text-white p-2 border-b border-white justify-between">
        <Link href="/" className="pr-5">
          clothes scraper
        </Link>

        <div className="flex flex-row">
          <div className="relative w-8 h-8 -mt-1">
            <Image src="/icons/loading.webp" fill alt="" />
          </div>
          <span className="text-xs my-auto">
            ...{actions[stateIndex[0]]} {targets[stateIndex[1]]}
          </span>
        </div>
      </div>
      <main className="flex mx-auto w-full h-full min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
