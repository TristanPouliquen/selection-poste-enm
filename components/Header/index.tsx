import React from "react";
import Link from "next/link";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import SearchBar from "@/components/Header/search_bar";

interface IProps {
  home: boolean;
}
const Index = ({ home }: IProps) => {
  return (
    <header className="sticky top-0 bg-base-100 h-16">
      <div className="navbar bg-base-100 px-6 border-0 border-b border-base-200">
        <div className="flex-1">
          {home ? (
            <span className="normal-case text-xl">Mes postes ENM</span>
          ) : (
            <Link href="/" className="normal-case text-xl">
              Mes postes ENM
            </Link>
          )}
        </div>
        {home ? <SearchBar /> : null}
        <label htmlFor="drawer" className="drawer-button cursor-pointer p-2">
          <MixerHorizontalIcon className="h-6 w-6" />
        </label>
      </div>
    </header>
  );
};

export default Index;
