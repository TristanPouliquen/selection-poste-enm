import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { activeAppStateAtom } from "@/_state";

interface IFormProps {
  filters: string[];
}
const Filters = () => {
  const [activeAppState, setActiveAppState] =
    useRecoilState(activeAppStateAtom);
  const { register, watch } = useForm<IFormProps>({
    defaultValues: {
      filters: activeAppState.filters,
    },
  });
  const filters = watch("filters");
  useEffect(() => {
    if (activeAppState.filters !== filters) {
      setActiveAppState({ ...activeAppState, filters: filters });
    }
  }, [filters, activeAppState, setActiveAppState]);
  return (
    <div className="form-control mb-3">
      <label className="label cursor-pointer">
        <span className="label-text">Masquer les postes déjà pris</span>
        <input
          {...register("filters")}
          type="checkbox"
          value="taken"
          className="toggle toggle-primary"
        />
      </label>
      <label className="label cursor-pointer">
        <span className="label-text">Masquer les postes trop loin</span>
        <input
          {...register("filters")}
          type="checkbox"
          value="tooFar"
          className="toggle toggle-primary"
        />
      </label>
    </div>
  );
};

export default Filters;
