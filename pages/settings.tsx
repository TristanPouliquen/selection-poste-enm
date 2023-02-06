import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { AppealCourt } from "@/types/types";
import ColorPicker from "@/components/color_picker";

export default function Settings() {
  const [appealCourts, setAppealCourts] = useState<AppealCourt[]>([]);
  useEffect(() => {
    invoke<AppealCourt[]>("list_appeal_courts")
      .then(setAppealCourts)
      .catch(console.error);
  }, []);
  return (
    <Layout home={false}>
      <h1>Configurer les codes couleur</h1>
      <h2>Cours d&apos;appel</h2>
      <ul>
        {appealCourts.map((appealCourt: AppealCourt) => (
          <ColorPicker
            key={"colorpicker_appealCourt_" + appealCourt.id}
            {...appealCourt}
            updateCallback={"update_appeal_court_color"}
          />
        ))}
      </ul>
    </Layout>
  );
}
