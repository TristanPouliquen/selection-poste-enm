import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Tag } from "@/types/types";
import ColorPicker from "@/components/Settings/color_picker";
import { CheckIcon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { tagsAtom, useTagsAction } from "@/_state";
import { useRecoilValue } from "recoil";

interface IProps {
  tag?: Tag;
}

const TagForm = ({ tag }: IProps) => {
  const { create, update, remove } = useTagsAction();
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Tag>({
    defaultValues: tag ?? { color: "#797979" },
  });
  const onSubmit = (formValue: Tag) => {
    if (tag) {
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
        tag && tag.color !== "#797979"
          ? { backgroundColor: `${tag.color}33` }
          : undefined
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <label className="mr-4">
          Nom
          <input
            className={`ml-2 input input-bordered input-sm ${
              errors.name ? "input-error" : null
            }`}
            {...register("name", { required: true })}
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
                id={`tag_color_picker_${tag ? tag.id : 0}`}
              />
            )}
          />
        </label>
      </div>
      <div className="flex items-center">
        {tag ? (
          <div
            className="btn btn-square btn-sm btn-ghost mx-2 flex items-center"
            onClick={() => remove(tag)}
          >
            <TrashIcon className="h-6 w-6 ring-base-200" />{" "}
          </div>
        ) : null}
        <button
          type="submit"
          className="btn btn-square btn-sm btn-ghost mx-2 flex items-center"
        >
          {tag ? (
            <CheckIcon className="h-6 w-6" />
          ) : (
            <PlusCircledIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};
const Tags = () => {
  const tags = useRecoilValue(tagsAtom);
  return (
    <>
      <h1 id="tags" className="text-2xl font-bold mb-4">
        Configurer les tags
      </h1>
      <div className="pl-2">
        {tags.map((tag) => (
          <TagForm tag={tag} key={`tag_form_${tag.id}`} />
        ))}
        <TagForm />
      </div>
    </>
  );
};

export default Tags;
