import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-max">
      <div className="flex fixed w-screen flex-row gap-x-3 sm:gap-x-10 z-10 bg-black text-white p-2">
        <p className="pr-5">listings scraper</p>
      </div>
      <main className="flex mx-auto w-full h-full min-h-screen my-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
