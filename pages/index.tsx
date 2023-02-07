import Layout from "@/components/layout";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import CardFocus from "@/components/card_focus";
import OnboardingModal from "@/components/Onboarding";
import { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { currentPositionAtom, positionsAtom } from "@/_state";

export default function Home() {
  //const positions = useRecoilValue(positionsAtom);
  //const currentPosition = useRecoilValue(currentPositionAtom);
  const [positions] = useState<Position[]>([]);
  const [currentPosition] = useState<Position>();
  return (
    <Layout home>
      <OnboardingModal />
      {positions.map((position: Position) => (
        <label key={"position_small_" + position.id} htmlFor="modal">
          <CardSmall position={position} />
        </label>
      ))}
      <input type="checkbox" id="modal" className="modal-toggle" />
      <CardFocus position={currentPosition} />
    </Layout>
  );
}
