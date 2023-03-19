import React from "react";
import { Role } from "@/types/types";
import { rolesAtom, useRolesAction } from "@/_state";
import { Controller, useForm } from "react-hook-form";
import ColorPicker from "@/components/Settings/color_picker";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRecoilValue } from "recoil";

interface IProps {
  role: Role;
}

const RoleColorForm = ({ role }: IProps) => {
  const { update } = useRolesAction();
  const { control, handleSubmit } = useForm<Role>({
    defaultValues: role,
  });
  const onSubmit = (formValue: Role) => update(formValue);

  return (
    <form
      className="form-control flex flex-row justify-between border rounded mb-3 p-2 shadow-md"
      style={
        role.color !== "#797979"
          ? { backgroundColor: `${role.color}33` }
          : undefined
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <label className="mr-4">
          Nom
          <input
            className="ml-2 input input-bordered w-96 input-sm input-disabled"
            disabled
            value={role.name}
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
                id={`role_color_picker_${role.id}`}
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
const RoleColor = () => {
  const roles = useRecoilValue(rolesAtom);
  return (
    <>
      <h2 className="text-xl mb-2">Fonctions</h2>
      <div className="pl-2">
        {roles.map((role) => (
          <RoleColorForm role={role} key={`role_form_${role.id}`} />
        ))}
      </div>
    </>
  );
};

export default RoleColor;
