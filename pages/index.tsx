import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Layout from "@/components/layout";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import CardFocus from "@/components/card_focus";
import OnboardingModal from "@/components/Onboarding";

export default function Home() {
  //const positions = useRecoilValue(positionsAtom);
  //const currentPosition = useRecoilValue(currentPositionAtom);
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Position | undefined>(
    undefined
  );
  useEffect(() => {
    invoke<Position[]>("list_positions").then((result) => setPositions(result));
  }, [positions, setPositions]);
  return (
    <Layout home>
      <OnboardingModal />
      {positions.map((position: Position) => (
        <label key={"position_small_" + position.id} htmlFor="modal">
          <CardSmall position={position} handler={setCurrentPosition} />
        </label>
      ))}
      <input type="checkbox" id="modal" className="modal-toggle" />
      <CardFocus position={currentPosition} />
    </Layout>
  );
}
