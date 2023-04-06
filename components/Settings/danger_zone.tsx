import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { appStateAtom, useAppStateAction } from "@/_state";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const DangerZone = () => {
  const appState = useRecoilValue(appStateAtom);
  const { update } = useAppStateAction();
  const router = useRouter();
  const resetOnboarding = () => {
    appState && update({ ...appState, onboarded: false });
    router.push("/");
  };

  return (
    <div className="border rounded-lg border-error/25 bg-error/10 p-5">
      <h2 id="reset" className="text-xl font-bold text-error mb-3">
        <ExclamationTriangleIcon className="h-8 w-8 mr-3 inline" />
        Réinitialisation du tri
      </h2>
      <p>
        En cliquant sur ce bouton, vous pourrez de nouveau utiliser la
        fonctionnalité de tri par critères.
      </p>
      <p className="font-bold text-error my-3">
        Attention, ceci est irréversible, et risque de vous faire perdre tout
        tri déjà effectué.
      </p>
      <button
        className="btn btn-error rounded mt-3 text-error-content"
        onClick={resetOnboarding}
      >
        Recommencer le tri des postes
      </button>
    </div>
  );
};

export default DangerZone;
