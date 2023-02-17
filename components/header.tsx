import React from "react";
import Link from "next/link";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import SearchBar from "@/components/search_bar";

interface IProps {
  home: boolean;
}
const Header = ({ home }: IProps) => {
  return (
    <header>
      <div className="navbar bg-base-100 px-6">
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
        <label htmlFor="drawer" className="drawer-button cursor-pointer">
          <MixerHorizontalIcon className="h-6 w-6" />
        </label>
      </div>
    </header>
  );
};

export default Header;
