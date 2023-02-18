import React from "react";
import { BookmarkIcon, SewingPinIcon } from "@radix-ui/react-icons";

const SettingsMenu = () => (
  <div className="w-72 border-r p-4">
    <div className="sticky top-20">
      <h1 className="text-lg font-bold mb-3">Table des matières</h1>
      <div className="mb-2">
        <a href=".#tags">
          <BookmarkIcon className="h-4 w-4 mr-1 inline" />
          Tags
        </a>
      </div>
      <div className="mb-2">
        <a href=".#time-windows">
          <SewingPinIcon className="h-4 w-4 mr-1 inline" />
          Distance aux tribunaux
        </a>
      </div>
      <p className="font-semibold pt-2">Codes couleurs</p>
      <div className="pl-2 mt-2">
        <div className="mb-2">
          <a href=".#groups-color">Groupes de tribunaux</a>
        </div>
        <div className="mb-2">
          <a href=".#roles-color">Fonctions</a>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsMenu;
