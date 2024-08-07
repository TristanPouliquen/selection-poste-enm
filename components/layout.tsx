import React, { PropsWithChildren, useEffect } from "react";
import Head from "next/head";
import Index from "@/components/Header";
import DrawerMenu from "@/components/DrawerMenu";

type Props = {
  home: boolean;
};
const Layout = ({ children, home }: PropsWithChildren & Props) => {
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
        <div className="drawer-content flex flex-col">
          <Index home={home} />
          <main className="px-5 grow flex">{children}</main>
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
