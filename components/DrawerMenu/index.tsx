import React from "react";
import Link from "next/link";
import { GearIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Filters from "@/components/DrawerMenu/filters";
import ColorCode from "@/components/DrawerMenu/color_code";

const DrawerMenu = () => (
  <div className="flex flex-col p-4 pt-10 w-80 bg-base-100">
    <Link href="/settings">
      <GearIcon className="h-6 w-6 mr-2 inline" />
      Paramètres
    </Link>
    <div className="divider" />
    <div className="grow pt-3">
      <h2>Filtrer</h2>
      <Filters />
      <h2>Appliquer un code couleur</h2>
      <ColorCode />
    </div>
    <div className="text-center text-sm text-secondary-content/50">
      <p>Réalisé par Tristan Pouliquen.</p>
      <p>
        Projet disponible sur{" "}
        <a href="">
          <GitHubLogoIcon className="inline mr-1" />
          Github
        </a>
      </p>
    </div>
  </div>
);

export default DrawerMenu;
