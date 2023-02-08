import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { AppealCourt } from "@/types/types";
import ColorPicker from "@/components/color_picker";
import { ColorResult } from "@uiw/color-convert";

export default function Settings() {
  const [appealCourts, setAppealCourts] = useState<AppealCourt[]>([]);
  useEffect(() => {
    invoke<AppealCourt[]>("get_appeal_courts")
      .then(setAppealCourts)
      .catch(console.error);
  }, []);
  const updateAppealCourtColor = (
    appealCourt: AppealCourt,
    color: ColorResult
  ) => {
    invoke<AppealCourt>("update_appeal_court", {
      appealCourt: { ...appealCourt, color: color.hex },
    }).then((result) => {
      setAppealCourts(
        appealCourts.map((ac) => (ac.id === result.id ? result : ac))
      );
    });
  };
  return (
    <Layout home={false}>
      <h1>Configurer les codes couleur</h1>
      <h2>Cours d&apos;appel</h2>
      <ul>
        {appealCourts.map((appealCourt: AppealCourt) => (
          <ColorPicker
            key={"colorpicker_appealCourt_" + appealCourt.id}
            {...appealCourt}
            onColorChanged={(color) =>
              updateAppealCourtColor(appealCourt, color)
            }
          />
        ))}
      </ul>
    </Layout>
  );
}
