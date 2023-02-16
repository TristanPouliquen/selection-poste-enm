import Layout from "@/components/layout";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import CardFocus from "@/components/card_focus";
import {
  currentPositionIdAtom,
  positionsSelector,
  positionSelector,
  useInitializeState,
  appStateAtom,
} from "@/_state";
import { useRecoilValue } from "recoil";
import React, { useEffect } from "react";
import OnboardingModal from "@/components/Onboarding";

export default function Home() {
  const appState = useRecoilValue(appStateAtom);
  const positions = useRecoilValue(positionsSelector);
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
      {positions.map((position?: Position) =>
        position !== undefined ? (
          <label key={"position_small_" + position.id} htmlFor="modal">
            <CardSmall position={position} />
          </label>
        ) : null
      )}
      <input type="checkbox" id="modal" className="modal-toggle" />
      <CardFocus position={currentPosition} />
    </Layout>
  );
}
