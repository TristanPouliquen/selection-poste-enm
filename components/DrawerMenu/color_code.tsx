import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { activeAppStateAtom } from "@/_state";

interface IFormProps {
  colorScheme: "default" | "appealCourt" | "role" | "timeTo" | "group";
}
const ColorCode = () => {
  const [activeAppState, setActiveAppState] =
    useRecoilState(activeAppStateAtom);
  const { register, watch } = useForm<IFormProps>({
    defaultValues: {
      colorScheme: activeAppState.colorScheme,
    },
  });

  const colorScheme = watch("colorScheme");
  useEffect(() => {
    if (colorScheme !== activeAppState.colorScheme) {
      setActiveAppState({
        ...activeAppState,
        colorScheme: colorScheme,
      });
    }
  }, [activeAppState, colorScheme, setActiveAppState]);

  return (
    <form className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Par fonction</span>
        <input
          {...register("colorScheme")}
          type="radio"
          value="role"
          className="radio radio-primary"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Par cour d&apos;appel</span>
        <input
          {...register("colorScheme")}
          type="radio"
          value="appealCourt"
          className="radio radio-primary"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Par temps de trajet</span>
        <input
          {...register("colorScheme")}
          type="radio"
          value="timeTo"
          className="radio radio-primary"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Par groupe</span>
        <input
          {...register("colorScheme")}
          type="radio"
          value="group"
          className="radio radio-primary"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Par défaut</span>
        <input
          {...register("colorScheme")}
          type="radio"
          value="default"
          className="radio radio-primary"
        />
      </label>
    </form>
  );
};

export default ColorCode;
