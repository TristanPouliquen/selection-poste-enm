import React from "react";
import Link from "next/link";
import { GearIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const DrawerMenu = () => (
  <div className="flex flex-col p-4 pt-10 w-80 bg-base-100">
    <Link href="/settings">
      <GearIcon className="h-6 w-6 mr-2 inline" />
      Paramètres
    </Link>
    <div className="divider" />
    <div className="grow pt-3">
      <h2>Filtrer</h2>
      <div className="form-control mb-3">
        <label className="label cursor-pointer">
          <span className="label-text">Masquer les postes déjà pris</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Masquer les postes trop loin</span>
          <input type="checkbox" className="toggle toggle-primary" />
        </label>
      </div>
      <h2>Appliquer un code couleur</h2>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Par fonction</span>
          <input
            type="radio"
            name="colorScheme"
            value="role"
            className="radio radio-primary"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Par cour d&apos;appel</span>
          <input
            type="radio"
            name="colorScheme"
            value="appealCourt"
            className="radio radio-primary"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Par temps de trajet</span>
          <input
            type="radio"
            name="colorScheme"
            value="timeTo"
            className="radio radio-primary"
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Par groupe</span>
          <input
            type="radio"
            name="colorScheme"
            value="group"
            className="radio radio-primary"
          />
        </label>
      </div>
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
