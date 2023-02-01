import React, { PropsWithChildren, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/header";
import DrawerMenu from "@/components/drawer_menu";

type Props = {
  home: boolean;
};
const Layout: React.FC<PropsWithChildren & Props> = ({ children, home }) => {
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // @ts-ignore
        document.getElementById("drawer").checked = false;
      }
    };
    document.addEventListener("keydown", closeOnEsc, false);
    return () => {
      document.removeEventListener("keydown", closeOnEsc, false);
    };
  });
  return (
    <>
      <Head>
        <title>Sélection 1er poste ENM</title>
        <meta
          name="description"
          content="Outil d'aide au classement des postes ouverts"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-none drawer drawer-end">
        <input type="checkbox" id="drawer" className="drawer-toggle" />
        <div className="drawer-content">
          <Header home={home} />
          <main className="px-5">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <DrawerMenu />
        </div>
      </div>
    </>
  );
};

export default Layout;
