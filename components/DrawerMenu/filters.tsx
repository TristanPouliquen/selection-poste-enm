import React, { CSSProperties, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeAppStateAtom,
  appealCourtsAtom,
  groupsAtom,
  rolesAtom,
  tribunalsAtom,
} from "@/_state";
import Select from "react-select";
import { MixIcon } from "@radix-ui/react-icons";

interface IFormProps {
  filters: string[];
  advanced: any;
}

interface IGroupedOption {
  label: string;
  options: any[];
}

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data: IGroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);
const Filters = () => {
  const [activeAppState, setActiveAppState] =
    useRecoilState(activeAppStateAtom);
  const groups = useRecoilValue(groupsAtom);
  const roles = useRecoilValue(rolesAtom);
  const tribunals = useRecoilValue(tribunalsAtom);
  const appealCourts = useRecoilValue(appealCourtsAtom);
  const options: IGroupedOption[] = [
    {
      label: "Groupes",
      options: groups.map((group) => ({
        label: group.name,
        type: "group",
        value: group.id,
      })),
    },
    {
      label: "Fonctions",
      options: roles.map((role) => ({
        label: role.name,
        type: "role",
        value: role.id,
      })),
    },
    {
      label: "Tribunaux",
      options: tribunals.map((tribunal) => ({
        label: tribunal.name,
        type: "tribunal",
        value: tribunal.id,
      })),
    },
    {
      label: "Cours d'appel",
      options: appealCourts.map((appealCourt) => ({
        label: appealCourt.name,
        type: "appealCourt",
        value: appealCourt.id,
      })),
    },
  ];
  const { register, watch, control } = useForm<IFormProps>({
    defaultValues: {
      filters: activeAppState.filters,
      advanced: activeAppState.advanced,
    },
  });
  const formValues = watch();
  useEffect(() => {
    if (activeAppState.filters !== formValues.filters) {
      setActiveAppState({ ...activeAppState, filters: formValues.filters });
    }
    if (activeAppState.advanced !== formValues.advanced) {
      setActiveAppState({ ...activeAppState, advanced: formValues.advanced });
    }
  }, [formValues, activeAppState, setActiveAppState]);
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
      <label className="flex items-center mb-1">
        <MixIcon className="h-4 w-4 mr-1" />
        Filtres avancés
      </label>
      <Controller
        control={control}
        name="advanced"
        render={({ field }) => (
          <Select
            isMulti={true}
            options={options}
            {...field}
            formatGroupLabel={formatGroupLabel}
          />
        )}
      />
    </div>
  );
};

export default Filters;
