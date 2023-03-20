import React, { useState } from "react";
import { Position, Tag } from "@/types/types";
import { tagsAtom, usePositionsActions, useTagsAction } from "@/_state";
import { useRecoilValue } from "recoil";
import CreatableSelect from "react-select/creatable";
import {
  ActionMeta,
  components,
  MultiValueGenericProps,
  OnChangeValue,
  StylesConfig,
} from "react-select";

interface IProps {
  position: Position;
}

interface IOption {
  id: number;
  name: string;
  color: string;
  isFixed: boolean;
  className?: string;
}

const styles: StylesConfig<IOption, true> = {
  multiValueRemove: (base, state) => {
    return state.data.isFixed
      ? { ...base, display: "none" }
      : { ...base, "&:hover": { backgroundColor: "transparent" } };
  },
  multiValue: (base) => ({
    ...base,
    backgroundColor: "transparent",
  }),
  multiValueLabel: () => ({
    color: "currentcolor",
  }),
};

const orderOptions = (values: readonly IOption[]) => {
  return [...values].sort((a, b) => a.id - b.id);
};

const formatTag = (tag: Tag): IOption => ({
  ...tag,
  isFixed: false,
  className: "badge-outline",
});

const convertOptionToTag = (option: IOption): Tag => ({
  id: option.id,
  name: option.name,
  color: option.color,
});

const MultiValueContainer = (props: MultiValueGenericProps<IOption>) => (
  <div
    className={`badge rounded-lg mr-2 mb-1 ${
      props.data.className ? props.data.className : ""
    } ${!props.data.isFixed ? "pr-0" : ""}`}
    style={props.data.color ? { color: props.data.color } : undefined}
  >
    <components.MultiValueContainer {...props}>
      {props.children}
    </components.MultiValueContainer>
  </div>
);

const TagContainer = ({ position }: IProps) => {
  const { addTag, removeTag } = usePositionsActions();
  const { create } = useTagsAction();
  const tags = useRecoilValue(tagsAtom);

  const [value, setValue] = useState<readonly IOption[]>(() => {
    let defaultValue: IOption[] = [
      {
        id: -1,
        name: position.prevalentDomain,
        isFixed: true,
        color: "",
        className: "badge-outline",
      },
      ...(position.tags ?? []).map(formatTag),
    ];
    if (position.placed) {
      defaultValue = [
        ...defaultValue,
        {
          id: -2,
          name: "Placé",
          isFixed: true,
          className: "badge-secondary",
          color: "",
        },
      ];
    }
    return orderOptions(defaultValue);
  });
  const onChange = async (
    newValue: OnChangeValue<IOption, true>,
    actionMeta: ActionMeta<IOption>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        const tag =
          actionMeta.removedValue.id === 0
            ? (tags.find((t) => t.name === actionMeta.removedValue.name) as Tag)
            : convertOptionToTag(actionMeta.removedValue);
        removeTag(position, tag);
        break;
      case "clear":
        newValue = value.filter((o) => o.isFixed);
        actionMeta.removedValues.map((o) =>
          !o.isFixed ? removeTag(position, convertOptionToTag(o)) : null
        );
        break;
      case "create-option":
        const newTag = await create({
          name: actionMeta.option.name,
          color: actionMeta.option.color,
        });
        addTag(position, newTag);
        break;
      case "select-option":
        if (actionMeta.option) {
          addTag(position, convertOptionToTag(actionMeta.option));
        }
        break;
      case "deselect-option":
        if (actionMeta.option) {
          removeTag(position, convertOptionToTag(actionMeta.option));
        }
        break;
    }
    setValue(newValue);
  };
  return (
    <div className="grow p-2" onClick={(e) => e.preventDefault()}>
      <CreatableSelect
        isMulti
        getNewOptionData={(inputValue) => ({
          id: 0,
          name: inputValue,
          color: "#797979",
          isFixed: false,
          className: "badge-outline",
        })}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        components={{ MultiValueContainer }}
        options={tags.map(formatTag)}
        styles={styles}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TagContainer;
