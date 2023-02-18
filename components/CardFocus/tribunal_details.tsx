import React from "react";
import { formatDuration } from "date-fns";
import { fr } from "date-fns/locale";
import { Tribunal } from "@/types/types";
import ReactEditorForm from "@/components/CardFocus/react_editor_form";
import { useTribunalsAction } from "@/_state";

interface IProps {
  tribunal: Tribunal;
}
const TribunalDetails = ({ tribunal }: IProps) => {
  const { update } = useTribunalsAction();
  const onChange = (notes: string) => {
    return update({ ...tribunal, notes });
  };
  return (
    <div>
      <h2 className="text-lg font-bold">{tribunal.name}</h2>
      <div className="flex flex-row mb-4">
        <p className="mr-14">
          <span className="font-bold">Cour d&apos;appel: </span>{" "}
          {tribunal.appealCourt?.name}
        </p>
        <p className="mr-14">
          <span className="font-bold">Groupe: </span> {tribunal.group?.name}
        </p>
        <p>
          <span className="font-bold">Temps de trajet: </span>
          {tribunal.timeTo ? (
            <span
              className={`badge badge-outline${
                tribunal.timeWindow
                  ? ` color-[${tribunal.timeWindow.color}]`
                  : null
              } `}
            >
              {formatDuration({ minutes: tribunal.timeTo }, { locale: fr })}
            </span>
          ) : (
            "Non renseigné"
          )}
        </p>
      </div>
      <ReactEditorForm
        value={tribunal.notes}
        onChangeCallback={onChange}
        key={"tribunal_notes_" + tribunal.id}
      />
    </div>
  );
};

export default TribunalDetails;
