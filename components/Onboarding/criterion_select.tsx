import React, { useContext } from "react";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { CriteriaContext, ICriterion } from "@/components/Onboarding/index";
import Select, {
  ActionMeta,
  GetOptionLabel,
  GetOptionValue,
  OnChangeValue,
} from "react-select";
import {
  appealCourtsAtom,
  groupsAtom,
  rolesAtom,
  tribunalsAtom,
} from "@/_state";
import { AppealCourt, Group, Role, Tribunal } from "@/types/types";
import { useRecoilValue } from "recoil";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface IProps {
  index: number;
  criterion: ICriterion;
  stage: "positive" | "negative";
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

interface IRecoilOptions {
  [key: string]: any[];
}

interface IConfiguration {
  [key: string]: {
    recoilOptions?: string;
    options: any[];
    getOptionLabel: GetOptionLabel<any>;
    getOptionValue: GetOptionValue<any>;
    isMulti: boolean;
  };
}
const selectConfiguration: IConfiguration = {
  tribunal: {
    recoilOptions: "tribunals",
    options: [],
    getOptionLabel: (tribunal: Tribunal) => tribunal.name,
    getOptionValue: (tribunal: Tribunal) => tribunal.id.toString(),
    isMulti: true,
  },
  appealCourt: {
    recoilOptions: "appealCourts",
    options: [],
    isMulti: true,
    getOptionLabel: (appealCourt: AppealCourt) => appealCourt.name,
    getOptionValue: (appealCourt: AppealCourt) => appealCourt.id.toString(),
  },
  group: {
    recoilOptions: "groups",
    options: [],
    isMulti: true,
    getOptionLabel: (group: Group) => group.name,
    getOptionValue: (group: Group) => group.id.toString(),
  },
  role: {
    recoilOptions: "roles",
    options: [],
    isMulti: true,
    getOptionLabel: (role: Role) => role.name,
    getOptionValue: (role: Role) => role.id.toString(),
  },
  prevalent_domain: {
    recoilOptions: "",
    options: [
      { label: "Civil", value: "Civil" },
      { label: "Pénal", value: "Pénal" },
    ],
    isMulti: false,
    getOptionLabel: (option: any) => option.label,
    getOptionValue: (option: any) => option.value,
  },
  placed: {
    recoilOptions: "",
    options: [
      { label: "Placé", value: true },
      { label: "Non placé", value: false },
    ],
    getOptionLabel: (option: any) => option.label,
    getOptionValue: (option: any) => option.value,
    isMulti: false,
  },
};
const CriterionSelect = ({
  index,
  criterion,
  stage,
  dragHandleProps,
}: IProps) => {
  const { criteria, setCriteria } = useContext(CriteriaContext);
  const tribunals = useRecoilValue(tribunalsAtom);
  const appealCourts = useRecoilValue(appealCourtsAtom);
  const groups = useRecoilValue(groupsAtom);
  const roles = useRecoilValue(rolesAtom);
  const recoilOptions: IRecoilOptions = {
    tribunals,
    appealCourts,
    groups,
    roles,
  };
  const configuration = selectConfiguration[criterion.name];
  const onChange = (
    newValue: OnChangeValue<any, any>,
    actionMeta: ActionMeta<any>
  ) => {
    let crit = criteria[stage].find((c) => criterion.name === c.name);
    if (crit === undefined) {
      return;
    }
    let copy: ICriterion | undefined = undefined;
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        copy = {
          ...crit,
          value: configuration.isMulti
            ? crit.value.filter((v: any) => actionMeta.removedValue !== v)
            : undefined,
        };
        break;
      case "clear":
        copy = {
          ...crit,
          value: [],
        };
        break;
      case "select-option":
        if (configuration.isMulti && actionMeta.option) {
          copy = {
            ...crit,
            value: [...crit.value, actionMeta.option],
          };
        } else {
          copy = {
            ...crit,
            value: newValue,
          };
        }
        break;
      case "deselect-option":
        if (configuration.isMulti && actionMeta.option) {
          copy = {
            ...crit,
            value: crit.value.filter((v: any) => actionMeta.removedValue !== v),
          };
        } else {
          copy = {
            ...crit,
            value: undefined,
          };
        }
        break;
    }
    if (copy) {
      setCriteria({
        ...criteria,
        // @ts-ignore
        [stage]: criteria[stage].map((c) => (c.name === copy.name ? copy : c)),
      });
    }
  };
  const removeCriterion = () => {
    setCriteria({
      ...criteria,
      [stage]: criteria[stage].filter((c) => c.name !== criterion.name),
    });
  };
  return (
    <div className="flex items-center border rounded-lg px-2 py-2 mb-3">
      <div {...dragHandleProps}>
        <DragHandleDots2Icon className="h-8 w-8 text-base-300/75 mr-2" />
      </div>
      <div className="mr-2">{`${index + 1}.`}</div>
      <div className="grow">{criterion.label}</div>
      <Select
        className="w-2/3"
        isSearchable={true}
        isMulti={configuration.isMulti}
        isClearable={configuration.isMulti}
        value={criterion.value}
        options={
          configuration.recoilOptions
            ? recoilOptions[configuration.recoilOptions]
            : configuration.options
        }
        getOptionValue={configuration.getOptionValue}
        getOptionLabel={configuration.getOptionLabel}
        onChange={onChange}
      />
      <button className="btn btn-ghost btn-sm rounded-lg ml-2 text-base-300 hover:bg-base-200/50 p-0">
        <TrashIcon className="h-6 w-6" onClick={removeCriterion} />
      </button>
    </div>
  );
};

export default CriterionSelect;
