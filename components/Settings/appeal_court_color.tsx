import React, { useEffect, useState } from "react";
import { AppealCourt } from "@/types/types";
import ColorPicker from "@/components/Settings/color_picker";
import { invoke } from "@tauri-apps/api/tauri";
import { ColorResult } from "@uiw/color-convert";

const AppealCourtColor = () => {
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
    <>
      <h2 className="text-xl">Cours d&apos;appel</h2>
      <div className="pl-2">
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
      </div>
    </>
  );
};

export default AppealCourtColor;
