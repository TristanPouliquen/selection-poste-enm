import React from "react";
import {
  BookmarkIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  PersonIcon,
  SewingPinIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const SettingsMenu = () => (
  <div className="w-72 border-r p-4">
    <div className="sticky top-20">
      <h1 className="text-lg font-bold mb-3">Table des matières</h1>
      <div className="mb-2">
        <Link href="#tags">
          <BookmarkIcon className="h-4 w-4 mr-1 inline" />
          Tags
        </Link>
      </div>
      <div className="mb-2">
        <Link href="#time-windows">
          <SewingPinIcon className="h-4 w-4 mr-1 inline" />
          Distance aux tribunaux
        </Link>
      </div>
      <p className="font-semibold pt-2">Codes couleurs</p>
      <div className="pl-2 mt-2">
        <div className="mb-2">
          <Link href="#groups-color">
            <Share1Icon className="h-4 w-4 mr-1 inline" />
            Groupes de tribunaux
          </Link>
        </div>
        <div className="mb-2">
          <Link href="#roles-color">
            <PersonIcon className="h-4 w-4 mr-1 inline" />
            Fonctions
          </Link>
        </div>
        <div className="mb-2">
          <Link href="#appeal-courts-color">
            <HomeIcon className="h-4 w-4 mr-1 inline" />
            Cours d&apos;appel
          </Link>
        </div>
      </div>
      <div className="font-semibold mt-6">
        <Link href="#reset">
          <ExclamationTriangleIcon className="h-4 w-4 mr-1 inline" />
          Réinitialisation
        </Link>
      </div>
    </div>
  </div>
);

export default SettingsMenu;
