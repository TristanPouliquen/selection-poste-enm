import React, { useState } from "react";
import { formatDuration } from "date-fns";
import { fr } from "date-fns/locale";
import { Tribunal } from "@/types/types";
import ReactEditorForm from "@/components/CardFocus/react_editor_form";
import { useTribunalsAction } from "@/_state";
import { useForm } from "react-hook-form";
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";

interface IProps {
  tribunal: Tribunal;
}

interface IFormProps {
  timeTo?: number;
}
const TribunalDetails = ({ tribunal }: IProps) => {
  const [editingTribunal, setEditingTribunal] = useState<boolean>(false);
  const { handleSubmit, register } = useForm<IFormProps>({
    defaultValues: {
      timeTo: tribunal.timeTo,
    },
  });
  const { update } = useTribunalsAction();
  const onChange = (notes: string) => {
    return update({ ...tribunal, notes });
  };
  const onSubmit = async (formValue: IFormProps) => {
    await update({ ...tribunal, timeTo: formValue.timeTo });
    setEditingTribunal(false);
  };
  const toggleForm = (e) => {
    e.preventDefault();
    setEditingTribunal(true);
  };
  console.log(tribunal);
  return (
    <div>
      <h2 className="text-lg font-bold">{tribunal.name}</h2>
      <div className="flex flex-row mb-4">
        <p className="mr-14">
          <span className="font-bold mr-2">Cour d&apos;appel: </span>
          {tribunal.appealCourt?.name}
        </p>
        <p className="mr-14">
          <span className="font-bold mr-2">Groupe: </span>
          {tribunal.group?.name}
        </p>
        <p className="flex flex-row">
          <span className="font-bold mr-2">Temps de trajet: </span>
          {!editingTribunal ? (
            <span className="flex flex-row">
              {tribunal.timeTo ? (
                <span
                  className="badge badge-outline"
                  style={
                    tribunal.timeWindow
                      ? { color: tribunal.timeWindow.color }
                      : undefined
                  }
                >
                  {formatDuration({ minutes: tribunal.timeTo }, { locale: fr })}
                </span>
              ) : (
                "Non renseigné"
              )}
              <button
                onClick={toggleForm}
                className="btn btn-square btn-xs btn-ghost inline mx-2 flex items-center"
              >
                <Pencil1Icon className="h-4 w-4" />
              </button>
            </span>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control flex flex-row"
            >
              <input
                className="input input-bordered input-xs w-16 mr-2"
                {...register("timeTo", { required: true, valueAsNumber: true })}
              />
              minutes
              <button
                type="submit"
                className="btn btn-square btn-xs btn-ghost inline mx-2 flex items-center"
              >
                <CheckIcon className="h-4 w-4" />
              </button>
            </form>
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
