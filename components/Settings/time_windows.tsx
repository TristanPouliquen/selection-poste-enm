import React from "react";
import { useRecoilValue } from "recoil";
import { timeWindowAtom, useTimeWindowsActions } from "@/_state/timeWindow";
import { TimeWindow } from "@/types/types";
import { Controller, useForm } from "react-hook-form";
import ColorPicker from "@/components/Settings/color_picker";
import { CheckIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

interface IProps {
  timeWindow?: TimeWindow;
}
const TimeWindowForm = ({ timeWindow }: IProps) => {
  const { create, update, remove } = useTimeWindowsActions();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TimeWindow>({
    defaultValues: timeWindow ?? { tooFar: false, color: "#797979" },
  });
  const onSubmit = (formValue: TimeWindow) => {
    if (timeWindow) {
      update(formValue);
    } else {
      create(formValue);
      reset();
    }
  };
  return (
    <form
      className="form-control flex flex-row justify-between border rounded mb-3 p-2 shadow-md"
      style={
        timeWindow && timeWindow.color !== "#797979"
          ? { backgroundColor: `${timeWindow.color}22` }
          : undefined
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <label className="mr-4">
          De
          <input
            className={`ml-2 input input-bordered input-sm ${
              errors.minTime ? "input-error" : null
            }`}
            {...register("minTime", { required: true, valueAsNumber: true })}
          />
        </label>
        <label
          className="mr-4 tooltip"
          data-tip="Laisser vide pour une valeur infinie"
        >
          à{" "}
          <input
            type="number"
            className="input input-bordered input-sm"
            {...register("maxTime", { valueAsNumber: true })}
          />
        </label>
        <label className="mr-4">
          Trop loin ?
          <input
            type="checkbox"
            className="checkbox-secondary mx-2"
            {...register("tooFar")}
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
                id={`time_window_color_picker_${
                  timeWindow ? timeWindow.id : 0
                }`}
              />
            )}
          />
        </label>
      </div>
      <div className="flex items-center">
        {timeWindow ? (
          <div
            className="btn btn-square btn-sm btn-ghost mx-2 flex items-center"
            onClick={() => remove(timeWindow)}
          >
            <TrashIcon className="h-6 w-6 ring-base-200" />{" "}
          </div>
        ) : null}
        <button
          type="submit"
          className="btn btn-square btn-sm btn-ghost mx-2 flex items-center"
        >
          {timeWindow ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <PlusCircledIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};

const TimeWindows = () => {
  const timeWindows = useRecoilValue(timeWindowAtom);
  return (
    <>
      <h1 id="time-windows" className="text-2xl font-bold mb-4">
        Configurer les fenêtres de temps de trajet
      </h1>
      <div className="pl-2">
        {timeWindows.map((timeWindow) => (
          <TimeWindowForm
            timeWindow={timeWindow}
            key={`time_window_form_${timeWindow.id}`}
          />
        ))}
        <TimeWindowForm />
      </div>
    </>
  );
};

export default TimeWindows;
