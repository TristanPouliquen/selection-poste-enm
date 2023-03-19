import React from "react";
import { AppealCourt } from "@/types/types";
import ColorPicker from "@/components/Settings/color_picker";
import { useRecoilValue } from "recoil";
import { appealCourtsAtom, useAppealCourtsAction } from "@/_state";
import { Controller, useForm } from "react-hook-form";
import { CheckIcon } from "@radix-ui/react-icons";

interface IProps {
  appealCourt: AppealCourt;
}

const AppealCourtColorForm = ({ appealCourt }: IProps) => {
  const { update } = useAppealCourtsAction();
  const { control, handleSubmit } = useForm<AppealCourt>({
    defaultValues: appealCourt,
  });
  const onSubmit = (formValue: AppealCourt) => update(formValue);

  return (
    <form
      className="form-control flex flex-row justify-between border rounded mb-3 p-2 shadow-md"
      style={
        appealCourt.color !== "#797979"
          ? { backgroundColor: `${appealCourt.color}33` }
          : undefined
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <label className="mr-4">
          Nom
          <input
            className="ml-2 input input-bordered input-sm input-disabled"
            disabled
            value={appealCourt.name}
          />
        </label>
        <label className="flex flex-row items-center">
          Couleur
          <Controller
            name="color"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <ColorPicker
                value={value}
                onChange={onChange}
                id={`appeal_court_color_picker_${appealCourt.id}`}
              />
            )}
          />
        </label>
      </div>
      <div className="flex items-center">
        <button
          type="submit"
          className="btn btn-square btn-sm btn-ghost mx-2 flex items-center"
        >
          <CheckIcon className="h-6 w-6" />
        </button>
      </div>
    </form>
  );
};

const AppealCourtColor = () => {
  const appealCourts = useRecoilValue(appealCourtsAtom);
  return (
    <>
      <h2 id="appeal-courts-color" className="text-xl mb-2">
        Cours d&apos;appel
      </h2>
      <div className="pl-2">
        {appealCourts.map((appealCourt) => (
          <AppealCourtColorForm
            appealCourt={appealCourt}
            key={`appeal_court_form_${appealCourt.id}`}
          />
        ))}
      </div>
    </>
  );
};

export default AppealCourtColor;
