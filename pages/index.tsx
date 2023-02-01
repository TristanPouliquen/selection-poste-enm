import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Position } from "@/types/types";
import CardSmall from "@/components/card_small";
import CardFocus from "@/components/card_focus";
import OnboardingModal from "@/components/Onboarding";

export default function Home() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [focus, setFocus] = useState<Position>();
  useEffect(() => {
    invoke<Position[]>("list_positions")
      .then(setPositions)
      .catch(console.error);
  }, []);
  return (
    <Layout home>
      <OnboardingModal />
      {positions.map((position: Position) => (
        <label key={"position_small_" + position.id} htmlFor="modal">
          <CardSmall position={position} setFocus={setFocus} />
        </label>
      ))}
      <input type="checkbox" id="modal" className="modal-toggle" />
      <CardFocus position={focus} />
    </Layout>
  );
}
