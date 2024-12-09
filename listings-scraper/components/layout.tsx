import Link from "next/link";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-max bg-black text-white font-mono">
      <div className="flex fixed w-screen h-[5vh] flex-row gap-x-3 sm:gap-x-10 z-10 bg-black text-white p-2 border-b border-white">
        <Link href="/" className="pr-5">
          clothes scraper
        </Link>
        <Link href="/all">all</Link>
        <Link href="/brand/ma">m.a+</Link>
      </div>
      <main className="flex mx-auto w-full h-full min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
