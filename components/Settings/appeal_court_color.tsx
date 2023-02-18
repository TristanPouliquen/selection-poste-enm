import React from "react";
import { AppealCourt } from "@/types/types";
import ColorPicker from "@/components/Settings/color_picker";
import { useRecoilValue } from "recoil";
import { appealCourtsAtom, useAppealCourtsAction } from "@/_state";

const AppealCourtColor = () => {
  const appealCourts = useRecoilValue(appealCourtsAtom);
  const { update } = useAppealCourtsAction();
  return (
    <>
      <h2 className="text-xl">Cours d&apos;appel</h2>
      <div className="pl-2">
        <ul>
          {appealCourts.map((appealCourt: AppealCourt) => (
            <label>
              {appealCourt.name}
              <ColorPicker
                key={"colorpicker_appealCourt_" + appealCourt.id}
                value={appealCourt.color}
                onChange={(color) => update({ ...appealCourt, color })}
              />
            </label>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AppealCourtColor;
