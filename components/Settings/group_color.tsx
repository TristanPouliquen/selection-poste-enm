import React from "react";
import { Group } from "@/types/types";
import { groupsAtom, useGroupsAction } from "@/_state";
import { Controller, useForm } from "react-hook-form";
import ColorPicker from "@/components/Settings/color_picker";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";

interface IProps {
  group: Group;
}
const GroupColorForm = ({ group }: IProps) => {
  const { update } = useGroupsAction();
  const { control, handleSubmit, register } = useForm<Group>({
    defaultValues: group,
  });
  const onSubmit = (formValue: Group) => update(formValue);

  return (
    <form
      className="form-control flex flex-row justify-between border rounded mb-3 p-2 shadow-md"
      style={
        group.color !== "#797979"
          ? { backgroundColor: `${group.color}33` }
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
            value={group.name}
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
                id={`group_color_picker_${group.id}`}
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
const GroupColor = () => {
  const groups = useRecoilValue(groupsAtom);
  return (
    <>
      <h2 id="groups-color" className="text-xl mb-2">
        Groupes de tribunaux
      </h2>
      <div className="pl-2">
        {groups.map((group) => (
          <GroupColorForm group={group} key={`group_form_${group.id}`} />
        ))}
      </div>
    </>
  );
};

export default GroupColor;
