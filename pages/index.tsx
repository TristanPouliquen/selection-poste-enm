import Layout from "@/components/layout";
import CardFocus from "@/components/card_focus";
import {
  currentPositionIdAtom,
  positionSelector,
  useInitializeState,
  appStateAtom,
} from "@/_state";
import { useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import OnboardingModal from "@/components/Onboarding";
import PositionsList from "@/components/positions_list";

export default function Home() {
  const appState = useRecoilValue(appStateAtom);
  const currentPositionId = useRecoilValue(currentPositionIdAtom);
  const currentPosition = useRecoilValue(positionSelector(currentPositionId));
  const { isInitialized, initializeState } = useInitializeState();
  useEffect(() => {
    if (!isInitialized) {
      initializeState();
    }
  }, [isInitialized, initializeState]);
  return (
    <Layout home>
      {appState && !appState.onboarded ? <OnboardingModal /> : null}
      <PositionsList />
      <input type="checkbox" id="modal" className="modal-toggle" />
      {currentPosition ? <CardFocus position={currentPosition} /> : null}
    </Layout>
  );
}
