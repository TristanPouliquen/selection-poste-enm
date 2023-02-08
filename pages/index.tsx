import Layout from "@/components/layout";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import CardFocus from "@/components/card_focus";
import {
  currentPositionIdAtom,
  positionsSelector,
  positionSelector,
  useInitializeState,
} from "@/_state";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

export default function Home() {
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
      {
        //<OnboardingModal />
      }
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
